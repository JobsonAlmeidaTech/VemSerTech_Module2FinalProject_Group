import { Gerente } from "./modelos/Gerente"
import { Colaborador } from "./modelos/Colaborador"
import { Cliente } from "./modelos/Cliente"
import { Veiculo } from "./modelos/Veiculo"
import { TipoHabilitacao } from "./modelos/TipoHabilitacao"
import { Loja } from "./modelos/Loja"
const fs = require("fs")

export function reinicializarLoja(){
   
    //inicializando os dados gerais

    const gerente = new Gerente("Felipe Paiva", "230.234.876-67",TipoHabilitacao.habilitacaoAB)
    const colaborador1 = new Colaborador("Antonio Aguiar", "210.256.221-45",TipoHabilitacao.habilitacaoA)

    const colaboradores: Colaborador[] = new Array()
    const clientes: Cliente[] = new Array()
    const veiculos: Veiculo[] = new Array()

    colaboradores.push(colaborador1)

    //apagando os ultimos registros

    const arquivoUltimosRegistros = "./src/ultimosRegistrosLoja.json" 
    const dados = "{}"
    fs.writeFileSync(arquivoUltimosRegistros,dados,'utf-8');

    //retornando o objeto loja reinicializado
    return  new Loja(gerente, colaboradores,clientes,veiculos)

}

export function inicializarLojaComUltimosRegistros(){

    //inicializando os dados gerais

    const gerente = new Gerente("Felipe Paiva", "230.234.876-67",TipoHabilitacao.habilitacaoAB)
    const colaborador1 = new Colaborador("Antonio Aguiar", "210.256.221-45",TipoHabilitacao.habilitacaoA)

    const colaboradores: Colaborador[] = new Array()
    const clientes: Cliente[] = new Array()
    const veiculos: Veiculo[] = new Array()

    colaboradores.push(colaborador1)

    let loja = new Loja(gerente, colaboradores,clientes,veiculos)

    //inicializando os ultimos registros

    const arquivoUltimosRegistros = "./src/ultimosRegistrosLoja.json" 
    const ultimosRegistros = fs.readFileSync(arquivoUltimosRegistros,'utf-8');

    const objetoLojaJson = JSON.parse(ultimosRegistros)

    for(let cliente of objetoLojaJson.clientes){
        loja.clientes.push(cliente)
    }

    for(let veiculo of objetoLojaJson.veiculos){
        loja.veiculos.push(veiculo)
    }  
    
    return loja
}