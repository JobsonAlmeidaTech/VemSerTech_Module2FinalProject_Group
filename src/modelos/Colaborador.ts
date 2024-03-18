import { IPessoa } from "./IPessoa"
import { TipoHabilitacao } from "./TipoHabilitacao"

export class Colaborador implements IPessoa{

    nome: string
    cpf: string
    tipoHabilitacao: TipoHabilitacao

    constructor(nome: string, cpf: string, tipoHabilitacao: TipoHabilitacao){

        this.nome = nome
        this.cpf = cpf
        this.tipoHabilitacao = tipoHabilitacao
        
    }

}