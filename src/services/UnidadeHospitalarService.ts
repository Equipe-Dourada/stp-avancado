import { prisma } from '../prisma';

class UnidadeHospitalarService {

    async create(nome: string, telefone: string, email: string, enderecoId: string, dadosPessoal: string, latitude: number,
                 longitude: number, disponibilidadeLeitos: number, especialidadesIds: string[], temUTI: boolean) {
        try {
            const unidadeHospitalar = await prisma.unidadeHospitalar.create({
                data: {
                    nome,
                    telefone,
                    email,
                    endereco: {
                        connect: { id: enderecoId },
                    },
                    dadosPessoal,
                    latitude,
                    longitude,
                    disponibilidadeLeitos,
                    especialidades: {
                        connect: especialidadesIds.map((id) => ({ id })),
                    },
                    temUTI
                }
            });
            return unidadeHospitalar;
        } catch (error) {
            console.log(`Error ao criar unidade hospitalar: ${error}`);
            throw error;
        }
    }

    async update(id: string, nome: string, telefone: string, email: string, enderecoId: string, dadosPessoal: string,
                 latitude: number, longitude: number, disponibilidadeLeitos: number,
                 especialidadesIds: string[], temUTI: boolean) {
        try {
            const unidadeHospitalar = await prisma.unidadeHospitalar.update({
                where: { id },
                data: {
                    nome,
                    telefone,
                    email,
                    endereco: {
                        connect: { id: enderecoId },
                    },
                    dadosPessoal,
                    latitude,
                    longitude,
                    disponibilidadeLeitos,
                    especialidades: {
                        connect: especialidadesIds.map((id) => ({id})),
                    },
                    temUTI
                }
            });
            return unidadeHospitalar;
        } catch (error) {
            console.log(`Error ao atualizar unidade hospitalar: ${ error }`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.unidadeHospitalar.delete({
                where: {id}
            });
        } catch (error) {
            console.log(`Error ao deletar unidade hospitalar: ${ error }`);
            throw error;
        }
    }

    async getAll() {
        try {
            const unidadesHospitalares = await prisma.unidadeHospitalar.findMany({
                orderBy: { nome: 'asc' }
            });
            return unidadesHospitalares;
        } catch (error) {
            console.log(`Error ao buscar unidades hospitalares: ${ error }`);
            throw error;
        }
    }

    async getById(id: string) {
        try {
            const unidadeHospitalar = await prisma.unidadeHospitalar.findUnique({
                where: { id }
            });
            return unidadeHospitalar;
        } catch (error) {
            console.log(`Error ao buscar unidade hospitalar: ${ error }`);
            throw error;
        }
    }

    async findByNome(nome: string) {
        try {
            const unidadeHospitalar = await prisma.unidadeHospitalar.findMany({
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
            return unidadeHospitalar;
        } catch (error) {
            console.log(`Error ao buscar unidade hospitalar: ${error}`);
            throw error;
        }
    }
}

export {UnidadeHospitalarService};
