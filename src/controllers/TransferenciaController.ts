import { NextFunction, Request, Response } from 'express';
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
            const validation = this.isValidInput(horarioSaida, horarioPrevistoChegada, distancia);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const transferencia = await this.transferenciaService.create(meioTransporte, destinoId, medicoDestinoId,
                origemId, medicoOrigemId, medicoReguladorId, horarioSaida, horarioPrevistoChegada, distancia, documentoId,
                pacienteId, solicitacaoId);
            return res.status(201).json(transferencia);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar Transferencia.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { meioTransporte, destinoId, medicoDestinoId, origemId, medicoOrigemId, medicoReguladorId, horarioSaida,
                horarioPrevistoChegada, distancia, documentoId, pacienteId, solicitacaoId } = req.body;
            const validation = this.isValidInput(horarioSaida, horarioPrevistoChegada, distancia);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const transferencia = await this.transferenciaService.update(id, meioTransporte, destinoId, medicoDestinoId,
                origemId, medicoOrigemId, medicoReguladorId, horarioSaida, horarioPrevistoChegada, distancia, documentoId,
                pacienteId, solicitacaoId);

            return res.status(200).json(transferencia);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar Transferencia.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);

            await this.transferenciaService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar Transferencia.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const transferencias = await this.transferenciaService.getAll();
            return res.status(200).json(transferencias);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todas Transferencias.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);

            const transferencia = await this.transferenciaService.getById(id);
            return res.status(200).json(transferencia);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar Transferencia.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const transferencia = await this.transferenciaService.getById(id);
            if (!transferencia) {
                return res.status(404).json({ error: "Transferencia não encontrada." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar Transferencia.");
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
            throw new Error("ID Inválido.");
        }
    }

    private isValidInput(horarioSaida: any, horarioPrevistoChegada: any, distancia: any) {
        if(typeof horarioSaida !== "string" || horarioSaida.trim().length == 0) {
            return {isValid: false, msg: "Invalid horarioSaida: must be a non empty string."}
        }
        if(typeof horarioPrevistoChegada !== "string" || horarioPrevistoChegada.trim().length == 0) {
            return {isValid: false, msg: "Invalid horarioPrevistoChegada: must be a non empty string."}
        }
        if (typeof distancia !== "number" || distancia < 0) {
            return { isValid: false, msg: "Invalid distancia: must be a positive number" };
        }
        return  {isValid: true };
    }
}

export { TransferenciaController };
