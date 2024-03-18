const promptSync = require("prompt-sync")();

import { Gerente } from "./Gerente"
import { Colaborador } from "./Colaborador"
import { Cliente } from "./Cliente"
import { Veiculo } from "./Veiculo"
import { TipoVeiculo } from "./TipoVeiculo";
import { TipoHabilitacao } from "./TipoHabilitacao";

import { reinicializarLoja } from "../InicializarLoja";

export class Loja{
    
    gerente: Gerente
    colaboradores: Colaborador[]
    clientes: Cliente[]
    veiculos: Veiculo[]

    constructor(gerente: Gerente, colaboradores: Colaborador[], clientes: Cliente[], veiculos:Veiculo[]){
        this.gerente = gerente
        this.colaboradores = colaboradores
        this.clientes = clientes
        this.veiculos = veiculos
    }


    private digitarTipoHabilitacao(): TipoHabilitacao{

        while(true){
            let cTipoHabilitacao: string = promptSync('Digite o tipo de habilitação do cliente (A, B ou AB): ')
            cTipoHabilitacao = cTipoHabilitacao.trim()

            if(cTipoHabilitacao.toUpperCase() === TipoHabilitacao.habilitacaoA){
                const tipoHabilitacao = TipoHabilitacao.habilitacaoA
                return tipoHabilitacao
            }
            else if(cTipoHabilitacao.toUpperCase() === TipoHabilitacao.habilitacaoB){
                const tipoHabilitacao = TipoHabilitacao.habilitacaoB
                return tipoHabilitacao
            }
            else if(cTipoHabilitacao.toUpperCase() === TipoHabilitacao.habilitacaoAB){
                const tipoHabilitacao = TipoHabilitacao.habilitacaoAB
                return tipoHabilitacao
            }
            else{
                console.log("Escolha incorreta!")  
            }

        }
    }

    private digitarTipoVeiculo(){

        while(true){

            let cTipo: string = promptSync('Digite o tipo do veiculo (c: carro / m: moto ): ')
            cTipo = cTipo.trim()

            if(cTipo.toLocaleLowerCase()==="c" || cTipo.toLocaleLowerCase()==="carro"){
                const tipo = TipoVeiculo.carro
                return tipo
            }
            else if(cTipo.toLocaleLowerCase() === "m" || cTipo.toLocaleLowerCase() === "moto"){
                const tipo = TipoVeiculo.moto
                return tipo
            }
            else{
                console.log("Escolha incorreta!")                
            }

        }

    }

    private digitarPlacaVeiculo(): string{

        const regexPlaca = /^(?:[a-zA-Z]+\d+|\d+[a-zA-Z]+)$/

        while(true){

            let placa:string = promptSync('Digite a placa do veículo: ');  
            placa = placa.trim()

            if(!placa.match(regexPlaca)){
                console.log("A placa do veículo deve ser formada por números e letras!")
            }
            else{
                return placa
            }

            
        }
       
        
    }

    private verificarPlacaVeiculo(placa: string): boolean{

        for(let veiculoSistema of this.veiculos){
            if(placa === veiculoSistema.placa){
                return true
            }          
        }

        return false
        
    }

    private selecionarVeiculo(habilitacao: TipoHabilitacao){

        while(true){

            let veiculoEncontrado = false
            const placa:string = promptSync('Digite a placa do veículo disponível para alugar: ').trim();

            for(let veiculoSelecionado of this.veiculos){

                if(veiculoSelecionado.placa === placa){

                    veiculoEncontrado = true

                    if(                        
                        (habilitacao === TipoHabilitacao.habilitacaoA && veiculoSelecionado.tipo === TipoVeiculo.carro) ||
                        (habilitacao === TipoHabilitacao.habilitacaoB && veiculoSelecionado.tipo === TipoVeiculo.moto)
                        ){
                        console.log("A habilitacao do cliente não permite alugar esse veiculo!")
                    }
                    else if(veiculoSelecionado.cliente != undefined){
                        console.log("Este veiculo já está alugado!")
                        break
                    }
                    
                    else{
                        return veiculoSelecionado
                    }

                }
            }

            if(!veiculoEncontrado){
                console.log("Não há cadastro deste veículo no sistema!")
            }

        }

    }

