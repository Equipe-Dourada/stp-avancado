import { Request, Response } from 'express';
import { ProntuarioService } from "../services/ProntuarioService";

class ProntuarioController {
    private prontuarioService: ProntuarioService;

    constructor() {
        this.prontuarioService = new ProntuarioService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { classificacao, medicamentosAtuais } = req.body;
            const prontuario = await this.prontuarioService.create(classificacao, medicamentosAtuais);
            return res.status(201).json(prontuario);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { classificacao, medicamentosAtuais } = req.body;
            const prontuario = await this.prontuarioService.update(id, classificacao, medicamentosAtuais);
            return res.status(200).json(prontuario);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.prontuarioService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const prontuarios = await this.prontuarioService.getAll();
            return res.status(200).json(prontuarios);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const prontuario = await this.prontuarioService.getById(id);
            return res.status(200).json(prontuario);
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}

export { ProntuarioController };
