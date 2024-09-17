import { prisma } from '../prisma';

class MedicamentoService {

    async create(nome: string, principioAtivo: string, descricao: string) {
        try {
            const medicamento = await prisma.medicamento.create({
                data: { nome, principioAtivo, descricao }
            });
            return medicamento;
        } catch (error) {
            console.error(`Erro ao criar medicamento: ${error}`);
            throw error;
        }
    }

    async update(id: string, nome: string, principioAtivo: string, descricao: string) {
        try {
            const medicamento = await prisma.medicamento.update({
                where: { id },
                data: { nome, principioAtivo, descricao }
            });
            return medicamento;
        } catch (error) {
            console.error(`Erro ao atualizar medicamento: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.medicamento.delete({
                where: { id }
            });
        } catch (error) {
            console.error(`Erro ao deletar medicamento: ${error}`);
            throw error;
        }
    }

    async getAll() {
        try {
            const medicamentos = await prisma.medicamento.findMany({
                orderBy: { nome: 'asc' }
            });
            return medicamentos;
        } catch (error) {
            console.error(`Erro ao buscar medicamentos: ${error}`);
            throw error;
        }
    }

    async getById(id: string) {
        try {
            const medicamento = await prisma.medicamento.findUnique({
                where: { id }
            });
            return medicamento;
        } catch (error) {
            console.error(`Erro ao buscar medicamento: ${error}`);
            throw error;
        }
    }

    async findByName(nome: string) {
        try {
            const medicamentos = await prisma.medicamento.findMany({
                where: { nome: { contains: nome, mode: 'insensitive' } },
                orderBy: { nome: 'asc' }
            });
            return medicamentos;
        } catch (error) {
            console.error(`Erro ao buscar medicamentos: ${error}`);
            throw error;
        }
    }
}

export { MedicamentoService };
