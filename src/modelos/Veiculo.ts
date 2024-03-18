import { TipoVeiculo } from "./TipoVeiculo"
import { Cliente } from "./Cliente"

export class Veiculo{
    tipo: TipoVeiculo
    modelo: string
    placa: string
    valorDiaria: number
    nDiasAlugado: number| undefined
    cliente: Cliente | undefined

    constructor(tipo: TipoVeiculo, modelo: string ,placa: string, valorDiaria: number, nDiasAlugado: number| undefined, cliente: Cliente | undefined){
        this.tipo = tipo
        this.modelo = modelo
        this.placa = placa
        this.valorDiaria = valorDiaria
        this.nDiasAlugado = nDiasAlugado
        this.cliente = cliente
    }
}