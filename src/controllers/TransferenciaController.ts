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
            console.error(`Erro ao criar transferência: ${error}`);
            return res.status(500).json({ error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { meioTransporte, destinoId, medicoDestinoId, origemId, medicoOrigemId, medicoReguladorId, horarioSaida,
                horarioPrevistoChegada, distancia, documentoId, pacienteId, solicitacaoId } = req.body;
            const transferencia = await this.transferenciaService.update(id, meioTransporte, destinoId, medicoDestinoId,
                origemId, medicoOrigemId, medicoReguladorId, horarioSaida, horarioPrevistoChegada, distancia, documentoId,
                pacienteId, solicitacaoId);
            return res.status(200).json(transferencia);
        } catch (error) {
            console.error(`Erro ao atualizar transferência: ${error}`);
            return res.status(500).json({ error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.transferenciaService.delete(id);
            return res.status(204).send();
        } catch (error) {
            console.error(`Erro ao deletar transferência: ${error}`);
            return res.status(500).json({ error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const transferencias = await this.transferenciaService.getAll();
            return res.status(200).json(transferencias);
        } catch (error) {
            console.error(`Erro ao buscar transferências: ${error}`);
            return res.status(500).json({ error });
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const transferencia = await this.transferenciaService.getById(id);
            return res.status(200).json(transferencia);
        } catch (error) {
            console.error(`Erro ao buscar transferência: ${error}`);
            return res.status(500).json({ error });
        }
    }
}

export { TransferenciaController };
