#!/usr/bin/env node
import { Command } from 'commander';
import { parseTsFile } from './lib/parser';
import { DEFAULT_CONTRACTS_PATH, DEFAULT_OUTPUT_ABIS_PATH } from './constants';

const program = new Command();

program.name('Near AbiGen utility').description('Near AbiGen utility').version('0.0.1-dev');

program
  .description('Generates Typescript entities from a given contract ABIs')
  .option('-c, --contracts <item>', 'contracts files blob path', DEFAULT_CONTRACTS_PATH)
  .option('-o, --output <item>', 'generated abis folder path', DEFAULT_OUTPUT_ABIS_PATH)
  .action(({ contracts, output }) => {
    console.log({ contracts, output });
    return parseTsFile({ abisOutputPath: output, tsFilesPath: contracts });
  });

program.parse(process.argv);
