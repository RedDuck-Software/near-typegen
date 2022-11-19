import { NearContractAbi } from '@neargen-js/types';
import { ContractTypeDefinition, getContractTypeDefinition } from './contract';
import { FunctionDefinitionBase, ViewFunctionDefinition } from './functions';
import { getImportsForDefinition } from './imports';

const _getTypeFromFunctions = (functions: FunctionDefinitionBase[]) => {
  return functions.filter((f) => f.hasArgs && f.argsType).map((f) => f.argsType?.type) as string[];
};

const _getReturnTypesFromView = (functions: ViewFunctionDefinition[]) => {
  return functions.filter((f) => f.returnType && f.returnType.type).map((f) => f.returnType?.type) as string[];
};

export const _getTypesSection = (contractDef: ContractTypeDefinition) => {
  const typesCall = _getTypeFromFunctions(contractDef.callFunctions);
  const typesView = _getTypeFromFunctions(contractDef.viewFunctions);
  const typeViewReturn = _getReturnTypesFromView(contractDef.viewFunctions);

  // TODO: add return types from view fn`s
  const fnTypes = [...typesCall, ...typesView, ...typeViewReturn];

  return fnTypes.map((t) => `export ${t}`).join('\n');
};

export const getFullDefinitionFromAbi = (abi: NearContractAbi) => {
  const contractDef = getContractTypeDefinition(abi);
  const typesSection = _getTypesSection(contractDef);
  const importsSection = getImportsForDefinition();
  const defaultExport = `export default ${abi.contractName};`;
  
  return [importsSection, typesSection, contractDef.contract, [defaultExport]].join('\n\n');
};
