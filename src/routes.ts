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
import { SolicitacaoController } from "./controllers/SolicitacaoController";
import { TransferenciaController } from "./controllers/TransferenciaController";

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
const solicitacaoController = new SolicitacaoController();
const transferenciaController = new TransferenciaController();

routes.get(`${path}/medicamentos`, medicamentoController.getAll);
routes.get(`${path}/medicamentos/:id`, medicamentoController.getById);
routes.post(`${path}/medicamentos`, medicamentoController.create);
routes.put(`${path}/medicamentos/:id`, medicamentoController.verifyIfExists, medicamentoController.update);
routes.delete(`${path}/medicamentos/:id`, medicamentoController.verifyIfExists, medicamentoController.delete);

routes.get(`${path}/medicamentosPrescritos`, medicamentoPrescritoController.getAll);
routes.get(`${path}/medicamentosPrescritos/:id`, medicamentoPrescritoController.getById);
routes.post(`${path}/medicamentosPrescritos`, medicamentoPrescritoController.create);
routes.put(`${path}/medicamentosPrescritos/:id`, medicamentoPrescritoController.verifyIfExists, medicamentoPrescritoController.update);
routes.delete(`${path}/medicamentosPrescritos/:id`, medicamentoPrescritoController.verifyIfExists, medicamentoPrescritoController.delete);

routes.get(`${path}/enderecos`, enderecoController.getAll);
routes.get(`${path}/enderecos/:id`, enderecoController.getById);
routes.post(`${path}/enderecos`, enderecoController.create);
routes.put(`${path}/enderecos/:id`, enderecoController.verifyIfExists, enderecoController.update);
routes.delete(`${path}/enderecos/:id`, enderecoController.verifyIfExists, enderecoController.delete);

routes.get(`${path}/especialidades`, especialidadeController.getAll);
routes.get(`${path}/especialidades/:id`, especialidadeController.getById);
routes.post(`${path}/especialidades`, especialidadeController.create);
routes.put(`${path}/especialidades/:id`, especialidadeController.verifyIfExists, especialidadeController.update);
routes.delete(`${path}/especialidades/:id`, especialidadeController.verifyIfExists, especialidadeController.delete);

routes.get(`${path}/unidadesHospitalares`, unidadeHospitalarController.getAll);
routes.get(`${path}/unidadesHospitalares/:id`, unidadeHospitalarController.getById);
routes.post(`${path}/unidadesHospitalares`, unidadeHospitalarController.create);
routes.put(`${path}/unidadesHospitalares/:id`, unidadeHospitalarController.verifyIfExists, unidadeHospitalarController.update);
routes.delete(`${path}/unidadesHospitalares/:id`, unidadeHospitalarController.verifyIfExists, unidadeHospitalarController.delete);

routes.get(`${path}/medicos`, medicoController.getAll);
routes.get(`${path}/medicos/:id`, medicoController.getByCrm);
routes.post(`${path}/medicos`, medicoController.create);
routes.put(`${path}/medicos/:id`, medicoController.verifyIfExists, medicoController.update);
routes.delete(`${path}/medicos/:id`, medicoController.verifyIfExists, medicoController.delete);

routes.get(`${path}/documentosTransferencia`, documentoTransferenciaController.getAll);
routes.get(`${path}/documentosTransferencia/:id`, documentoTransferenciaController.getById);
routes.post(`${path}/documentosTransferencia`, documentoTransferenciaController.create);
routes.put(`${path}/documentosTransferencia/:id`, documentoTransferenciaController.verifyIfExists, documentoTransferenciaController.update);
routes.delete(`${path}/documentosTransferencia/:id`, documentoTransferenciaController.verifyIfExists, documentoTransferenciaController.delete);

routes.get(`${path}/prontuarios`, prontuarioController.getAll);
routes.get(`${path}/prontuarios/:id`, prontuarioController.getById);
routes.post(`${path}/prontuarios`, prontuarioController.create);
routes.put(`${path}/prontuarios/:id`, prontuarioController.verifyIfExists, prontuarioController.update);
routes.delete(`${path}/prontuarios/:id`, prontuarioController.verifyIfExists, prontuarioController.delete);

routes.get(`${path}/pacientes`, pacienteController.getAll);
routes.get(`${path}/pacientes/:id`, pacienteController.getByCpf);
routes.post(`${path}/pacientes`, pacienteController.create);
routes.put(`${path}/pacientes/:id`, pacienteController.verifyIfExists, pacienteController.update);
routes.delete(`${path}/pacientes/:id`, pacienteController.verifyIfExists, pacienteController.delete);

routes.get(`${path}/solicitacoes`, solicitacaoController.getAll);
routes.get(`${path}/solicitacoes/:id`, solicitacaoController.getById);
routes.post(`${path}/solicitacoes`, solicitacaoController.create);
routes.put(`${path}/solicitacoes/:id`, solicitacaoController.verifyIfExists, solicitacaoController.update);
routes.delete(`${path}/solicitacoes/:id`, solicitacaoController.verifyIfExists, solicitacaoController.delete);

routes.get(`${path}/transferencias`, transferenciaController.getAll);
routes.get(`${path}/transferencias/:id`, transferenciaController.getById);
routes.post(`${path}/transferencias`, transferenciaController.create);
routes.put(`${path}/transferencias/:id`, transferenciaController.verifyIfExists, transferenciaController.update);
routes.delete(`${path}/transferencias/:id`, transferenciaController.verifyIfExists, transferenciaController.delete);

export { routes };
