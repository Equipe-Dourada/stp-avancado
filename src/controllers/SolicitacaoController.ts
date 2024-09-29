import { NextFunction, Request, Response } from 'express';
import { SolicitacaoService } from "../services/SolicitacaoService";

class SolicitacaoController {

    private solicitacaoService: SolicitacaoService;

    constructor () {
        this.solicitacaoService = new SolicitacaoService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { medicoId, pacienteId, motivo, documentoId, especialidadeId, horarioSolicitacao } = req.body;
            const validation = this.isValidInput(motivo, horarioSolicitacao);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const solicitacao = await this.solicitacaoService.create(medicoId, pacienteId, motivo, documentoId, especialidadeId, horarioSolicitacao);
            return res.status(201).json(solicitacao);
        } catch (error) {
            this.handleError(res, error, "Erro ao criar Solicitacao.");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const { medicoId, pacienteId, motivo, documentoId, especialidadeId, horarioSolicitacao } = req.body;
            const validation = this.isValidInput(motivo, horarioSolicitacao);
            if(!validation.isValid) {
                return res.status(400).json({error: validation.msg});
            }
            const solicitacao = await this.solicitacaoService.update(id, medicoId, pacienteId, motivo, documentoId, especialidadeId, horarioSolicitacao);
            return res.status(200).json(solicitacao);
        } catch (error) {
            this.handleError(res, error, "Erro ao atualizar Solicitacao.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            await this.solicitacaoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            this.handleError(res, error, "Erro ao deletar Solicitacao.");
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const solicitacoes = await this.solicitacaoService.getAll();
            return res.status(200).json(solicitacoes);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar todas Solicitacoes.");
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            this.validateId(id);
            const solicitacao = await this.solicitacaoService.getById(id);
            return res.status(200).json(solicitacao);
        } catch (error) {
            this.handleError(res, error, "Erro ao buscar Solicitacao.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const solicitacao = await this.solicitacaoService.getById(id);
            if (!solicitacao) {
                return res.status(404).json({ error: "Solicitacao não encontrada." });
            }
            return next();
        } catch (error) {
            this.handleError(res, error, "Erro ao verificar Solicitacao.");
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
            throw new Error("ID Inválido.");
        }
    }

    private isValidInput(motivo: any, horarioSolicitacao: any) {
        if(typeof motivo !== "string" || motivo.trim().length == 0) {
            return {isValid: false, msg: "Invalid motivo: must be a non empty string."}
        }
        if(typeof horarioSolicitacao !== "string" || horarioSolicitacao.trim().length == 0) {
            return {isValid: false, msg: "Invalid horarioSolicitacao: must be a non empty string."}
        }
        return  {isValid: true };
    }
}

export { SolicitacaoController };
