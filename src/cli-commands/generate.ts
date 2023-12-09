import TSVFileWriter from '../file-writer/tsv-file-writer.js';
import fetch from 'node-fetch';
import {CliCommandInterface} from './cli-command.js';
import OfferGenerator from '../module/offer-generator.js';
import {MockData} from '../types/mock-offer.type';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);
    try {
      const res = await fetch(url);
      this.initialData = await res.json() as MockData;
    } catch {
      console.log(`Can't get data from ${url}`);
    }
    const offerGenerator = new OfferGenerator(this.initialData);
    const fileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await fileWriter.write(offerGenerator.generate());
    }

    console.log(`File ${filepath} was successfully created`);
  }
}
