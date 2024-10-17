CREATE TABLE Carro(
id_carro SERIAL PRIMARY KEY,
marca VARCHAR (50) NOT NULL,
modelo VARCHAR (50) NOT NULL,
ano INT,
cor VARCHAR (20)
);

SELECT * FROM Carro;

CREATE TABLE cliente(
id_cliente SERIAL PRIMARY KEY,
nome VARCHAR (50) NOT NULL,
cpf VARCHAR (11) UNIQUE NOT NULL,
telefone VARCHAR (16)
);

SELECT * FROM Cliente;


CREATE TABLE pedido_venda (
id_pedido SERIAL PRIMARY KEY,
id_carro INT,
id_cliente INT,
data_pedido DATE NOT NULL,
valor_pedido DECIMAL (6) NOT NULL,
FOREIGN KEY (id_carro) REFERENCES Carro(id_carro),
FOREIGN KEY (id_cliente) REFERENCES Cliente (id_cliente)
);

SELECT * FROM pedido_venda;

INSERT INTO cliente (nome, cpf, telefone) VALUES

('Maria Silva','65434567988', '9999-1234'),
('João Souza', '77439299912', '9999-5678'),
('Carlos Oliveira', '54356545454', '9999-8765'),
('Ana Julia', '55854108810', '9999-4321'),
('Paulo Lima', '6765858544', '9999-6543')


-- Inserir o dados na tabela Carro
INSERT INTO Carro (marca, modelo, ano, cor) VALUES
('Toyota', 'Corolla', '2020', 'Prata'),
('Honda', 'Civic', '2019', 'Preto'),
('Ford', 'Focus', '2018', 'Branco'),
('Chevrolet', 'Cruze', '2021', 'Azul'),
('Volkswagen', 'Golf', '2022', 'Vermelho')


INSERT INTO pedido_venda (id_carro, id_cliente, data_pedido, valor_pedido) VALUES
(1, 1, '2024-09-30', '35000.00'),
(2, 2, '2024-09-29','45000.00'),
(3, 3, '2024-09-28', '25000.00'),
(4, 4, '2024-09-27', '38000.00'),
(5, 5, '2024-09-26', '52000.00')
