import { prisma } from '../prisma';

class EspecialidadeService {

    async create(nome: string, descricao: string) {
        try {
            const especialidade = await prisma.especialidade.create({
                data: { nome, descricao }
            });
            return especialidade;
        } catch (error) {
            console.error(`Erro ao criar especialidade: ${error}`);
            throw error;
        }
    }

    async update(id: string, nome: string, descricao: string) {
        try {
            const especialidade = await prisma.especialidade.update({
                where: { id },
                data: { nome, descricao }
            });
            return especialidade;
        } catch (error) {
            console.error(`Erro ao atualizar especialidade: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.especialidade.delete({
                where: { id }
            });
        } catch (error) {
            console.error(`Erro ao deletar especialidade: ${error}`);
            throw error;
        }
    }

    async getAll() {
        try {
            const especialidades = await prisma.especialidade.findMany({
                orderBy: { nome: 'asc' }
            });
            return especialidades;
        } catch (error) {
            console.error(`Erro ao buscar especialidades: ${error}`);
            throw error;
        }
    }

    async getById(id: string) {
        try {
            const especialidade = await prisma.especialidade.findUnique({
                where: { id }
            });
            return especialidade;
        } catch (error) {
            console.error(`Erro ao buscar especialidade: ${error}`);
            throw error;
        }
    }

    async findByName(nome: string) {
        try {
            const especialidades = await prisma.especialidade.findMany({
                where: { nome: { contains: nome, mode: 'insensitive' } },
                orderBy: { nome: 'asc' }
            });
            return especialidades;
        } catch (error) {
            console.error(`Erro ao buscar especialidades: ${error}`);
            throw error;
        }
    }
}

export { EspecialidadeService };
