import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministradorDto } from './create-administradore.dto';

export class UpdateAdministradorDto extends PartialType(CreateAdministradorDto) {}
