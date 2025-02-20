import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  company: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  salary: string;

  @IsString()
  @IsOptional()
  description?: string;
}
