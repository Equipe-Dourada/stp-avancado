import { NextFunction, Request, Response } from 'express';
import { EspecialidadeService } from '../services/EspecialidadeService';

class EspecialidadeController {
    private especialidadeService: EspecialidadeService;

    constructor() {
        this.especialidadeService = new EspecialidadeService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { nome, descricao } = req.body;
            const validation = this.isValidInput(nome, descricao);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const especialidade = await this.especialidadeService.create(nome, descricao);
            return res.status(201).json(especialidade);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar Especialidade.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { nome, descricao } = req.body;
            const validation = this.isValidInput(nome, descricao);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const especialidade = await this.especialidadeService.update(id, nome, descricao);
            return res.status(200).json(especialidade);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar Especialidade.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.especialidadeService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar Especialidade.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const especialidades = await this.especialidadeService.getAll();
            return res.status(200).json(especialidades);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todas Especialidades.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const especialidade = await this.especialidadeService.getById(id);
            return res.status(200).json(especialidade);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar Especialidade pelo ID.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const especialidade = await this.especialidadeService.getById(id);
            if (!especialidade) {
                return res.status(404).json({ error: "Especialidade não encontrada." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar Especialidade.");
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

    private isValidInput(nome: any, descricao: any) {
        if(typeof nome !== "string" || nome.trim().length == 0) {
            return {isValid: false, msg: "Invalid nome: must be a non empty string."}
        }
        if(typeof descricao !== "string" || descricao.trim().length == 0) {
            return {isValid: false, msg: "Invalid descricao: must be a non empty string."}
        }
        return  {isValid: true };
    }
}

export { EspecialidadeController };
