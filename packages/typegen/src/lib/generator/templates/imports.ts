export const getImportsForDefinition = () => {
  return `import { FinalExecutionOutcome } from 'near-api-js/lib/providers';
import { IAccount, CallOverrides, CallOverridesPayable, NearContractBase } from '@neargen-js/core';`;
};

export const generateIndexFile = (contractFileNames: string[]) => {
  const imports =  contractFileNames
    .map((contract) => {
      return (`import ${contract} from './${contract}';`);
    })
    .join('\n');

  const exports = `export {${contractFileNames.join(',\n')} }` 

  return [imports, exports].join('\n\n');
};
