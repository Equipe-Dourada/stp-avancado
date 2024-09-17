import { Router } from 'express';
import { MedicamentoController } from "./controllers/MedicamentoController";
import { EnderecoController } from "./controllers/EnderecoController";
import { EspecialidadeController } from "./controllers/EspecialidadeController";
import { MedicamentoPrescritoController } from "./controllers/MedicamentoPrescritoController";

const routes = Router();
const path = '/stp';

const medicamentoController = new MedicamentoController();
const medicamentoPrescritoController = new MedicamentoPrescritoController();
const enderecoController = new EnderecoController();
const especialidadeController = new EspecialidadeController();

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

export { routes };
