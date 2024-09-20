import { Request, Response } from 'express';
import { UnidadeHospitalarService} from "../services/UnidadeHospitalarService";


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
            return res.status(400).json({ error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { nome, telefone, email, endereco, dadosPessoal, latitude, longitude, disponibilidadeLeitos,
                especialidades, temUTI } = req.body;
            const unidadeHospitalar = await this.unidadeHospitalarService.update(id, nome, telefone, email, endereco,
                dadosPessoal, latitude, longitude, disponibilidadeLeitos, especialidades, temUTI);
            return res.status(200).json(unidadeHospitalar);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.unidadeHospitalarService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const unidadesHospitalares = await this.unidadeHospitalarService.getAll();
            return res.status(200).json(unidadesHospitalares);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const unidadeHospitalar = await this.unidadeHospitalarService.getById(id);
            return res.status(200).json(unidadeHospitalar);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}

export { UnidadeHospitalarController };
