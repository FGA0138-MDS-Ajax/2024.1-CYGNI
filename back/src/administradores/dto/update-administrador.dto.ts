import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministradorDto } from './create-administrador.dto';

export class UpdateAdministradorDto extends PartialType(CreateAdministradorDto) {}
