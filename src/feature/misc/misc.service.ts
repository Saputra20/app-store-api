import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { KeywordQueryDto } from 'src/common/dto';
import {
  generateFindAllQuery,
  getResultQueryAndWithoutPaginate,
} from 'src/common/helper';
import { Since } from '../since/entities/since.entity';

@Injectable()
export class MiscService {
  constructor(
    @InjectRepository(Since)
    private readonly sinceRepo: EntityRepository<Since>,
  ) {}

  listSince({ q }: KeywordQueryDto) {
    let qb = this.sinceRepo.createQueryBuilder();
    qb = generateFindAllQuery(
      qb,
      {
        limit: Number.MAX_SAFE_INTEGER,
        orderBy: undefined,
        offset: 0,
      },
      undefined,
      undefined,
      {
        name: new RegExp(q || '.*', 'gi'),
      },
    );
    return getResultQueryAndWithoutPaginate(qb);
  }
}
