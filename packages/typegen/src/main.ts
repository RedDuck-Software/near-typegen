#!/usr/bin/env node
import { Command } from 'commander';
import { DEFAULT_ABIS_PATH, DEFAULT_OUTPUT_PATH } from './constants';
import generator from './lib/generator';
import { version } from '../package.json';

const program = new Command();

program.name('Near TypeChain utility').description('Near TypeChain utility').version(version);

program
  .description('Generates Typescript entities from a given contract ABIs')
  .option('-a, --abis <item>', 'abis blob path', DEFAULT_ABIS_PATH)
  .option('-o, --output <item>', 'generated entities output folder path', DEFAULT_OUTPUT_PATH)
  .action(({ abis, output }) => {
    return generator({ abisPath: abis, outputFolderPath: output });
  });

program.parse();
