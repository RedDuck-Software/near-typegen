export const getImportsForDefinition = () => {
  return `import { FinalExecutionOutcome } from 'near-api-js/lib/providers';
import { Account } from 'near-api-js';
import assert from 'assert';
import { CallOverrides, CallOverridesPayable, NearContract, NearContractBase } from '@neargen-js/typegen';`;
};

export const generateIndexFile = (contractFileNames: string[]) => {
  const imports =  contractFileNames
    .map((contract) => {
      return (`import ${contract} from './${contract}';`);
    })
    .join('\n');

  const exports = `export {${contractFileNames.join('\n')} }` 

  return [imports, exports].join('\n');
};
