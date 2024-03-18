"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inicializarLojaComUltimosRegistros = exports.reinicializarLoja = void 0;
const Gerente_1 = require("./modelos/Gerente");
const Colaborador_1 = require("./modelos/Colaborador");
const TipoHabilitacao_1 = require("./modelos/TipoHabilitacao");
const Loja_1 = require("./modelos/Loja");
const fs = require("fs");
function reinicializarLoja() {
    //inicializando os dados gerais
    const gerente = new Gerente_1.Gerente("Felipe Paiva", "230.234.876-67", TipoHabilitacao_1.TipoHabilitacao.habilitacaoAB);
    const colaborador1 = new Colaborador_1.Colaborador("Antonio Aguiar", "210.256.221-45", TipoHabilitacao_1.TipoHabilitacao.habilitacaoA);
    const colaboradores = new Array();
    const clientes = new Array();
    const veiculos = new Array();
    colaboradores.push(colaborador1);
    //apagando os ultimos registros
    const arquivoUltimosRegistros = "./src/ultimosRegistrosLoja.json";
    const dados = "{}";
    fs.writeFileSync(arquivoUltimosRegistros, dados, 'utf-8');
    //retornando o objeto loja reinicializado
    return new Loja_1.Loja(gerente, colaboradores, clientes, veiculos);
}
exports.reinicializarLoja = reinicializarLoja;
function inicializarLojaComUltimosRegistros() {
    //inicializando os dados gerais
    const gerente = new Gerente_1.Gerente("Felipe Paiva", "230.234.876-67", TipoHabilitacao_1.TipoHabilitacao.habilitacaoAB);
    const colaborador1 = new Colaborador_1.Colaborador("Antonio Aguiar", "210.256.221-45", TipoHabilitacao_1.TipoHabilitacao.habilitacaoA);
    const colaboradores = new Array();
    const clientes = new Array();
    const veiculos = new Array();
    colaboradores.push(colaborador1);
    let loja = new Loja_1.Loja(gerente, colaboradores, clientes, veiculos);
    //inicializando os ultimos registros
    const arquivoUltimosRegistros = "./src/ultimosRegistrosLoja.json";
    const ultimosRegistros = fs.readFileSync(arquivoUltimosRegistros, 'utf-8');
    const objetoLojaJson = JSON.parse(ultimosRegistros);
    for (let cliente of objetoLojaJson.clientes) {
        loja.clientes.push(cliente);
    }
    for (let veiculo of objetoLojaJson.veiculos) {
        loja.veiculos.push(veiculo);
    }
    return loja;
}
exports.inicializarLojaComUltimosRegistros = inicializarLojaComUltimosRegistros;
//# sourceMappingURL=InicializarLoja.js.map