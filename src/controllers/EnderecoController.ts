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
            this.handleError(res, error, "Error creating address.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { cep, rua, numero, bairro, cidade, estado, complemento } = req.body;
            const endereco = await this.enderecoService.update(id, cep, rua, numero, bairro, cidade, estado, complemento);
            return res.status(200).json(endereco);
        } catch (error) {
            this.handleError(res, error, "Error updating address.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.enderecoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Error deleting address.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const enderecos = await this.enderecoService.getAll();
            return res.status(200).json(enderecos);
        } catch (error) {
            this.handleError(res, error, "Error fetching addresses.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const endereco = await this.enderecoService.getById(id);
            return res.status(200).json(endereco);
        } catch (error) {
            this.handleError(res, error, "Error fetching address by ID.");
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

export { EnderecoController };
