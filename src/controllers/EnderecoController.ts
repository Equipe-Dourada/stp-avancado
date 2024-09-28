import { NextFunction, Request, Response } from 'express';
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
            this.handleError(res, error, "Erro ao criar Endereco.");
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
            this.handleError(res, error, "Erro ao atualizar Endereco.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.enderecoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar Endereco.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const enderecos = await this.enderecoService.getAll();
            return res.status(200).json(enderecos);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todos Enderecos.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const endereco = await this.enderecoService.getById(id);
            return res.status(200).json(endereco);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar Endereco pelo ID.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const endereco = await this.enderecoService.getById(id);
            if (!endereco) {
                return res.status(404).json({ error: "Endereco não encontrado." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar Endereco.");
        }
    }

    private handleError(res:Response, error:unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg}. ${error.message}`);
            return res.status(400).json({error: error.message});
        } else {
            console.error(`Unexpected error occurred: ${error}`);
            return res.status(500).json({error: "An unexpected error occurred."});
        }
    }

    private validateId(id: string) {
        if (id.length !== 24) {
            throw new Error("ID Inválido.");
        }
    }
}

export { EnderecoController };
