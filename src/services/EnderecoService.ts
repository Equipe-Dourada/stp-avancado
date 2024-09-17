import { prisma } from '../prisma';

class EnderecoService {

    async create(cep: string, rua: string, numero: number, bairro: string, cidade: string, estado: string, complemento?: string) {
        try {
            const endereco = await prisma.endereco.create({
                data: { cep, rua, numero, bairro, cidade, estado, complemento }
            });
            return endereco;
        } catch (error) {
            console.error(`Erro ao criar endereco: ${error}`);
            throw error;
        }
    }

    async update(id: string, cep: string, rua: string, numero: number, bairro: string, cidade: string, estado: string, complemento?: string) {
        try {
            const endereco = await prisma.endereco.update({
                where: { id },
                data: { cep, rua, numero, bairro, cidade, estado, complemento }
            });
            return endereco;
        } catch (error) {
            console.error(`Erro ao atualizar endereco: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.endereco.delete({
                where: { id }
            });
        } catch (error) {
            console.error(`Erro ao deletar endereco: ${error}`);
            throw error;
        }
    }

    async getAll() {
        try {
            const enderecos = await prisma.endereco.findMany({
                orderBy: { rua: 'asc' }
            });
            return enderecos;
        } catch (error) {
            console.error(`Erro ao buscar enderecos: ${error}`);
            throw error;
        }
    }

    async getById(id: string) {
        try {
            const endereco = await prisma.endereco.findUnique({
                where: { id }
            });
            return endereco;
        } catch (error) {
            console.error(`Erro ao buscar endereco: ${error}`);
            throw error;
        }
    }

    async findByCep(cep: string) {
        try {
            const endereco = await prisma.endereco.findMany({
                where: { cep: { contains: cep, mode: 'insensitive' } },
                orderBy: { cep: 'asc' }
            });
            return endereco;
        } catch (error) {
            console.error(`Erro ao buscar endereco: ${error}`);
            throw error;
        }
    }
}

export { EnderecoService };
