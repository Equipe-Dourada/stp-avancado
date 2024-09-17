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
            return res.status(400).json({ error: error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao } = req.body;
            const medicamentoPrescrito = await this.medicamentoPrescritoService.update(id, medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao);
            return res.status(200).json(medicamentoPrescrito);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.medicamentoPrescritoService.delete(id);
            return res.status(204).json();
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const medicamentosPrescritos = await this.medicamentoPrescritoService.getAll();
            return res.status(200).json(medicamentosPrescritos);
        } catch (error) {
            return res.status(400).json({ error: error });
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const medicamentoPrescrito = await this.medicamentoPrescritoService.getById(id);
            return res.status(200).json(medicamentoPrescrito);
        } catch (error) {
            return res.status(400).json({error: error});
        }
    }
}

export { MedicamentoPrescritoController };
