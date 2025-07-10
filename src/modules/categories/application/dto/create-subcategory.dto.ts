import { IsString, IsUUID } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  name: string;

  @IsUUID()
  categoryId: string;
}