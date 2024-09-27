import { Request, Response } from 'express';
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
            const unidadeHospitalar = await this.unidadeHospitalarService.create(nome, telefone, email, endereco,
                dadosPessoal, latitude, longitude, disponibilidadeLeitos, especialidades, temUTI);
            return res.status(201).json(unidadeHospitalar);
        } catch (error) {
            this.handleError(res, error, "Error creating Unidade Hospitalar.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { nome, telefone, email, endereco, dadosPessoal, latitude, longitude, disponibilidadeLeitos,
                especialidades, temUTI } = req.body;
            const unidadeHospitalar = await this.unidadeHospitalarService.update(id, nome, telefone, email, endereco,
                dadosPessoal, latitude, longitude, disponibilidadeLeitos, especialidades, temUTI);
            return res.status(200).json(unidadeHospitalar);
        } catch (error) {
            this.handleError(res, error, "Error updating Unidade Hospitalar.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.unidadeHospitalarService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Error deleting Unidade Hospitalar.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const unidadesHospitalares = await this.unidadeHospitalarService.getAll();
            return res.status(200).json(unidadesHospitalares);
        } catch (error) {
            this.handleError(res, error, "Error fetching all Unidades Hospitalares.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const unidadeHospitalar = await this.unidadeHospitalarService.getById(id);
            return res.status(200).json(unidadeHospitalar);
        } catch (error) {
            this.handleError(res, error, "Error fetching Unidade Hospitalar by id.");
        }
    }

    private handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg}. ${error.message}`);
            return res.status(400).json({ error: error.message });
        } else {
            console.error(`Unexpected error: ${error}`);
            return res.status(500).json({ error: "An unexpected error occurred." });
        }
    }

    private validateId(id: string) {
        if (id.length !== 24) {
            throw new Error("Invalid ID.");
        }
    }
}

export { UnidadeHospitalarController };
