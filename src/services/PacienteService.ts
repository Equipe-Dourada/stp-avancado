import { prisma } from '../prisma';
import { TipoSanguineo } from "@prisma/client";

class PacienteService {

    async create (cpf: string, nome: string, telefone: string, email: string, enderecoId: string, tipoSanguineo: TipoSanguineo, prontuarioId: string) {
        try {
            const paciente = await prisma.paciente.create({
                data: {
                    cpf,
                    nome,
                    telefone,
                    email,
                    enderecoId,
                    tipoSanguineo,
                    prontuarioId
                }
            });
            return paciente;
        } catch (error) {
            console.log(`Error ao criar paciente: ${error}`);
            throw error;
        }
    }

    async update (cpf: string, nome: string, telefone: string, email: string, enderecoId: string, tipoSanguineo: TipoSanguineo, prontuarioId: string) {
        try {
            const paciente = await prisma.paciente.update({
                where: { cpf },
                data: {
                    nome,
                    telefone,
                    email,
                    enderecoId,
                    tipoSanguineo,
                    prontuarioId
                }
            });
            return paciente;
        } catch (error) {
            console.log(`Error ao atualizar paciente: ${error}`);
            throw error;
        }
    }

    async delete (cpf: string) {
        try {
            await prisma.paciente.delete({
                where: { cpf }
            });
        } catch (error) {
            console.log(`Error ao deletar paciente: ${error}`);
            throw error;
        }
    }

    async getAll () {
        try {
            const pacientes = await prisma.paciente.findMany({
                orderBy: { nome: 'asc' }
            });
            return pacientes;
        } catch (error) {
            console.log(`Error ao buscar pacientes: ${error}`);
            throw error;
        }
    }

    async getByCpf (cpf: string) {
        try {
            const paciente = await prisma.paciente.findUnique({
                where: { cpf }
            });
            return paciente;
        } catch (error) {
            console.log(`Error ao buscar paciente: ${error}`);
            throw error;
        }
    }

    async getByNome (nome: string) {
        try {
            const paciente = await prisma.paciente.findMany({
                where: { nome: { contains: nome, mode: 'insensitive' } },
                orderBy: { nome: 'asc' }
            });
            return paciente;
        } catch (error) {
            console.log(`Error ao buscar paciente: ${error}`);
            throw error;
        }
    }
}

export { PacienteService };
