import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { toCapital } from '../../common/utils';
import { Since } from '../../feature/since/entities/since.entity';

export class SinceSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const pathFile = path.join(__dirname, './lib', 'regencies.csv');
    const regencies = fs.readFileSync(pathFile);

    const parser = new Promise((resolve, reject) => {
      parse(regencies, (err, records) => {
        if (!err) {
          resolve(records);
        } else {
          reject('Failed read data csv regencies');
        }
      });
    });

    await parser
      .then(async (records: any[]) => {
        for (let index = 0; index < records.length; index++) {
          const [id, provinceId, name] = records[index];
          const since = em.create(Since, {
            name: toCapital(name.toLowerCase()),
          });
          em.persist(since);
        }
        await em.flush();
      })
      .catch((error) => console.log(error));
  }
}
