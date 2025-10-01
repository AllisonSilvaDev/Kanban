import React, { useState } from 'react';
import { z } from 'zod';

// ✅ Esquema de validação com Zod
const userSchema = z.object({
  nome: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(50, "O nome não pode exceder 50 caracteres")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome só pode conter letras e espaços")
    .transform((val) => val.trim()), // Remove espaços extras
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("Email inválido")
    .max(100, "O email não pode exceder 100 caracteres")
    .transform((val) => val.trim()), // Remove espaços extras
  senha: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(20, "A senha não pode exceder 20 caracteres")
    .regex(/^(?!.*\s).*$/, "A senha não pode conter espaços")
    .transform((val) => val.trim()), // Remove espaços extras
});

export function CardUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Validação usando Zod
    const validation = userSchema.safeParse({ nome, email, senha });

    if (!validation.success) {
      // Verifica se a validação falhou e se há erros
      const errorMessages = validation.error?.errors?.map((err) => err.message) || [];
      if (errorMessages.length > 0) {
        setErro(errorMessages.join(", "));  // Exibe os erros concatenados
      } else {
        setErro('Erro desconhecido na validação');
      }
      return;
    }

    // Simulação de sucesso da API
    setSucesso('Usuário cadastrado com sucesso!');
  };

  return (
    <form
      className="formulario"
      onSubmit={handleSubmit}
      role="form"
      aria-labelledby="form-title"
    >
      <h2 id="form-title" className="titulo">Cadastro de usuário</h2>

      {erro && (
        <p role="alert" aria-live="assertive" style={{ color: 'red' }}>
          {erro}
        </p>
      )}
      {sucesso && (
        <p role="alert" aria-live="polite" style={{ color: 'green' }}>
          {sucesso}
        </p>
      )}

      <label htmlFor="nome">Nome:</label>
      <input
        id="nome"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="senha">Senha:</label>
      <input
        id="senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <a href="/"><h1>Home</h1></a>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
