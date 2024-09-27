import { Request, Response } from 'express';
import { ProntuarioService } from "../services/ProntuarioService";

class ProntuarioController {
    private prontuarioService: ProntuarioService;

    constructor() {
        this.prontuarioService = new ProntuarioService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { classificacao, medicamentosAtuais } = req.body;
            this.validateProntuarioData(classificacao, medicamentosAtuais);
            const prontuario = await this.prontuarioService.create(classificacao, medicamentosAtuais);
            return res.status(201).json(prontuario);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar prontuário.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { classificacao, medicamentosAtuais } = req.body;
            this.validateProntuarioData(classificacao, medicamentosAtuais);
            const prontuario = await this.prontuarioService.update(id, classificacao, medicamentosAtuais);
            return res.status(200).json(prontuario);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar prontuário.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.prontuarioService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar prontuário.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const prontuarios = await this.prontuarioService.getAll();
            return res.status(200).json(prontuarios);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todos os prontuários.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const prontuario = await this.prontuarioService.getById(id);
            return res.status(200).json(prontuario);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar prontuário por ID.");
        }
    }

    private handleError(res: Response, error: unknown, message: string) {
        if (error instanceof Error) {
            console.error(`${message} ${error.message}`);
            return res.status(400).json({ error: error.message });
        } else {
            console.error(`Unexpected error: ${error}`);
            return res.status(500).json({ error: "Ocorreu um erro inesperado." });
        }
    }

    private validateProntuarioData(classificacao: string, medicamentosAtuais: string[]) {
        if (!classificacao || typeof classificacao !== 'string') {
            throw new Error("Classificação inválida.");
        }

        if (!Array.isArray(medicamentosAtuais)) {
            throw new Error("Medicamentos atuais devem ser uma lista.");
        }
    }
}

export { ProntuarioController };
