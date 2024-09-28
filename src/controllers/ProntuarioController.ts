import { NextFunction, Request, Response } from 'express';
import { ProntuarioService } from "../services/ProntuarioService";

class ProntuarioController {
    private prontuarioService: ProntuarioService;

    constructor() {
        this.prontuarioService = new ProntuarioService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { classificacao, medicamentosAtuais } = req.body;
            const prontuario = await this.prontuarioService.create(classificacao, medicamentosAtuais);
            return res.status(201).json(prontuario);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar Prontuario.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { classificacao, medicamentosAtuais } = req.body;
            const prontuario = await this.prontuarioService.update(id, classificacao, medicamentosAtuais);
            return res.status(200).json(prontuario);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar Prontuario.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.prontuarioService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar Prontuario.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const prontuarios = await this.prontuarioService.getAll();
            return res.status(200).json(prontuarios);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todos Prontuarios.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const prontuario = await this.prontuarioService.getById(id);
            return res.status(200).json(prontuario);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar Prontuario pelo ID.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const prontuario = await this.prontuarioService.getById(id);
            if (!prontuario) {
                return res.status(404).json({ error: "Prontuario não encontrado." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar Prontuario.");
        }
    }

    private handleError(res: Response, error: unknown, message: string) {
        if (error instanceof Error) {
            console.error(`${message} ${error.message}`);
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
}

export { ProntuarioController };
