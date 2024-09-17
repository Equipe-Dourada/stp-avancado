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
            return res.status(400).json({ error: error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { nome, principioAtivo, descricao } = req.body;
            const medicamento = await this.medicamentoService.update(id, nome, principioAtivo, descricao);
            return res.status(200).json(medicamento);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.medicamentoService.delete(id);
            return res.status(204).json();
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const medicamentos = await this.medicamentoService.getAll();
            return res.status(200).json(medicamentos);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const medicamento = await this.medicamentoService.getById(id);
            return res.status(200).json(medicamento);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}

export { MedicamentoController };
