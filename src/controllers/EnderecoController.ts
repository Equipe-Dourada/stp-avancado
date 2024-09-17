import { Request, Response } from 'express';
import { EnderecoService } from '../services/EnderecoService';

class EnderecoController {
    private enderecoService: EnderecoService;

    constructor() {
        this.enderecoService = new EnderecoService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { cep, rua, numero, bairro, cidade, estado, complemento } = req.body;
            const endereco = await this.enderecoService.create(cep, rua, numero, bairro, cidade, estado, complemento);
            return res.status(201).json(endereco);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { cep, rua, numero, bairro, cidade, estado, complemento } = req.body;
            const endereco = await this.enderecoService.update(id, cep, rua, numero, bairro, cidade, estado, complemento);
            return res.status(200).json(endereco);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.enderecoService.delete(id);
            return res.status(204).json();
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const enderecos = await this.enderecoService.getAll();
            return res.status(200).json(enderecos);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const endereco = await this.enderecoService.getById(id);
            return res.status(200).json(endereco);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }
}

export { EnderecoController };
