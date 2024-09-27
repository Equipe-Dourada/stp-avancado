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
            this.handleError(res, error, "Erro ao criar solicitação.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { medicoId, pacienteId, motivo, documentoId, especialidadeId, horarioSolicitacao } = req.body;
            const solicitacao = await this.solicitacaoService.update(id, medicoId, pacienteId, motivo, documentoId, especialidadeId, horarioSolicitacao);
            return res.status(200).json(solicitacao);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar solicitação.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.solicitacaoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar solicitação.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const solicitacoes = await this.solicitacaoService.getAll();
            return res.status(200).json(solicitacoes);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar solicitações.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const solicitacao = await this.solicitacaoService.getById(id);
            return res.status(200).json(solicitacao);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar solicitação.");
        }
    }

    private handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg}. ${error.message}`);
            return res.status(400).json({ error: error.message });
        } else {
            console.error(`Erro inesperado: ${error}`);
            return res.status(500).json({ error: "Ocorreu um erro inesperado." });
        }
    }

    private validateId(id: string) {
        if (id.length !== 24) {
            throw new Error("ID inválido.");
        }
    }
}

export { SolicitacaoController };
