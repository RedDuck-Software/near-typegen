export type PrimitiveType = 'string' | 'number' | 'boolean' | 'void';

export type NearFunctionType = {
  isArray?: boolean;
  isOptional?: boolean;
  type: PrimitiveType | NearFunctionArg;
};

export type NearFunctionArg = {
  [name: string]: NearFunctionType;
};

type NearFunctionBase = {
  name: string;
  args: NearFunctionType;
};

export type NearFunctionView = {
  returnType?: NearFunctionType;
} & NearFunctionBase;

export type NearFunctionCall = {
  isPayable?: boolean;
  isPrivate?: boolean;
} & NearFunctionBase;

export type NearContractAbi = {
  contractName: string;
  methods: {
    view: Array<NearFunctionView>;
    call: Array<NearFunctionCall>;
  };
  byteCode: string;
};

export const parseAbi = (abiJson: string) => {
  return JSON.parse(abiJson) as NearContractAbi;
};
