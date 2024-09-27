import { Request, Response } from 'express';
import { MedicamentoService } from '../services/MedicamentoService';

class MedicamentoController {
    private medicamentoService: MedicamentoService;

    constructor() {
        this.medicamentoService = new MedicamentoService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { nome, principioAtivo, descricao } = req.body;
            const medicamento = await this.medicamentoService.create(nome, principioAtivo, descricao);
            return res.status(201).json(medicamento);
        } catch (error) {
            this.handleError(res, error, "Error creating medication.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { nome, principioAtivo, descricao } = req.body;
            const medicamento = await this.medicamentoService.update(id, nome, principioAtivo, descricao);
            return res.status(200).json(medicamento);
        } catch (error) {
            this.handleError(res, error, "Error updating medication.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.medicamentoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Error deleting medication.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const medicamentos = await this.medicamentoService.getAll();
            return res.status(200).json(medicamentos);
        } catch (error) {
            this.handleError(res, error, "Error fetching medications.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const medicamento = await this.medicamentoService.getById(id);
            return res.status(200).json(medicamento);
        } catch (error) {
            this.handleError(res, error, "Error fetching medication by ID.");
        }
    }

    private handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg} ${error.message}`);
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

export { MedicamentoController };
