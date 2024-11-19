import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um Pedido de Venda.
 */
export class PedidoVenda {
    /**
     * Identificador único do pedido de venda.
     */
    private idPedido: number = 0;
    /**
     * Identificador do carro associado ao pedido de venda.
     */
    private idCarro: number;
    /**
     * Identificador do pedido associado ao pedido de venda.
     */
    private idpedido: number;
    /**
     * Data do pedido de venda.
     */
    private dataPedido: Date;
    /**
     * Valor total do pedido.
     */
    private valorPedido: number;

    /**
     * Construtor da classe PedidoVenda.
     * @param idCarro - Identificador do carro.
     * @param idpedido - Identificador do pedido.
     * @param dataPedido - Data do pedido.
     * @param valorPedido - Valor do pedido.
     */
    constructor(idCarro: number, idpedido: number, dataPedido: Date, valorPedido: number) {
        this.idCarro = idCarro;
        this.idpedido = idpedido;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }

    /**
     * Obtém o identificador do pedido.
     * @returns O identificador do pedido.
     */
    public getIdPedido(): number {
        return this.idPedido;
    }

    /**
     * Define o identificador do pedido.
     * @param idPedido - Novo identificador do pedido.
     */
    public setIdPedido(idPedido: number): void {
        this.idPedido = idPedido;
    }

    /**
     * Obtém o identificador do carro.
     * @returns O identificador do carro.
     */
    public getIdCarro(): number {
        return this.idCarro;
    }

    /**
     * Define o identificador do carro.
     * @param idCarro - Novo identificador do carro.
     */
    public setIdCarro(idCarro: number): void {
        this.idCarro = idCarro;
    }

    /**
     * Obtém o identificador do pedido.
     * @returns O identificador do pedido.
     */
    public getIdpedido(): number {
        return this.idpedido;
    }

    /**
     * Define o identificador do pedido.
     * @param idpedido - Novo identificador do pedido.
     */
    public setIdpedido(idpedido: number): void {
        this.idpedido = idpedido;
    }

    /**
     * Obtém a data do pedido.
     * @returns A data do pedido.
     */
    public getDataPedido(): Date {
        return this.dataPedido;
    }

    /**
     * Define a data do pedido.
     * @param dataPedido - Nova data do pedido.
     */
    public setDataPedido(dataPedido: Date): void {
        this.dataPedido = dataPedido;
    }

    /**
     * Obtém o valor do pedido.
     * @returns O valor do pedido.
     */
    public getValorPedido(): number {
        return this.valorPedido;
    }

    /**
     * Define o valor do pedido.
     * @param valorPedido - Novo valor do pedido.
     */
    public setValorPedido(valorPedido: number): void {
        this.valorPedido = valorPedido;
    }

