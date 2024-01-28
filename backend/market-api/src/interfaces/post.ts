import { Expose, Type } from 'class-transformer';
import { IsString, IsDate, IsArray, ValidateNested, IsOptional } from 'class-validator';

export class Tag {
  @IsString()
  @Expose({ name: 'name' })
  name!: string;

  @IsString()
  @Expose({ name: 'id' })
  id!: string;
}

export class Post {
  @IsString()
  @Expose({ name: 'title' })
  title!: string;

  @IsString()
  @Expose({ name: 'content' })
  content!: string;

  @IsDate()
  @Expose({ name: 'postedAt' })
  postedAt!: Date;

  @IsString()
  @Expose({ name: 'postedBy' })
  postedBy!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tag)
  @Expose({ name: 'tags' })
  tags?: Tag[];
}
