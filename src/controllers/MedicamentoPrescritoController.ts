import { Request, Response } from 'express';
import { MedicamentoPrescritoService } from '../services/MedicamentoPrescritoService';

class MedicamentoPrescritoController {
    private medicamentoPrescritoService: MedicamentoPrescritoService;

    constructor() {
        this.medicamentoPrescritoService = new MedicamentoPrescritoService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao } = req.body;
            const medicamentoPrescrito = await this.medicamentoPrescritoService.create(medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao);
            return res.status(201).json(medicamentoPrescrito);
        } catch (error) {
            this.handleError(res, error, "Error creating prescribed medication.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao } = req.body;
            const medicamentoPrescrito = await this.medicamentoPrescritoService.update(id, medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao);
            return res.status(200).json(medicamentoPrescrito);
        } catch (error) {
            this.handleError(res, error, "Error updating prescribed medication.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.medicamentoPrescritoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Error deleting prescribed medication.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const medicamentosPrescritos = await this.medicamentoPrescritoService.getAll();
            return res.status(200).json(medicamentosPrescritos);
        } catch (error) {
            this.handleError(res, error, "Error fetching prescribed medications.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const medicamentoPrescrito = await this.medicamentoPrescritoService.getById(id);
            return res.status(200).json(medicamentoPrescrito);
        } catch (error) {
            this.handleError(res, error, "Error fetching prescribed medication by ID.");
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

export { MedicamentoPrescritoController };
