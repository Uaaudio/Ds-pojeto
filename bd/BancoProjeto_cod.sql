CREATE DATABASE if not exists horarios_docentes;
USE horarios_docentes;

-- Tabela para cadastro dos docentes
CREATE TABLE if not exists docente (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
area VARCHAR(50),
email VARCHAR(100),
telefone VARCHAR(20)
);

-- Tabela para cadastro dos coordenadores
CREATE TABLE if not exists coordenadores (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100),
telefone VARCHAR(20)
);

-- Tabela para cadastro das turmas
CREATE TABLE if not exists turmas (
id INT AUTO_INCREMENT PRIMARY KEY,
docente_id INT, 		-- esse campo é para fazer a relação de qual docente está responsável pela turma () .
nome VARCHAR(50) NOT NULL,
curso VARCHAR(100),
periodo VARCHAR(50),
FOREIGN KEY (docente_id) REFERENCES docentes(id)
);

-- Tabela para cadastro dos horários docentes
CREATE TABLE if not exists horarios_docentes (
id INT AUTO_INCREMENT PRIMARY KEY,
docente_id INT,
turma_id INT,
dia_semana
ENUM('Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'),
hora_inicio TIME,
hora_fim TIME,
FOREIGN KEY (docente_id) REFERENCES docente(id),
FOREIGN KEY (turma_id) REFERENCES turmas(id)
);

-- Tabela para gerenciamento de login e senha com nível de acesso
CREATE TABLE if not exists usuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(50) UNIQUE NOT NULL,
senha VARCHAR(255) NOT NULL,
nivel_acesso ENUM('coordenador','docente') NOT NULL,
docente_id INT,
coordenador_id INT,
FOREIGN KEY (docente_id) REFERENCES docentes(id),
FOREIGN KEY (coordenador_id) REFERENCES coordenadores(id)
);


