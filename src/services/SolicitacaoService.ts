import { prisma } from '../prisma';

class SolicitacaoService {

  async create(medicoId: string, pacienteId: string, motivo: string, documentoId: string, especialidadeId: string, horarioSolicitacao: Date)
  {
    try {
      const solicitacao = await prisma.solicitacao.create({
        data: {
          medicoId,
          pacienteId,
          motivo,
          documentoId,
          especialidadeId,
          horarioSolicitacao
        }
      });
      return solicitacao;
    } catch (error) {
      console.error(`Error ao criar solicitacao: ${error}`);
      throw error;
    }
  }

  async update (id: string, medicoId: string, pacienteId: string, motivo: string, documentoId: string, especialidadeId: string, horarioSolicitacao: Date) {
    try {
      const solicitacao = await prisma.solicitacao.update({
        where: { id },
        data: {
          medicoId,
          pacienteId,
          motivo,
          documentoId,
          especialidadeId,
          horarioSolicitacao
        }
      });
      return solicitacao;
    } catch (error) {
      console.error(`Error ao atualizar solicitacao: ${error}`);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await prisma.solicitacao.delete({
        where: { id }
      });
    } catch (error) {
      console.error(`Error ao deletar solicitacao: ${error}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const solicitacoes = await prisma.solicitacao.findMany({
        orderBy: { id: 'asc' }
      });
      return solicitacoes;
    } catch (error) {
      console.error(`Error ao buscar solicitacoes: ${error}`);
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const solicitacao = await prisma.solicitacao.findUnique({
        where: { id }
      });
      return solicitacao;
    } catch (error) {
      console.error(`Error ao buscar solicitacao: ${error}`);
      throw error;
    }
  }
}

export { SolicitacaoService };
