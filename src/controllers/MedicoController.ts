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
            this.handleError(res, error, "Erro ao criar o médico.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const crm = req.params.crm;
            this.validateCrm(crm);
            const { nome, telefone, unidadeHospitalarId, papel, especialidadeId } = req.body;
            const medico = await this.medicoService.update(crm, nome, telefone, unidadeHospitalarId, papel, especialidadeId);
            return res.status(200).json(medico);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar o médico.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const crm = req.params.crm;
            this.validateCrm(crm);
            await this.medicoService.delete(crm);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar o médico.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const medicos = await this.medicoService.getAll();
            return res.status(200).json(medicos);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar os médicos.");
        }
    }

    getByCrm = async (req: Request, res: Response) => {
        try {
            const crm = req.params.crm;
            this.validateCrm(crm);
            const medico = await this.medicoService.getByCrm(crm);
            return res.status(200).json(medico);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar o médico pelo CRM.");
        }
    }

    private handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg} ${error.message}`);
            return res.status(400).json({ error: error.message });
        } else {
            console.error(`Unexpected error: ${error}`);
            return res.status(500).json({ error: "Ocorreu um erro inesperado." });
        }
    }

    private validateCrm(crm: string) {
        const crmRegex = /^[0-9]{4,10}$/;
        if (!crmRegex.test(crm)) {
            throw new Error("CRM inválido.");
        }
    }
}

export { MedicoController };
