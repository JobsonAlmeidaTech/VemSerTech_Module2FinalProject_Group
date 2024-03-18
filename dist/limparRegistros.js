"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limparRegistros = void 0;
const promptSync = require("prompt-sync")();
const fs = require("fs");
const InicializarLoja_1 = require("./InicializarLoja");
function limparRegistros(lojaParaLimpar) {
    // console.log("loja dentro de limpar registros")
    // console.log(lojaParaLimpar)
    const senhaAdministrador = "deletar123*";
    const regexEnter = /^\s*$/;
    console.log("------");
    console.log("ATENÇÃO! TODOS OS ÚLTIMOS REGISTROS DA LOJA SERÃO APAGADOS SEM POSSIBILIDADE DE RETORNO!");
    console.log("------");
    let repetir = true;
    while (repetir) {
        const senha = promptSync('Digite a senha para apagar os todos os últimos registros ou pressione enter para sair: ').trim();
        if (senha.match(regexEnter)) {
            console.log("Saiu!");
            console.log(" ");
            repetir = false;
        }
        else if (senha === senhaAdministrador) {
            lojaParaLimpar = (0, InicializarLoja_1.reinicializarLoja)();
            // console.log("loja de reinicializar loja" )
            // console.log(lojaParaLimpar)
            console.log("Ultimos registros apagados com sucesso!");
            console.log(" ");
            repetir = false;
        }
        else {
            console.log("Senha inválida!");
        }
    }
    return lojaParaLimpar;
}
exports.limparRegistros = limparRegistros;
//# sourceMappingURL=limparRegistros.js.map