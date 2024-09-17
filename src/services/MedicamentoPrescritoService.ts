import { prisma } from '../prisma';

class MedicamentoPrescritoService {

    async create(medicamentoId: string, posologia: string, dosagem: number, unidadeDosagem: string, viaAdministracao: string) {
        try {
            const medicamentoPrescrito = await prisma.medicamentoPrescrito.create({
                data: { medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao }
            });
            return medicamentoPrescrito;
        } catch (error) {
            console.error(`Erro ao criar medicamento prescrito: ${error}`);
            throw error;
        }
    }

    async update(id: string, medicamentoId: string, posologia: string, dosagem: number, unidadeDosagem: string, viaAdministracao: string) {
        try {
            const medicamentoPrescrito = await prisma.medicamentoPrescrito.update({
                where: { id },
                data: { medicamentoId, posologia, dosagem, unidadeDosagem, viaAdministracao }
            });
            return medicamentoPrescrito;
        } catch (error) {
            console.error(`Erro ao atualizar medicamento prescrito: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.medicamentoPrescrito.delete({
                where: { id }
            });
        } catch (error) {
            console.error(`Erro ao deletar medicamento prescrito: ${error}`);
            throw error;
        }
    }

    async getAll() {
        try {
            const medicamentosPrescritos = await prisma.medicamentoPrescrito.findMany({
                orderBy: { createdAt: 'asc' }
            });
            return medicamentosPrescritos;
        } catch (error) {
            console.error(`Erro ao buscar medicamentos prescritos: ${error}`);
            throw error;
        }
    }

    async getById(id: string) {
        try {
            const medicamentoPrescrito = await prisma.medicamentoPrescrito.findUnique({
                where: { id }
            });
            return medicamentoPrescrito;
        } catch (error) {
            console.error(`Erro ao buscar medicamento prescrito: ${error}`);
            throw error;
        }
    }
}

export { MedicamentoPrescritoService };
