import { FichaGerencialService } from './ficha-gerencial.service';
import { FichaGerencial } from './schema/fichaGerencial.schema';
export declare class FichaGerencialController {
    private fichaGerencialService;
    constructor(fichaGerencialService: FichaGerencialService);
    getAllFichas(): Promise<FichaGerencial[]>;
    createFichaGerencial(FichaGerencial: any): Promise<FichaGerencial>;
}
