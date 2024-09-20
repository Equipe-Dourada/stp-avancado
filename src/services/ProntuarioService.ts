import { prisma } from '../prisma';
import { Classificacao } from "@prisma/client";

class ProntuarioService {

    async create (classificacao: Classificacao, medicamentosAtuais: string[]) {
        try {
            const prontuario = await prisma.prontuario.create({
                data: {
                    classificacao,
                    medicamentosAtuais
                }
            });
            return prontuario;
        } catch (error) {
            console.log(`Error ao criar prontuario: ${error}`);
            throw error;
        }
    }

    async update (id: string, classificacao: Classificacao, medicamentosAtuais: string[]) {
        try {
            const prontuario = await prisma.prontuario.update({
                where: { id },
                data: {
                    classificacao,
                    medicamentosAtuais
                }
            });
            return prontuario;
        } catch (error) {
            console.log(`Error ao atualizar prontuario: ${error}`);
            throw error;
        }
    }

    async delete (id: string) {
        try {
            await prisma.prontuario.delete({
                where: { id }
            });
        } catch (error) {
            console.log(`Error ao deletar prontuario: ${error}`);
            throw error;
        }
    }

    async getAll () {
        try {
            const prontuarios = await prisma.prontuario.findMany({
                orderBy: { id: 'asc' }
            });
            return prontuarios;
        } catch (error) {
            console.log(`Error ao buscar prontuarios: ${error}`);
            throw error;
        }
    }

    async getById (id: string) {
        try {
            const prontuario = await prisma.prontuario.findUnique({
                where: { id }
            });
            return prontuario;
        } catch (error) {
            console.log(`Error ao buscar prontuario: ${error}`);
            throw error;
        }
    }
}

export { ProntuarioService };
