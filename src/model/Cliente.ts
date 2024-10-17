import { query } from "express";
import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Representa um cliente com identificador único, nome, CPF e telefone.
 */
@@ -104,4 +109,39 @@ export class Cliente {
    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    /**
     * Busca e retorna uma lista de clientes do banco de dados.
     * @returns Um array de objetos do tipo `Cliente` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todos os registros da tabela "cliente".
     * - Os dados retornados são utilizados para instanciar objetos da classe `Cliente`.
     * - Cada cliente instanciado é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver uma falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemClientes(): Promise<Array<Cliente> | null> {
        const listaDeClientes: Array<Cliente> = [];

        try {
            const querySelectCliente = `SELECT * FROM cliente`;
            const respostaBD = await database.query(querySelectCliente);

            respostaBD.rows.forEach((linha) => {
                const novoCliente = new Cliente(
                    linha.nome,
                    linha.cpf,
                    linha.telefone
                );

                novoCliente.setIdCliente(linha.id_cliente);

                listaDeClientes.push(novoCliente);
            });

            return listaDeClientes;
        } catch (error) {
            console.log('Erro ao buscar lista de carros');
            return null;
        }
    }
}
