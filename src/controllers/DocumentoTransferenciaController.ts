import {NextFunction, Request, Response} from 'express';
import { DocumentoTransferenciaService } from "../services/DocumentoTransferenciaService";

class DocumentoTransferenciaController {
    private documentoTransferenciaService: DocumentoTransferenciaService;

    constructor() {
        this.documentoTransferenciaService = new DocumentoTransferenciaService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { drogasAdministradas, procedimentosAcondicionamento, procedimentosRecebimento } = req.body;
            const documentoTransferencia = await this.documentoTransferenciaService.create(drogasAdministradas, procedimentosAcondicionamento, procedimentosRecebimento);
            return res.status(201).json(documentoTransferencia);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar DocumentoTransferencia.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { drogasAdministradas, procedimentosAcondicionamento, procedimentosRecebimento } = req.body;
            const documentoTransferencia = await this.documentoTransferenciaService.update(id, drogasAdministradas, procedimentosAcondicionamento, procedimentosRecebimento);
            return res.status(200).json(documentoTransferencia);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar DocumentoTransferencia.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.documentoTransferenciaService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar DocumentoTransferencia.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const documentosTransferencia = await this.documentoTransferenciaService.getAll();
            return res.status(200).json(documentosTransferencia);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todos DocumentosTransferencias.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const documentoTransferencia = await this.documentoTransferenciaService.getById(id);
            return res.status(200).json(documentoTransferencia);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar DocumentoTransferencia pelo ID.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const documentoTransferencia = await this.documentoTransferenciaService.getById(id);
            if (!documentoTransferencia) {
                return res.status(404).json({ error: "Documento de Transferencia não encontrado." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar existência de DocumentoTransferencia.");
        }
    }

    private handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg}. ${error.message}`);
            return res.status(400).json({error: error.message});
        } else {
            console.error(`Erro inesperado: ${error}`);
            return res.status(500).json({error: "Ocorreu um erro inesperado."});
        }
    }

    private validateId(id: string) {
        if (id.length !== 24) {
            throw new Error("ID Inválido.");
        }
    }
}

export { DocumentoTransferenciaController };
