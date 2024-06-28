"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdministradorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_administrador_dto_1 = require("./create-administrador.dto");
class UpdateAdministradorDto extends (0, mapped_types_1.PartialType)(create_administrador_dto_1.CreateAdministradorDto) {
}
exports.UpdateAdministradorDto = UpdateAdministradorDto;
//# sourceMappingURL=update-administrador.dto.js.map