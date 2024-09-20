import { Router } from 'express';
import { MedicamentoController } from "./controllers/MedicamentoController";
import { EnderecoController } from "./controllers/EnderecoController";
import { EspecialidadeController } from "./controllers/EspecialidadeController";
import { MedicamentoPrescritoController } from "./controllers/MedicamentoPrescritoController";
import { UnidadeHospitalarController } from "./controllers/UnidadeHospitalarController";
import { MedicoController } from "./controllers/MedicoController";
import { DocumentoTransferenciaController } from "./controllers/DocumentoTransferenciaController";
import { ProntuarioController } from "./controllers/ProntuarioController";
import { PacienteController } from "./controllers/PacienteController";

const routes = Router();
const path = '/stp';

const medicamentoController = new MedicamentoController();
const medicamentoPrescritoController = new MedicamentoPrescritoController();
const enderecoController = new EnderecoController();
const especialidadeController = new EspecialidadeController();
const unidadeHospitalarController = new UnidadeHospitalarController();
const medicoController = new MedicoController();
const documentoTransferenciaController = new DocumentoTransferenciaController();
const prontuarioController = new ProntuarioController();
const pacienteController = new PacienteController();

routes.get(`${path}/medicamentos`, medicamentoController.getAll);
routes.get(`${path}/medicamentos/:id`, medicamentoController.getById);
routes.post(`${path}/medicamentos`, medicamentoController.create);
routes.put(`${path}/medicamentos/:id`, medicamentoController.update);
routes.delete(`${path}/medicamentos/:id`, medicamentoController.delete);

routes.get(`${path}/medicamentosPrescritos`, medicamentoPrescritoController.getAll);
routes.get(`${path}/medicamentosPrescritos/:id`, medicamentoPrescritoController.getById);
routes.post(`${path}/medicamentosPrescritos`, medicamentoPrescritoController.create);
routes.put(`${path}/medicamentosPrescritos/:id`, medicamentoPrescritoController.update);
routes.delete(`${path}/medicamentosPrescritos/:id`, medicamentoPrescritoController.delete);

routes.get(`${path}/enderecos`, enderecoController.getAll);
routes.get(`${path}/enderecos/:id`, enderecoController.getById);
routes.post(`${path}/enderecos`, enderecoController.create);
routes.put(`${path}/enderecos/:id`, enderecoController.update);
routes.delete(`${path}/enderecos/:id`, enderecoController.delete);

routes.get(`${path}/especialidades`, especialidadeController.getAll);
routes.get(`${path}/especialidades/:id`, especialidadeController.getById);
routes.post(`${path}/especialidades`, especialidadeController.create);
routes.put(`${path}/especialidades/:id`, especialidadeController.update);
routes.delete(`${path}/especialidades/:id`, especialidadeController.delete);

routes.get(`${path}/unidadesHospitalares`, unidadeHospitalarController.getAll);
routes.get(`${path}/unidadesHospitalares/:id`, unidadeHospitalarController.getById);
routes.post(`${path}/unidadesHospitalares`, unidadeHospitalarController.create);
routes.put(`${path}/unidadesHospitalares/:id`, unidadeHospitalarController.update);
routes.delete(`${path}/unidadesHospitalares/:id`, unidadeHospitalarController.delete);

routes.get(`${path}/medicos`, medicoController.getAll);
routes.get(`${path}/medicos/:crm`, medicoController.getByCrm);
routes.post(`${path}/medicos`, medicoController.create);
routes.put(`${path}/medicos/:crm`, medicoController.update);
routes.delete(`${path}/medicos/:crm`, medicoController.delete);

routes.get(`${path}/documentosTransferencia`, documentoTransferenciaController.getAll);
routes.get(`${path}/documentosTransferencia/:id`, documentoTransferenciaController.getById);
routes.post(`${path}/documentosTransferencia`, documentoTransferenciaController.create);
routes.put(`${path}/documentosTransferencia/:id`, documentoTransferenciaController.update);
routes.delete(`${path}/documentosTransferencia/:id`, documentoTransferenciaController.delete);

routes.get(`${path}/prontuarios`, prontuarioController.getAll);
routes.get(`${path}/prontuarios/:id`, prontuarioController.getById);
routes.post(`${path}/prontuarios`, prontuarioController.create);
routes.put(`${path}/prontuarios/:id`, prontuarioController.update);
routes.delete(`${path}/prontuarios/:id`, prontuarioController.delete);

routes.get(`${path}/pacientes`, pacienteController.getAll);
routes.get(`${path}/pacientes/:cpf`, pacienteController.getByCpf);
routes.post(`${path}/pacientes`, pacienteController.create);
routes.put(`${path}/pacientes/:cpf`, pacienteController.update);
routes.delete(`${path}/pacientes/:cpf`, pacienteController.delete);

export { routes };
