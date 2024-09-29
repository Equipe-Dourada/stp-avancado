import { NextFunction, Request, Response } from 'express';
import { MedicamentoService } from '../services/MedicamentoService';

class MedicamentoController {
    private medicamentoService: MedicamentoService;

    constructor() {
        this.medicamentoService = new MedicamentoService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { nome, principioAtivo, descricao } = req.body;
            const validation = this.isValidInput(nome, principioAtivo, descricao);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const medicamento = await this.medicamentoService.create(nome, principioAtivo, descricao);
            return res.status(201).json(medicamento);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar Medicamento.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { nome, principioAtivo, descricao } = req.body;
            const validation = this.isValidInput(nome, principioAtivo, descricao);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const medicamento = await this.medicamentoService.update(id, nome, principioAtivo, descricao);
            return res.status(200).json(medicamento);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar Medicamento.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.medicamentoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar Medicamento.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const medicamentos = await this.medicamentoService.getAll();
            return res.status(200).json(medicamentos);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todos Medicamentos.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const medicamento = await this.medicamentoService.getById(id);
            return res.status(200).json(medicamento);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar Medicamento pelo ID.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const medicamento = await this.medicamentoService.getById(id);
            if (!medicamento) {
                return res.status(404).json({ error: "Medicamento não encontrado." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar Medicamento.");
        }
    }

    private handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg} ${error.message}`);
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

    private isValidInput(nome: any, principioAtivo: any, descricao: any) {
        if(typeof nome !== "string" || nome.trim().length == 0) {
            return {isValid: false, msg: "Invalid nome: must be a non empty string."}
        }
        if(typeof principioAtivo !== "string" || principioAtivo.trim().length == 0) {
            return {isValid: false, msg: "Invalid principioAtivo: must be a non empty string."}
        }
        if(typeof descricao !== "string" || descricao.trim().length == 0) {
            return {isValid: false, msg: "Invalid descricao: must be a non empty string."}
        }
        return  {isValid: true }
    }
}

export { MedicamentoController };