    private digitarModeloVeiculo(){

        const regexLetra = /[A-Za-z]+/

        while(true){

            let modelo: string = promptSync('Digite o modelo do veículo: ')
            modelo = modelo.trim()

            if(!modelo.match(regexLetra)){
                console.log(`O modelo do veículo deve possuir no mínimo uma letra!`)
            }
            else{
                return modelo
            }
        
        }

    }

    private valorDiariaVeiculo(){

        let valorDiaria = 0
        let repetir: boolean = true
        const DIARIA_MINIMA:number = 5.00

        while(repetir){

            valorDiaria = Number(promptSync('Digite o valor da diaria desse veículo: ').trim())
            
            if(Number.isNaN(valorDiaria)){
                console.log(`O valor da diária deve ser um número maior que R$${DIARIA_MINIMA.toFixed(2)}!`)
            }
            else{
                if(valorDiaria < DIARIA_MINIMA){
                    console.log(`A diaria mínima aceita é de R$${DIARIA_MINIMA}!`)
                }
                else{             
                    valorDiaria = Number(valorDiaria.toFixed(2))
                    repetir = false
                }
            }
        }

        return valorDiaria


    }

    cadastrarVeiculo(){

        console.log(`Cadastrar veículo:`)

        const tipo = this.digitarTipoVeiculo()
        const modelo = this.digitarModeloVeiculo()
        const placa = this.digitarPlacaVeiculo()

        if(this.verificarPlacaVeiculo(placa)){
            console.log(`Impossivel cadastrar. Já existe um veículo com placa ${placa} cadastrado no sistema!`)
            console.log(" ")
            return
        }
        
        const valorDiaria = this.valorDiariaVeiculo()

        const veiculo = new Veiculo(tipo,modelo,placa,valorDiaria, undefined, undefined)
        this.veiculos.push(veiculo)
        console.log("Veiculo cadastrado com sucesso!")        
        console.log(" ")
        
    }

    private listarCarrosDisponiveis(){

        console.log("Carros:")
        for(let veiculoSistema of this.veiculos){
            if(veiculoSistema.tipo === TipoVeiculo.carro && veiculoSistema.cliente === undefined){
                console.log(`modelo: ${veiculoSistema.modelo} - placa: ${veiculoSistema.placa} - valor da diária: ${veiculoSistema.valorDiaria}`)
            }
        }

    }

    private listarMotosDisponiveis(){
        console.log("Motos:")
        for(let veiculoSistema of this.veiculos){
            if(veiculoSistema.tipo === TipoVeiculo.moto && veiculoSistema.cliente === undefined){
                console.log(`modelo: ${veiculoSistema.modelo} - placa: ${veiculoSistema.placa} - valor da diária: ${veiculoSistema.valorDiaria}`)
            }
        }
    }

    private listarCarrosAlugados(){
        console.log("Carros:")
        for(let veiculoSistema of this.veiculos){
            if(veiculoSistema.tipo === TipoVeiculo.carro && veiculoSistema.cliente != undefined){
                console.log(`modelo: ${veiculoSistema.modelo} - placa: ${veiculoSistema.placa} - valor da diária: ${veiculoSistema.valorDiaria} - cliente: ${veiculoSistema.cliente.nome} - cpf: ${veiculoSistema.cliente.cpf} - numero de dias: ${veiculoSistema.nDiasAlugado} - valor a pagar: ${veiculoSistema.cliente.valorAPagar}`)
            }
        }

    }

    private listarMotosAlugadas(){
        console.log("Motos:")
        for(let veiculoSistema of this.veiculos){
            if(veiculoSistema.tipo === TipoVeiculo.moto && veiculoSistema.cliente != undefined){
                console.log(`modelo: ${veiculoSistema.modelo} - placa: ${veiculoSistema.placa} - valor da diária: ${veiculoSistema.valorDiaria} - cliente: ${veiculoSistema.cliente.nome} - cpf: ${veiculoSistema.cliente.cpf} - numero de dias: ${veiculoSistema.nDiasAlugado} - valor a pagar: ${veiculoSistema.cliente.valorAPagar}`)
            }
        }

    }


