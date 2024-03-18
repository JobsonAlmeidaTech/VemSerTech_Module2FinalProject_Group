import { TipoHabilitacao } from "./TipoHabilitacao"
import { IPessoa } from "./IPessoa"

export class Gerente implements IPessoa{

    nome: string
    cpf: string
    tipoHabilitacao: TipoHabilitacao
    
    constructor(nome: string, cpf: string, tipoHabilitacao: TipoHabilitacao){

        this.nome = nome
        this.cpf = cpf
        this.tipoHabilitacao = tipoHabilitacao
          
    }

}