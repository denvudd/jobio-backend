import { NotFoundException } from '~core/exceptions/domain/exceptions/not-found-exception/not-found.exception';

export class EntityNotFoundByNameException extends NotFoundException {
  constructor(entityType: 'category' | 'subcategory', name: string) {
    super('ENTITY_NOT_FOUND_BY_NAME', `${entityType} with name ${name} not found`);
  }
}
