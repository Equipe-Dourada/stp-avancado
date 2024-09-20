import { prisma } from '../prisma';

class DocumentoTransferenciaService {

    async create (drogasAdministradas: string[], procedimentosAcondicionamento: string[], procedimentosRecebimento: string[]) {
        try {
            const documentoTransferencia = await prisma.documentoTransferencia.create({
                data: {
                    drogasAdministradas,
                    procedimentosAcondicionamento,
                    procedimentosRecebimento
                }
            });
            return documentoTransferencia;
        } catch (error) {
            console.log(`Error ao criar documentoTransferencia: ${error}`);
            throw error;
        }
    }

    async update (id: string, drogasAdministradas: string[], procedimentosAcondicionamento: string[], procedimentosRecebimento: string[]) {
        try {
            const documentoTransferencia = await prisma.documentoTransferencia.update({
                where: { id },
                data: {
                    drogasAdministradas,
                    procedimentosAcondicionamento,
                    procedimentosRecebimento
                }
            });
            return documentoTransferencia;
        } catch (error) {
            console.log(`Error ao atualizar documentoTransferencia: ${error}`);
            throw error;
        }
    }

    async delete (id: string) {
        try {
            await prisma.documentoTransferencia.delete({
                where: { id }
            });
        } catch (error) {
            console.log(`Error ao deletar documentoTransferencia: ${error}`);
            throw error;
        }
    }

    async getAll () {
        try {
            const documentosTransferencia = await prisma.documentoTransferencia.findMany({
                orderBy: { id: 'asc' }
            });
            return documentosTransferencia;
        } catch (error) {
            console.log(`Error ao buscar documentosTransferencia: ${error}`);
            throw error;
        }
    }

    async getById (id: string) {
        try {
            const documentoTransferencia = await prisma.documentoTransferencia.findUnique({
                where: { id }
            });
            return documentoTransferencia;
        } catch (error) {
            console.log(`Error ao buscar documentoTransferencia: ${error}`);
            throw error;
        }
    }

}

export { DocumentoTransferenciaService };
