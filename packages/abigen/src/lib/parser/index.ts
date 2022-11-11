import {
  NearContractAbi,
  NearFunctionArg,
  NearFunctionCall,
  NearFunctionType,
  NearFunctionView,
  PrimitiveType,
} from '@neargen-js/core';
import { writeFile } from '@neargen-js/core';
import path from 'path';
import { ClassDeclaration, MethodDeclarationStructure, OptionalKind, Project, SourceFile, ts, Type } from 'ts-morph';

const stringTypeToObject = <TReturn extends object = object>(strObj: string) => {
  return new Function('return ' + strObj + ';')() as TReturn;
};

type CallDecoratorArgs = {
  privateFunction?: boolean;
  payableFunction?: boolean;
};

const parseNearFunctionCall = (
  methods: OptionalKind<MethodDeclarationStructure>[] | undefined,
  classDeclaration: ClassDeclaration,
  isInitializer?: boolean
): NearFunctionCall[] => {
  return (
    methods?.map((method) => {
      const fnName = method.name;
      const fnArgs = classDeclaration
        .getMethodOrThrow(method.name)
        .getParameters()
        ?.map((p) => toObjectType(p.getType()));

      let isPayable = false;
      let isPrivate = true;

      if (!isInitializer) {
        const decorator = method.decorators?.find((d) => d.name === 'call');

        if (!decorator?.arguments) throw 'Missing call decorator';

        const decoratorObject = stringTypeToObject<CallDecoratorArgs>(
          (decorator.arguments as string[])[0].toString() ?? '',
        );

        isPayable = Boolean(decoratorObject.payableFunction);
        isPrivate = Boolean(decoratorObject.privateFunction);
      }

      return {
        name: fnName,
        isPayable,
        isPrivate,
        isInitializer,
        args: fnArgs?.length ? fnArgs.reduce((prev, curr) => ({ ...prev, ...curr }),) : undefined,
      };
    }) ?? []
  );
};

const parseNearFunctionView = (
  methods: OptionalKind<MethodDeclarationStructure>[] | undefined,
  classDeclaration: ClassDeclaration,
): NearFunctionView[] => {
  return (
    methods?.map((method) => {
      const fnName = method.name;
      const methodsD = classDeclaration.getMethodOrThrow(method.name);
      const fnArgs = methodsD.getParameters()?.map((p) => toObjectType(p.getType()));
      const returnType = methodsD?.getReturnType();

      return {
        name: fnName,
        args: fnArgs?.length ? fnArgs.reduce((prev, curr) => ({ ...prev, ...curr }),) : undefined,
        returnType: toObjectType(returnType),
      };
    }) ?? []
  );
};

const getAbisFromFile = (file: SourceFile) => {
  const classDeclarations = file.getClasses();

  return classDeclarations
    .map((classDeclaration) => {
      const classStructure = classDeclaration.getStructure();

      const hasNearBindgen = classStructure?.decorators?.some(({ name }) => name === 'NearBindgen');
      if (!hasNearBindgen) return undefined;

      const { name, methods } = classStructure;

      const viewMethods = methods?.filter((m) => m.decorators?.find((d) => d.name === 'view'));
      const callMethods = methods?.filter((m) => m.decorators?.find((d) => d.name === 'call'));
      const initializerMethod = methods?.find((m) => m.decorators?.find((d) => d.name === 'initialize'));

      const callMethodsParsed = parseNearFunctionCall(callMethods, classDeclaration);
      const viewMethodsParsed = parseNearFunctionView(viewMethods, classDeclaration);
      const initializerParsed = initializerMethod ? parseNearFunctionCall([initializerMethod], classDeclaration, true)[0] : undefined;

      const abi = {
        contractName: name,
        methods: {
          call: initializerParsed ? [...callMethodsParsed, initializerParsed] : callMethodsParsed,
          view: viewMethodsParsed,
        },
      } as NearContractAbi;

      return abi;
    })
    .filter((abi) => abi) as NearContractAbi[];
};

const getPrimitiveType = (type: Type) => {
  let t = (type.getText()).trim();
  if(t === 'bigint') t = 'string';
  if(t === 'any') t = 'unknown';
  return t as PrimitiveType;
}

const toObjectType = (_type: string | Type<ts.Type>, file?: SourceFile): NearFunctionType => {
  let type: Type<ts.Type>;

  if (typeof _type === 'string') {
    if (!file) throw 'file is not passed';
    type = file?.getTypeAliasOrThrow(_type as string).getType();
  } else {
    type = _type;
  }

  const isArray = type.isArray();

  if(isArray) {
    type = type.getArrayElementTypeOrThrow();
  }

  if (!type.isObject() || (isArray && !type.getArrayElementTypeOrThrow().isObject())) {
    return {
      isArray,
      isOptional: false,
      type: getPrimitiveType(type),
      name: 'return',
    };
  }

  const properties = type.getProperties();
  return {
    isArray,
    type: properties.reduce((prev, curr) => {
      let type: Type<ts.Type> = curr.getDeclaredType();

      const isArray = type.isArray();
      const isOptional = curr.isOptional();

      if (isArray) {
        type = type.getArrayElementTypeOrThrow();
      }

      let returnType: NearFunctionArg | PrimitiveType | NearFunctionType;

      if (type.isObject()) {
        returnType = toObjectType(type, file);
      } else {
        returnType = getPrimitiveType(type);
      }

      const name = curr.getName();

      return {
        ...prev,
        [name]: {
          isArray,
          isOptional,
          type: returnType,
          name: name,
        },
      };
    }, {}),
  };
};

export const parseTsFile = async ({ tsFilesPath, abisOutputPath }: { tsFilesPath: string; abisOutputPath: string }) => {
  const project = new Project({});

  project.addSourceFilesAtPaths(tsFilesPath);

  const files = project.getSourceFiles(tsFilesPath);

  const contractsAbis: NearContractAbi[] = [];

  for (const file of files) {
    const abis = getAbisFromFile(file);

    for (const abi of abis) {
      if (contractsAbis.find((a) => a.contractName === abi.contractName))
        throw `Duplicated contract name: ${abi.contractName}`;

      contractsAbis.push(abi);
    }
  }

  contractsAbis.forEach((abi) => {
    const abiPath = path.join(abisOutputPath, `${abi.contractName}.abi.json`);
    writeFile(abiPath, JSON.stringify(abi, undefined, 4));
  });
};
