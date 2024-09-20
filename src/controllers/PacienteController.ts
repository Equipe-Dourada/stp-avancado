import { Request, Response } from 'express';
import { PacienteService } from "../services/PacienteService";

class PacienteController {
    private pacienteService: PacienteService;

    constructor() {
        this.pacienteService = new PacienteService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { cpf, nome, telefone, email, enderecoId, tipoSanguineo, prontuarioId } = req.body;
            const paciente = await this.pacienteService.create(cpf, nome, telefone, email, enderecoId, tipoSanguineo, prontuarioId);
            return res.status(201).json(paciente);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const cpf = req.params.cpf;
            const { nome, telefone, email, enderecoId, tipoSanguineo, prontuarioId } = req.body;
            const paciente = await this.pacienteService.update(cpf, nome, telefone, email, enderecoId, tipoSanguineo, prontuarioId);
            return res.status(200).json(paciente);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const cpf = req.params.cpf;
            await this.pacienteService.delete(cpf);
            return res.status(204).json();
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const pacientes = await this.pacienteService.getAll();
            return res.status(200).json(pacientes);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    getByCpf = async (req: Request, res: Response) => {
        try {
            const cpf = req.params.cpf;
            const paciente = await this.pacienteService.getByCpf(cpf);
            return res.status(200).json(paciente);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}

export { PacienteController };
