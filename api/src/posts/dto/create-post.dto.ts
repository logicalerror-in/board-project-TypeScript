import {Transform} from "class-transformer";
import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreatePostDto {
  @Transform(({value}) =>
    typeof value === 'string'
      ? value.trim()
      : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @Transform(({value}) =>
    typeof value === 'string'
      ? value.trim()
      : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content!: string;
}