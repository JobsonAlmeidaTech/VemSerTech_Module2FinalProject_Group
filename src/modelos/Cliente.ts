import { TipoHabilitacao } from "./TipoHabilitacao"
import { IPessoa } from "./IPessoa"

export class Cliente implements IPessoa{

    nome: string
    cpf: string
    tipoHabilitacao: TipoHabilitacao
    valorAPagar: number
  

    constructor(nome: string, cpf: string, tipoHabilitacao: TipoHabilitacao, valorAPagar: number){

        this.nome = nome
        this.cpf = cpf
        this.tipoHabilitacao = tipoHabilitacao
        this.valorAPagar = valorAPagar

    }

}