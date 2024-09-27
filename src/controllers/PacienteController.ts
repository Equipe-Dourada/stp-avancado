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
            this.validateCpf(cpf);
            const paciente = await this.pacienteService.create(cpf, nome, telefone, email, enderecoId, tipoSanguineo, prontuarioId);
            return res.status(201).json(paciente);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar paciente.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const cpf = req.params.cpf;
            this.validateCpf(cpf);
            const { nome, telefone, email, enderecoId, tipoSanguineo, prontuarioId } = req.body;
            const paciente = await this.pacienteService.update(cpf, nome, telefone, email, enderecoId, tipoSanguineo, prontuarioId);
            return res.status(200).json(paciente);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar paciente.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const cpf = req.params.cpf;
            this.validateCpf(cpf);
            await this.pacienteService.delete(cpf);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar paciente.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const pacientes = await this.pacienteService.getAll();
            return res.status(200).json(pacientes);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todos os pacientes.");
        }
    }

    getByCpf = async (req: Request, res: Response) => {
        try {
            const cpf = req.params.cpf;
            this.validateCpf(cpf);
            const paciente = await this.pacienteService.getByCpf(cpf);
            return res.status(200).json(paciente);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar paciente pelo CPF.");
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

    private validateCpf(cpf: string) {
        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(cpf)) {
            throw new Error("CPF inválido. O CPF deve conter 11 dígitos numéricos.");
        }
    }
}

export { PacienteController };
