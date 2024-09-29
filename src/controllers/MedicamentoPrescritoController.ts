import { NextFunction, Request, Response } from 'express';
import { MedicamentoPrescritoService } from '../services/MedicamentoPrescritoService';

class MedicamentoPrescritoController {
    private medicamentoPrescritoService: MedicamentoPrescritoService;

    constructor() {
        this.medicamentoPrescritoService = new MedicamentoPrescritoService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao } = req.body;
            const validation = this.isValidInput(posologia, dosagem, unidadeDosagem, viaAdministracao);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const medicamentoPrescrito = await this.medicamentoPrescritoService.create(medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao);
            return res.status(201).json(medicamentoPrescrito);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar MedicamentoPrescrito.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao } = req.body;
            const validation = this.isValidInput(posologia, dosagem, unidadeDosagem, viaAdministracao);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const medicamentoPrescrito = await this.medicamentoPrescritoService.update(id, medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao);
            return res.status(200).json(medicamentoPrescrito);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar MedicamentoPrescrito.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.medicamentoPrescritoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar MedicamentoPrescrito.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const medicamentosPrescritos = await this.medicamentoPrescritoService.getAll();
            return res.status(200).json(medicamentosPrescritos);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todos MedicamentosPrescritos.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const medicamentoPrescrito = await this.medicamentoPrescritoService.getById(id);
            return res.status(200).json(medicamentoPrescrito);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar MedicamentoPrescrito pelo ID.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const medicamentoPrescrito = await this.medicamentoPrescritoService.getById(id);
            if (!medicamentoPrescrito) {
                return res.status(404).json({ error: "MedicamentoPrescrito não encontrado." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar MedicamentoPrescrito.");
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

    private isValidInput(posologia: any, dosagem: any, unidadeDosagem: any, viaAdministracao: any) {
        if(typeof posologia !== "string" || posologia.trim().length == 0) {
            return {isValid: false, msg: "Invalid posologia: must be a non empty string."}
        }
        if (typeof dosagem !== "number" || dosagem < 0) {
            return { isValid: false, msg: "Invalid dosagem: must be a positive number." };
        }
        if(typeof unidadeDosagem !== "string" || unidadeDosagem.trim().length == 0) {
            return {isValid: false, msg: "Invalid unidadeDosagem: must be a non empty string."}
        }
        if(typeof viaAdministracao !== "string" || viaAdministracao.trim().length == 0) {
            return {isValid: false, msg: "Invalid viaAdministracao: must be a non empty string."}
        }
        return  {isValid: true }
    }
}

export { MedicamentoPrescritoController };
