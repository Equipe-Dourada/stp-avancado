import { Request, Response } from 'express';
import { MedicoService } from "../services/MedicoService";

class MedicoController {
    private medicoService: MedicoService;

    constructor() {
        this.medicoService = new MedicoService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { crm, nome, telefone, unidadeHospitalarId, papel, especialidadeId } = req.body;
            const medico = await this.medicoService.create(crm, nome, telefone, unidadeHospitalarId, papel, especialidadeId);
            return res.status(201).json(medico);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const crm = req.params.crm;
            const { nome, telefone, unidadeHospitalarId, papel, especialidadeId } = req.body;
            const medico = await this.medicoService.update(crm, nome, telefone, unidadeHospitalarId, papel, especialidadeId);
            return res.status(200).json(medico);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const crm = req.params.crm;
            await this.medicoService.delete(crm);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const medicos = await this.medicoService.getAll();
            return res.status(200).json(medicos);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    getByCrm = async (req: Request, res: Response) => {
        try {
            const crm = req.params.crm;
            const medico = await this.medicoService.getByCrm(crm);
            return res.status(200).json(medico);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}

export { MedicoController };
