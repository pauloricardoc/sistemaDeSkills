CREATE SEQUENCE usuarios_seq START 1;
CREATE SEQUENCE skills_seq START 1;
CREATE SEQUENCE usuario_skills_seq START 1;

CREATE TABLE usuarios (
  id bigint PRIMARY KEY DEFAULT nextval('usuarios_seq'),
  login varchar(100) UNIQUE NOT NULL,
  senha_hash varchar(200) NOT NULL
);

CREATE TABLE skills (
  id bigint PRIMARY KEY DEFAULT nextval('skills_seq'),
  nome varchar(100) NOT NULL,
  descricao text,
  imagem_url text
);

CREATE TABLE usuario_skills (
  id bigint PRIMARY KEY DEFAULT nextval('usuario_skills_seq'),
  usuario_id bigint NOT NULL,
  skill_id bigint NOT NULL,
  level varchar(50),
  CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  CONSTRAINT fk_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
  UNIQUE (usuario_id, skill_id)
);

INSERT INTO skills (nome, descricao, imagem_url) VALUES
('Java', 'Linguagem de programação orientada a objetos', 'https://example.com/java.png'),
('React', 'Biblioteca JS para UI', 'https://example.com/react.png'),
('PostgreSQL', 'Banco de dados relacional', 'https://example.com/postgres.png');
