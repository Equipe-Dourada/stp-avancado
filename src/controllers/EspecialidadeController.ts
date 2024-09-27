import { Request, Response } from 'express';
import { EspecialidadeService } from '../services/EspecialidadeService';

class EspecialidadeController {
    private especialidadeService: EspecialidadeService;

    constructor() {
        this.especialidadeService = new EspecialidadeService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { nome, descricao } = req.body;
            const especialidade = await this.especialidadeService.create(nome, descricao);
            return res.status(201).json(especialidade);
        } catch (error) {
            this.handleError(res, error, "Error creating specialty.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { nome, descricao } = req.body;
            const especialidade = await this.especialidadeService.update(id, nome, descricao);
            return res.status(200).json(especialidade);
        } catch (error) {
            this.handleError(res, error, "Error updating specialty.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.especialidadeService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Error deleting specialty.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const especialidades = await this.especialidadeService.getAll();
            return res.status(200).json(especialidades);
        } catch (error) {
            this.handleError(res, error, "Error fetching specialties.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const especialidade = await this.especialidadeService.getById(id);
            return res.status(200).json(especialidade);
        } catch (error) {
            this.handleError(res, error, "Error fetching specialty by ID.");
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

export { EspecialidadeController };
