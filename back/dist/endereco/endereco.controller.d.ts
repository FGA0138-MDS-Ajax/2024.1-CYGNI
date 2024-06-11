import { EnderecoService } from './endereco.service';
import { Endereco } from './schema/endereco.schema';
export declare class EnderecoController {
    private enderecoService;
    constructor(enderecoService: EnderecoService);
    getAllFichas(): Promise<Endereco[]>;
    getEndereco(id: string): Promise<Endereco>;
    createEndereco(endereco: Endereco): Promise<Endereco>;
    updateEndereco(id: string, endereco: Endereco): Promise<Endereco>;
    deleteEndereco(id: string): Promise<void>;
}
