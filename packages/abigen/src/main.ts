#!/usr/bin/env node
import { Command } from 'commander';
import { parseTsFile } from './lib/parser';
import { DEFAULT_CONTRACTS_PATH, DEFAULT_OUTPUT_ABIS_PATH } from './constants';

const program = new Command();

program.name('NEAR abi-gen utility').description('NEAR abi-gen utility')

program
  .description('Generates ABIs from a given NEAR smart contracts written in TypeScript')
  .option('-c, --contracts <item>', 'contracts files blob path', DEFAULT_CONTRACTS_PATH)
  .option('-o, --output <item>', 'generated abis folder path', DEFAULT_OUTPUT_ABIS_PATH)
  .action(({ contracts, output }) => {
    console.debug({ contracts, output });
    return parseTsFile({ abisOutputPath: output, tsFilesPath: contracts });
  });

program.parse(process.argv);

