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
            return res.status(400).json({ error: error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { nome, descricao } = req.body;
            const especialidade = await this.especialidadeService.update(id, nome, descricao);
            return res.status(200).json(especialidade);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.especialidadeService.delete(id);
            return res.status(204).json();
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const especialidades = await this.especialidadeService.getAll();
            return res.status(200).json(especialidades);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const especialidade = await this.especialidadeService.getById(id);
            return res.status(200).json(especialidade);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}

export { EspecialidadeController };
