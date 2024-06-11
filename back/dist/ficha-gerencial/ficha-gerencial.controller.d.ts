import { FichaGerencialService } from './ficha-gerencial.service';
import { FichaGerencial } from './schema/fichaGerencial.schema';
export declare class FichaGerencialController {
    private fichaGerencialService;
    constructor(fichaGerencialService: FichaGerencialService);
    getAllFichas(): Promise<FichaGerencial[]>;
    getFichaGerencial(id: string): Promise<FichaGerencial>;
    createFichaGerencial(fichaGerencial: FichaGerencial): Promise<FichaGerencial>;
    updateFichaGerencial(id: string, fichaGerencial: FichaGerencial): Promise<FichaGerencial>;
    deleteFichaGerencial(id: string): Promise<void>;
}
