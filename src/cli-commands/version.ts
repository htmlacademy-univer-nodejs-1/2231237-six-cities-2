import chalk from 'chalk';
import {CliCommandInterface} from './cli-command.js';
import {readFileSync} from 'node:fs';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';
  public async execute(): Promise<void> {
    const data = readFileSync('../package.json', 'utf-8');
    const content = JSON.parse(data);
    console.log(`${chalk.greenBright(content.version)}`);
  }
}
