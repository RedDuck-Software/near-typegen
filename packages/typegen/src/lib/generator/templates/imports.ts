export const getImportsForDefinition = () => {
  return `import { FinalExecutionOutcome } from 'near-api-js/lib/providers';
import { Account } from 'near-api-js';
import assert from 'assert';
import { CallOverrides, CallOverridesPayable, NearContract, NearContractBase } from '@neargen-js/typegen';`;
};

export const generateIndexFile = (contractFileNames: string[]) => {
  return contractFileNames
    .map((contract) => {
      return `export * from './${contract}';`;
    })
    .join('\n');
};
