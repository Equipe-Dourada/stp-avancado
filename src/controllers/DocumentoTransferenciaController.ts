import { Request, Response } from 'express';
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
            return res.status(400).json({ error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { drogasAdministradas, procedimentosAcondicionamento, procedimentosRecebimento } = req.body;
            const documentoTransferencia = await this.documentoTransferenciaService.update(id, drogasAdministradas, procedimentosAcondicionamento, procedimentosRecebimento);
            return res.status(200).json(documentoTransferencia);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.documentoTransferenciaService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const documentosTransferencia = await this.documentoTransferenciaService.getAll();
            return res.status(200).json(documentosTransferencia);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const documentoTransferencia = await this.documentoTransferenciaService.getById(id);
            return res.status(200).json(documentoTransferencia);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}

export { DocumentoTransferenciaController };
