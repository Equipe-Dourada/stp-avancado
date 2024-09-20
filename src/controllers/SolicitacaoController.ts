import { Request, Response } from 'express';
import { SolicitacaoService } from "../services/SolicitacaoService";

class SolicitacaoController {

    private solicitacaoService: SolicitacaoService;

    constructor () {
        this.solicitacaoService = new SolicitacaoService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { medicoId, pacienteId, motivo, documentoId, especialidadeId, horarioSolicitacao } = req.body;
            const solicitacao = await this.solicitacaoService.create(medicoId, pacienteId, motivo, documentoId, especialidadeId, horarioSolicitacao);
            return res.status(201).json(solicitacao);
        } catch (error) {
            console.error(`Error ao criar solicitacao: ${error}`);
            return res.status(400).json({ error: error });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { medicoId, pacienteId, motivo, documentoId, especialidadeId, horarioSolicitacao } = req.body;
            const solicitacao = await this.solicitacaoService.update(id, medicoId, pacienteId, motivo, documentoId, especialidadeId, horarioSolicitacao);
            return res.status(200).json(solicitacao);
        } catch (error) {
            console.error(`Error ao atualizar solicitacao: ${error}`);
            return res.status(400).json({ error: error });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.solicitacaoService.delete(id);
            return res.status(204).json();
        } catch (error) {
            console.error(`Error ao deletar solicitacao: ${error}`);
            return res.status(400).json({ error: error });
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const solicitacoes = await this.solicitacaoService.getAll();
            return res.status(200).json(solicitacoes);
        } catch (error) {
            console.error(`Error ao buscar solicitacoes: ${error}`);
            return res.status(400).json({ error: error });
        }
    }

    getById = async(req:Request, res:Response) => {
        try {
            const id = req.params.id;
            const solicitacao = await this.solicitacaoService.getById(id);
            return res.status(200).json(solicitacao);
        } catch (error) {
            console.error(`Error ao buscar solicitacao: ${error}`);
            return res.status(400).json({ error: error });
        }
    }
}

export { SolicitacaoController };
