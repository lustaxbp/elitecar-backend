import { DatabaseModel } from "./DatabaseModel";

// armazenei o pool de conexões
const database = new DatabaseModel().pool;

/**
 * Classe que representa um carro.
 */
@@ -123,4 +128,49 @@ export class Carro {
    public setCor(cor: string): void {
        this.cor = cor;
    }

    /**
     * Busca e retorna uma lista de carros do banco de dados.
     * @returns Um array de objetos do tipo `Carro` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todas as informações da tabela "carro".
     * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Carro`.
     * - Cada carro é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemCarros(): Promise<Array<Carro> | null> {
        // objeto para armazenar a lista de carros
        const listaDeCarros: Array<Carro> = [];

        try {
            // query de consulta ao banco de dados
            const querySelectCarro = `SELECT * FROM carro;`;

            // fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectCarro);

            // usando a resposta para instanciar um objeto do tipo carro
            respostaBD.rows.forEach((linha) => {
                // instancia (cria) objeto carro
                const novoCarro = new Carro(
                    linha.marca,
                    linha.modelo,
                    linha.ano,
                    linha.cor
                );

                // atribui o ID objeto
                novoCarro.setIdCarro(linha.id_carro);

                // adiciona o objeto na lista
                listaDeCarros.push(novoCarro);
            });

            // retorna a lista de carros
            return listaDeCarros;
        } catch (error) {
            console.log('Erro ao buscar lista de carros');
            return null;
        }
    }
}
