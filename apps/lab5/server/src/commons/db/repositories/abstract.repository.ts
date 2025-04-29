// import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm"

export class AbstractRepository<T> extends Repository<T> {
  constructor(repository: Repository<T>) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
