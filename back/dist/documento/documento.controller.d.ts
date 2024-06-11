import { DocumentoService } from './documento.service';
import { Documento } from './schema/documentacao.schema';
export declare class DocumentoController {
    private documentoService;
    constructor(documentoService: DocumentoService);
    getAllFichas(): Promise<Documento[]>;
    getDocumento(id: string): Promise<Documento>;
    createDocumento(documento: Documento): Promise<Documento>;
    updateDocumento(id: string, documento: Documento): Promise<Documento>;
    deleteDocumento(id: string): Promise<void>;
}