    listarVeiculosDisponiveis(){
        console.log("Lista de veículos disponíveis:")

        this.listarCarrosDisponiveis()
        this.listarMotosDisponiveis()     
        console.log(" ")
    }

    listarVeiculosAlugados(){

        console.log("Lista de veículos alugados:")

        this.listarCarrosAlugados()
        this.listarMotosAlugadas()     
        console.log(" ")

    }
    
    private verificarExistenciaDeVeiculosDisponiveisCliente(habilitacao: TipoHabilitacao):boolean{

        if(habilitacao === TipoHabilitacao.habilitacaoA || habilitacao === TipoHabilitacao.habilitacaoAB){
            for(let veiculoSistema of this.veiculos){
                if(veiculoSistema.tipo===TipoVeiculo.moto && veiculoSistema.cliente === undefined){
                    return true
                }
            }
        }

        if(habilitacao === TipoHabilitacao.habilitacaoB || habilitacao === TipoHabilitacao.habilitacaoAB){
            for(let veiculoSistema of this.veiculos){
                if(veiculoSistema.tipo===TipoVeiculo.carro && veiculoSistema.cliente === undefined){
                    return true
                }
            }
        }
        
        return false

    }

    private verificarDisponibilidadeCpf(cpf: string): [string, TipoVeiculo]|null{
        for(let veiculoSistema of this.veiculos){
            if(veiculoSistema.cliente?.cpf===cpf){
                return [veiculoSistema.placa, veiculoSistema.tipo]
            }
        }

        return null
    }

    private digitarDiasParaAluguel(): number{

        let diasParaAluguel:number = 0
        let repetir:boolean = true 
        const expRegularNumeroInteiro = /^\d+$/

        while(repetir){

            let diasParaAluguelString = promptSync('Digite o número de dias para o aluguel: ')
            
            if(!diasParaAluguelString.match(expRegularNumeroInteiro)){
                console.log("O número de dias para aluguel deve ser um numero inteiro maior que 0.")
            }
            else{

                diasParaAluguel = parseInt(diasParaAluguelString)

                if( (diasParaAluguel<=0 ) || (diasParaAluguel%1!= 0)){
                    console.log("O número de dias para aluguel deve ser um numero inteiro maior que 0.")
                }
                else{
                    repetir = false
                }

            }
            

        }

        return diasParaAluguel

    }

    private calcularValorAPagar(veiculoSelecionado: Veiculo, diasParaAluguel: number): number{

        return veiculoSelecionado.tipo === TipoVeiculo.carro? 
        parseFloat(((veiculoSelecionado.valorDiaria*diasParaAluguel) * 1.1).toFixed(2)) :
        parseFloat(((veiculoSelecionado.valorDiaria*diasParaAluguel) * 1.05).toFixed(2))      

    }

    private digitarNomeCliente(){

        let repetir = true
        const regexLetra = /^[a-zA-Z]+$/
        let nome: string = ""

        while(repetir){

            nome = promptSync('Digite o nome do cliente: ') 
            nome = nome.trim()

            if(!nome.match(regexLetra)){
                console.log(`O nome do cliente deve conter pelo menos uma letra!`)
            }
            else{ 
                repetir = false                              
            }         
        }  
        
        return nome 

    }

    private digitarCpfCliente(){

        const regexCPF = /\d{11,11}/
        let repetir = true
        let cpf: string = ""
        let cpfFormatado = ""

        while(repetir){

            cpf = promptSync('Digite o cpf do cliente (apenas os dígitos): ')
            cpf.trim()

            if(!cpf.match(regexCPF)){
                console.log("Digitação inválida. O CPF deve ser formado por 11 dígitos!")
            }
            else{
                cpfFormatado = cpf
                repetir = false
            }

        }

        return cpfFormatado
    }
    
