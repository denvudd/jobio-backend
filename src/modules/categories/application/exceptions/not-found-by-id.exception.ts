import { NotFoundException } from '~core/exceptions/domain/exceptions/not-found-exception/not-found.exception';

export class EntityNotFoundByIdException extends NotFoundException {
  constructor(entityType: 'category' | 'subcategory', id: string) {
    super('ENTITY_NOT_FOUND_BY_ID', `${entityType} with id ${id} not found`);
  }
}
