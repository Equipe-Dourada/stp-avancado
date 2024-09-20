import {prisma} from '../prisma'
import {MeioTransporte} from "@prisma/client";

class TransferenciaService {

    async create(meioTransporte: MeioTransporte, destinoId: string, medicoDestinoId: string, origemId: string,
                 medicoOrigemId: string, medicoReguladorId: string, horarioSaida: Date, horarioPrevistoChegada: Date,
                 distancia: number, documentoId: string, pacienteId: string, solicitacaoId: string) {
        try {
            const transferencia = await prisma.transferencia.create({
                data: {
                    meioTransporte,
                    destinoId,
                    medicoDestinoId,
                    origemId,
                    medicoOrigemId,
                    medicoReguladorId,
                    horarioSaida,
                    horarioPrevistoChegada,
                    distancia,
                    documentoId,
                    pacienteId,
                    solicitacaoId
                }
            });
            return transferencia;
        } catch (error) {
            console.error(`Erro ao criar transferência: ${error}`);
            throw error;
        }
    }

    async update(id: string, meioTransporte: MeioTransporte, destinoId: string, medicoDestinoId: string, origemId: string,
                 medicoOrigemId: string, medicoReguladorId: string, horarioSaida: Date, horarioPrevistoChegada: Date,
                 distancia: number, documentoId: string, pacienteId: string, solicitacaoId: string) {
        try {
            const transferencia = await prisma.transferencia.update({
                where: {
                    id
                },
                data: {
                    meioTransporte,
                    destinoId,
                    medicoDestinoId,
                    origemId,
                    medicoOrigemId,
                    medicoReguladorId,
                    horarioSaida,
                    horarioPrevistoChegada,
                    distancia,
                    documentoId,
                    pacienteId,
                    solicitacaoId
                }
            });
            return transferencia;
        } catch (error) {
            console.error(`Erro ao atualizar transferência: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.transferencia.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error(`Erro ao deletar transferência: ${error}`);
            throw error;
        }
    }

    async getAll() {
        try {
            const transferencias = await prisma.transferencia.findMany();
            return transferencias;
        } catch (error) {
            console.error(`Erro ao buscar transferências: ${error}`);
            throw error;
        }
    }

    async getById(id: string) {
        try {
            const transferencia = await prisma.transferencia.findUnique({
                where: {id}
            });
            return transferencia;
        } catch (error) {
            console.error(`Erro ao buscar transferência: ${error}`);
            throw error;
        }
    }
}

export {TransferenciaService};
