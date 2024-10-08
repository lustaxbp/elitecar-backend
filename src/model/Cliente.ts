    /**
 * Classe que representa cliente.
 */
 /* Atributos */
    /* Identificador do cliente */
    export class Cliente{
        private idCliente: number = 0;
    /* nome do cliente */
    private nome: string;
    /* cpf do cliente */
    private cpf: number;
    /* telefone do cliente */
    private telefone: number;
    /**
     * Construtor da classe Carro
     * 
     * @param nome nome do cliente
     * @param cpf cpf do cliente
     * @param telefone telefone do cliente
     */
    constructor(
        nome: string,
        cpf: number,
        telefone: number,
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

    
    /* Métodos get e set */
    /**
     * Recupera o identificador do cliente
     * @returns o identificador do cliente
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Atribui um valor ao identificador do cliente
     * @param idCliente novo identificado do cliente
     */
    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    /**
     * Retorna o nome do cliente.
     *
     * @returns {string} o nome do cliente.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do cliente.
     * 
     * @param nome - O nome do cliente a ser definido.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o cpf do cliente.
     *
     * @returns {number} O cpf do cliente.
     */
    public getCpf(): number {
        return this.cpf;
    }

    /**
     * Define o cpf do cliente.
     *
     * @param cpf - O cpf do cliente.
     */
    public setCpf(cpf: number): void {
        this.cpf = cpf;
    }

    /**
     * Retorna o telefone do cliente.
     *
     * @returns O telefone do cliente.
     */
    public getTelefone(): number {
        return this.telefone;
    }

    /**
     * Define o telefone do cliente.
     * 
     * @param telefone - O telefone deve ser definido para o cliente.
     */
    public setTelefone(telefone: number): void {
        this.telefone = telefone;
    }

}