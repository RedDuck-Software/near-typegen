export const isPrimitive = (type: PrimitiveType | NearFunctionArg) => {
  if (typeof 0 === type || typeof '' === type || typeof false === type || type === 'void' || type == 'unknown')
    return true;
  return false;
};

export type PrimitiveType = 'string' | 'number' | 'boolean' | 'void' | 'unknown';

export type NearFunctionType = {
  name?: string;
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
  isPayable: boolean;
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