    /**
     * Busca e retorna uma lista de pedidos de venda do banco de dados.
     * @returns Um array de objetos do tipo `PedidoVenda` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todos os registros da tabela "pedido_venda".
     * - Os dados retornados são utilizados para instanciar objetos da classe `PedidoVenda`.
     * - Cada pedido de venda instanciado é adicionado a uma lista que será retornada ao final da execução.
     * - Caso ocorra uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemPedidos(): Promise<Array<PedidoVenda> | null> {
        const listaDePedidos: Array<PedidoVenda> = [];

        try {
            const querySelectPedidos = `SELECT * FROM pedido_venda;`;
            const respostaBD = await database.query(querySelectPedidos);

            respostaBD.rows.forEach((linha: any) => {
                const novoPedidoVenda = new PedidoVenda(
                    linha.id_carro,
                    linha.id_pedido,
                    linha.data_pedido,
                    parseFloat(linha.valor_pedido)
                );

                novoPedidoVenda.setIdPedido(linha.id_pedido);

                listaDePedidos.push(novoPedidoVenda);
            });

            return listaDePedidos;
        } catch (error) {
            console.log('Erro ao buscar lista de pedidos');
            return null;
        }
    }
/**
     * Realiza o cadastro de pedido no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Pedido` e insere seus dados (idCarro,idpedido,dataPedido,valorPedido)
     * na tabela `pedidoVEndas` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {PedidoVenda} pedido_venda - Objeto contendo os dados do pedido que será cadastrado. O objeto `pedidoVenda`
     *                        deve conter os métodos `getIdCarro()`, `getIdpedido()`, `getDatapedido(),`getValorPedido`` 
     *                        que retornam os respectivos valores do pedido.
     * @returns {Promise<boolean>} - Retorna `true` se o pedido foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
static async cadastroPedidoVenda(pedidoVenda: PedidoVenda): Promise<boolean> {
    try {
        // query para fazer insert de um carro no banco de dados
        const queryInsertPedidoVenda = `INSERT INTO carro (nome, cpf, telefone)
                                    VALUES
                                    (${pedidoVenda.getIdpedido()}, 
                                    ${pedidoVenda.getIdCarro()}, 
                                    ${pedidoVenda.getValorPedido()},
                                    ${pedidoVenda.getDataPedido()}, 
                                    RETURNING id_pedido;`;

        // executa a query no banco e armazena a resposta
        const respostaBD = await database.query(queryInsertPedidoVenda);

        // verifica se a quantidade de linhas modificadas é diferente de 0
        if (respostaBD.rowCount != 0) {
            console.log(`Pedido cadastrado com sucesso! ID do pedido: ${respostaBD.rows[0].id_pedido}`);
            // true significa que o cadastro foi feito
            return true;
        }
        // false significa que o cadastro NÃO foi feito.
        return false;

        // tratando o erro
    } catch (error) {
        // imprime outra mensagem junto com o erro
        console.log('Erro ao cadastrar o pedido. Verifique os logs para mais detalhes.');
        // imprime o erro no console
        console.log(error);
        // retorno um valor falso
        return false;
    }
}
static async removerPedidoVenda(idPedido: number): Promise<boolean>{
    try {
        const queryDeletePedido = `DELETE FROM pedido_venda WHERE id_pedido = ${idPedido}`;
        const respostaBD = await database.query(queryDeletePedido);
        if(respostaBD.rowCount !=0){
            console.log(`Pedido removido com sucesso ! `);
            return true;
        }
        return false;
        
    } catch (error) {
        console.log(`ERRO ao remover Pedido. verifique os logs para mais detalhes.`);
        console.log(error);
        return false;
    }
}


    /**
     * Atualiza as informações de um pedido no banco de dados.
     *
     * @param {Pedido} pedido - O objeto pedido contendo as informações atualizadas.
     * @returns {Promise<boolean>} - Retorna uma Promise que resolve para true se a atualização foi bem-sucedida, ou false caso contrário.
     *
     * @throws {Error} - Lança um erro se ocorrer algum problema durante a execução da query.
     */
    static async atualizarpedido(pedido: PedidoVenda): Promise<boolean> {
        try {
            // cria a query de update a ser executada no banco de dados
            const queryUpdatepedido = `UPDATE pedido SET
                                        id_pedido = ${pedido.getIdPedido()},
                                        id_carro = ${pedido.getIdCarro()},
                                        valorPedido = ${pedido.getValorPedido()},
                                        dataPedido = ${pedido.getDataPedido()}
                                        WHERE id_carro = ${pedido.getIdpedido()};`;

            // executar a query e armazenar a resposta do banco de dados em uma variável
            const respostaBD = await database.query(queryUpdatepedido);

            // verifica se alguma linha foi alterada
            if(respostaBD.rowCount != 0) {
                // imprime uma mensagem de sucesso no console
                console.log(`pedido atualizado com sucesso! ID: ${pedido.getIdpedido()}`);
                // retorna ture, indicando que a query foi executada com sucesso
                return true;
            }

            // retorna falso, indicando que a query não foi executada com sucesso
            return false;

        } catch (error) {
            // exibe uma mensagem de falha
            console.log(`Erro ao atualizar o pedido. Verifique os logs para mais detalhes.`);
            // imprime o erro no console da API
            console.log(error);
            // retorna false, o que indica que a remoção não foi feita
            return false;
        }
    }
}
