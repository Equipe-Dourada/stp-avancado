import { Request, Response } from 'express';
import { TransferenciaService } from '../services/TransferenciaService';

class TransferenciaController {
    private transferenciaService: TransferenciaService;

    constructor() {
        this.transferenciaService = new TransferenciaService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { meioTransporte, destinoId, medicoDestinoId, origemId, medicoOrigemId, medicoReguladorId, horarioSaida,
                horarioPrevistoChegada, distancia, documentoId, pacienteId, solicitacaoId } = req.body;

            const transferencia = await this.transferenciaService.create(meioTransporte, destinoId, medicoDestinoId,
                origemId, medicoOrigemId, medicoReguladorId, horarioSaida, horarioPrevistoChegada, distancia, documentoId,
                pacienteId, solicitacaoId);

            return res.status(201).json(transferencia);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar transferência.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);

            const { meioTransporte, destinoId, medicoDestinoId, origemId, medicoOrigemId, medicoReguladorId, horarioSaida,
                horarioPrevistoChegada, distancia, documentoId, pacienteId, solicitacaoId } = req.body;

            const transferencia = await this.transferenciaService.update(id, meioTransporte, destinoId, medicoDestinoId,
                origemId, medicoOrigemId, medicoReguladorId, horarioSaida, horarioPrevistoChegada, distancia, documentoId,
                pacienteId, solicitacaoId);

            return res.status(200).json(transferencia);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar transferência.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);

            await this.transferenciaService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar transferência.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const transferencias = await this.transferenciaService.getAll();
            return res.status(200).json(transferencias);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar transferências.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);

            const transferencia = await this.transferenciaService.getById(id);
            return res.status(200).json(transferencia);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar transferência.");
        }
    }

    private handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg}. ${error.message}`);
            return res.status(400).json({ error: error.message });
        } else {
            console.error(`Erro inesperado: ${error}`);
            return res.status(500).json({ error: "Ocorreu um erro inesperado." });
        }
    }

    private validateId(id: string) {
        if (id.length !== 24) {
            throw new Error("ID inválido.");
        }
    }
}

export { TransferenciaController };
