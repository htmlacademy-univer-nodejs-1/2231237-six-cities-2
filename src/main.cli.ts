#!/usr/bin/env node


import CLIApplication from './app/cli.js';
import HelpCommand from './cli-commands/help.js';
import VersionCommand from './cli-commands/version.js';
import ImportCommand from './cli-commands/import.js';
import GenerateCommand from './cli-commands/generate.js';
import 'reflect-metadata';

const cliApplication = new CLIApplication();
cliApplication.registerCommands([new HelpCommand, new VersionCommand, new ImportCommand, new GenerateCommand]);
cliApplication.processCommand(process.argv);
