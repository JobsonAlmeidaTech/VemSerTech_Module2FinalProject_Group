"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promptSync = require("prompt-sync")();
const fs = require("fs");
const InicializarLoja_1 = require("./InicializarLoja");
const limparRegistros_1 = require("./limparRegistros");
let loja = (0, InicializarLoja_1.inicializarLojaComUltimosRegistros)();
const arquivoUltimosRegistros = "./src/ultimosRegistrosLoja.json";
function menu() {
    console.log("Menu de funcionalidades:");
    console.log("1. Cadastrar veículo");
    console.log("2. Alugar veículo");
    console.log("3. Devolver veículo");
    console.log("4. Listar veículos disponiveis");
    console.log("5. Listar veículos alugados");
    console.log("6. Remover veículo");
    console.log("7. Sair");
    console.log("8. Limpar Registros");
    console.log("");
}
function programa() {
    let opcao;
    menu();
    while (true) {
        const dados = JSON.stringify(loja);
        fs.writeFileSync(arquivoUltimosRegistros, dados, 'utf-8');
        opcao = parseInt(promptSync('Digite o número de uma das funcionalidades do menu (0: apresentar menu): '));
        switch (opcao) {
            case 0:
                menu();
                break;
            case 1:
                loja.cadastrarVeiculo();
                break;
            case 2:
                loja.alugarVeiculo();
                break;
            case 3:
                loja.devolverVeiculo();
                break;
            case 4:
                loja.listarVeiculosDisponiveis();
                break;
            case 5:
                loja.listarVeiculosAlugados();
                break;
            case 6:
                loja.removerVeiculo();
                break;
            case 7:
                console.log("Projeto desenvolvido por:");
                console.log("Edmilson Matias, Jobson Andreson, Rodrigo Willians, Mateus Lannes");
                console.log('\nFinalizando a aplicação.\n');
                process.exit();
                break;
            case 8:
                loja = (0, limparRegistros_1.limparRegistros)(loja);
                break;
            default:
                console.log('Opção Inválida. Digite o número de uma das opções do menu!');
                console.log(" ");
        }
    }
}
programa();
//# sourceMappingURL=index.js.map