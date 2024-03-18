const promptSync = require("prompt-sync")();
const fs = require("fs")

import { Loja } from "./modelos/Loja";
import { reinicializarLoja } from "./InicializarLoja";

export function limparRegistros(lojaParaLimpar: Loja): Loja{
    // console.log("loja dentro de limpar registros")
    // console.log(lojaParaLimpar)

    const senhaAdministrador = "deletar123*"
    const regexEnter = /^\s*$/

    console.log("------")
    console.log("ATENÇÃO! TODOS OS ÚLTIMOS REGISTROS DA LOJA SERÃO APAGADOS SEM POSSIBILIDADE DE RETORNO!")
    console.log("------")

    let repetir:boolean = true

    while(repetir){

        const senha: string = promptSync('Digite a senha para apagar os todos os últimos registros ou pressione enter para sair: ').trim()
        
        if(senha.match(regexEnter)){
            console.log("Saiu!")
            console.log(" ")
            repetir = false
        }
        else if(senha===senhaAdministrador){
            lojaParaLimpar = reinicializarLoja()
            // console.log("loja de reinicializar loja" )
            // console.log(lojaParaLimpar)
            console.log("Ultimos registros apagados com sucesso!")
            console.log(" ")
            repetir = false
            
        }
        else{
            console.log("Senha inválida!")
        }            
        
    }   

    return lojaParaLimpar
}