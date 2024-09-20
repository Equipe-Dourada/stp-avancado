import { prisma } from '../prisma';
import { Papel } from "@prisma/client";

class MedicoService {

    async create(crm: string, nome: string, telefone: string, unidadeHospitalarId: string, papel: Papel, especialidadeId: string) {
        try {
            const medico = await prisma.medico.create({
                data: {
                    crm,
                    nome,
                    telefone,
                    unidadeHospitalarId,
                    papel,
                    especialidadeId
                }
            });
            return medico;
        } catch (error) {
            console.log(`Error ao criar medico: ${error}`);
            throw error;
        }
    }

    async update(crm: string, nome: string, telefone: string, unidadeHospitalarId: string,
                 papel: Papel, especialidadeId: string) {
        try {
            const medico = await prisma.medico.update({
                where: {crm},
                data: {
                    nome,
                    telefone,
                    unidadeHospitalarId,
                    papel,
                    especialidadeId
                }
            });
            return medico;
        } catch (error) {
            console.log(`Error ao atualizar medico: ${error}`);
            throw error;
        }
    }

    async delete(crm: string) {
        try {
            await prisma.medico.delete({
                where: {crm}
            });
        } catch (error) {
            console.log(`Error ao deletar medico: ${error}`);
            throw error;
        }
    }

    async getAll() {
        try {
            const medicos = await prisma.medico.findMany({
                orderBy: { nome: 'asc' }
            });
            return medicos;
        } catch (error) {
            console.log(`Error ao buscar medicos: ${error}`);
            throw error;
        }
    }

    async getByCrm(crm: string) {
        try {
            const medico = await prisma.medico.findUnique({
                where: { crm }
            });
            return medico;
        } catch (error) {
            console.log(`Error ao buscar medico: ${error}`);
            throw error;
        }
    }

    async findByNome(nome: string) {
        try {
            const medicos = await prisma.medico.findMany({
                where: {
                    nome: {
                        contains: nome,
                        mode: "insensitive"
                    }
                },
                orderBy: {
                    nome: "asc"
                }
            });
            return medicos;
        } catch (error) {
            console.log(`Error ao buscar medicos: ${error}`);
            throw error;
        }
    }
}

export {MedicoService};
