import { NextFunction, Request, Response } from 'express';
import { UnidadeHospitalarService } from "../services/UnidadeHospitalarService";

class UnidadeHospitalarController {
    private unidadeHospitalarService: UnidadeHospitalarService;

    constructor() {
        this.unidadeHospitalarService = new UnidadeHospitalarService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { nome, telefone, email, endereco, dadosPessoal, latitude, longitude, disponibilidadeLeitos,
                especialidades, temUTI } = req.body;
            const validation = this.isValidInput(nome, telefone, email, dadosPessoal, latitude, longitude, disponibilidadeLeitos);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const unidadeHospitalar = await this.unidadeHospitalarService.create(nome, telefone, email, endereco,
                dadosPessoal, latitude, longitude, disponibilidadeLeitos, especialidades, temUTI);
            return res.status(201).json(unidadeHospitalar);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar UnidadeHospitalar.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { nome, telefone, email, endereco, dadosPessoal, latitude, longitude, disponibilidadeLeitos,
                especialidades, temUTI } = req.body;
            const validation = this.isValidInput(nome, telefone, email, dadosPessoal, latitude, longitude, disponibilidadeLeitos);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const unidadeHospitalar = await this.unidadeHospitalarService.update(id, nome, telefone, email, endereco,
                dadosPessoal, latitude, longitude, disponibilidadeLeitos, especialidades, temUTI);
            return res.status(200).json(unidadeHospitalar);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar UnidadeHospitalar.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.unidadeHospitalarService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar UnidadeHospitalar.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const unidadesHospitalares = await this.unidadeHospitalarService.getAll();
            return res.status(200).json(unidadesHospitalares);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todas UnidadesHospitalares.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const unidadeHospitalar = await this.unidadeHospitalarService.getById(id);
            return res.status(200).json(unidadeHospitalar);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar UnidadeHospitalar pelo id.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const unidadeHospitalar = await this.unidadeHospitalarService.getById(id);
            if (!unidadeHospitalar) {
                return res.status(404).json({ error: "UnidadeHospitalar não encontrada." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar UnidadeHospitalar.");
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

    private isValidInput(nome: any, telefone: any, email: any, dadosPessoal: any, latitude: any, longitude: any, disponibilidadeLeitos: any) {
        if(typeof nome !== "string" || nome.trim().length == 0) {
            return {isValid: false, msg: "Invalid nome: must be a non empty string."}
        }
        if(typeof telefone !== "string" || telefone.trim().length == 0) {
            return {isValid: false, msg: "Invalid telefone: must be a non empty string."}
        }
        if(typeof email !== "string" || email.trim().length == 0) {
            return {isValid: false, msg: "Invalid email: must be a non empty string."}
        }
        if(typeof dadosPessoal !== "string" || dadosPessoal.trim().length == 0) {
            return {isValid: false, msg: "Invalid dadosPessoal: must be a non empty string."}
        }
        if (typeof latitude !== "number" || latitude < -90 || latitude > 90) {
            return { isValid: false, msg: "Invalid latitude: must be a number between -90 and 90." };
        }
        if (typeof longitude !== "number" || longitude < -180 || longitude > 180) {
            return { isValid: false, msg: "Invalid longitude: must be a number between -180 and 180." };
        }
        if (typeof disponibilidadeLeitos !== "number" || disponibilidadeLeitos < 0) {
            return { isValid: false, msg: "Invalid disponibilidadeLeitos: must be a positive number." };
        }
        return  {isValid: true };
    }
}

export { UnidadeHospitalarController };
