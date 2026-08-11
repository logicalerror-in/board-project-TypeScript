import {IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import {Transform} from "class-transformer";

export class UpdatePostDto {
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string"
      ? value.trim()
      : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string"
      ? value.trim()
      : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content?: string;
}