    alugarVeiculo(){

        const nome: string = this.digitarNomeCliente()

        const cpf: string = this.digitarCpfCliente()

        //verificando se o cliente já possui um carro alugado
        const veiculoAlugado = this.verificarDisponibilidadeCpf(cpf)
        if(veiculoAlugado!=null){
            console.log(`Não permitido. O cliente já possui o(a) ${veiculoAlugado[1]} com placa ${veiculoAlugado[0]} alugado(a)!`)
            console.log(" ")
            return
        }

        const habilitacao = this.digitarTipoHabilitacao()        

        //verificando a existência de veículos disponíveis para o cliente
        if(!this.verificarExistenciaDeVeiculosDisponiveisCliente(habilitacao)){
            console.log("Não há veículos disponíveis para o cliente!")
            console.log(" ")
            return
        }        

        //listando opções de carros disponíveis para o cliente
        console.log("Veículos disponíveis para o cliente:")
        if(habilitacao === TipoHabilitacao.habilitacaoB){
            this.listarCarrosDisponiveis()
        }
        else if(habilitacao === TipoHabilitacao.habilitacaoA){
            this.listarMotosDisponiveis()
        }
        else{
            this.listarCarrosDisponiveis()
            this.listarMotosDisponiveis()
        }

        const veiculoSelecionado = this.selecionarVeiculo(habilitacao)

        const diasParaAluguel =  this.digitarDiasParaAluguel()

        const valorAPagar = this.calcularValorAPagar(veiculoSelecionado, diasParaAluguel)

        const cliente = new Cliente(nome, cpf, habilitacao,  valorAPagar)
        this.clientes.push(cliente)
        veiculoSelecionado.nDiasAlugado = diasParaAluguel
        veiculoSelecionado.cliente = cliente

        console.log("Veiculo alugado para o cliente!")
        console.log(" ")   

    }

    private verificarRelacaoAluguel(cpf: string): [Veiculo, Cliente] | null{

        for(let veiculoSistema of this.veiculos){
            if(veiculoSistema.cliente?.cpf === cpf){
                return [veiculoSistema, veiculoSistema.cliente]
            }
        }

        return null

    }

    private desalugarVeiculo(veiculoAlugado: Veiculo){
        veiculoAlugado.cliente = undefined
    }

    private removerCliente(clienteAluguel: Cliente){

        for(let iCliente in this.clientes){
            if(this.clientes[iCliente].cpf === clienteAluguel.cpf){
                this.clientes.splice(parseInt(iCliente),1)
            }
        }

    }

    devolverVeiculo(){  

        const cpf: string = promptSync('Digite o cpf do cliente: ') 
        
        const relacaoVeiculoCliente = this.verificarRelacaoAluguel(cpf)

        if(relacaoVeiculoCliente === null){
            console.log("Não existe cliente com esse cpf!")
            console.log(" ")
            return
        }

        this.desalugarVeiculo(relacaoVeiculoCliente[0])
        this.removerCliente(relacaoVeiculoCliente[1])   
        
        console.log("Veículo devolvido com sucesso!")
        console.log(" ")

    }

    capturarPosicaoVeiculo(placa: string){

        for(const posicao in this.veiculos){
            if(this.veiculos[posicao].placa.toUpperCase() === placa.toUpperCase()){
                return parseInt(posicao)
            }
        }

        return null
    }

    removerVeiculo(){

        const placa: string = promptSync('Digite a placa do veiculo a ser removido: ') 

        const posicaoVeiculo = this.capturarPosicaoVeiculo(placa)

        if(posicaoVeiculo===null){
            console.log(`O veículo com placa ${placa} não existe no sistema para ser removido!`)
            console.log(" ")
            return
        }

        if(this.veiculos[posicaoVeiculo].cliente !=undefined){
            console.log("O veiculo está alugado e portanto não pode ser removido do sistema!")
            console.log(" ")
            return
        }

        this.veiculos.splice(posicaoVeiculo,1)
        console.log("Veículo removido com sucesso!")
        console.log(" ")       

    }


}
