import React, { useState } from 'react';
import { z } from 'zod';

// ✅ Esquema de validação com Zod
const userSchema = z.object({
  nome: z
    .string()
    .min(1, "O nome é obrigatório")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome só pode conter letras e espaços"),
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
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

    const validation = userSchema.safeParse({ nome, email, senha });

    if (!validation.success) {
      setErro("Email já associado a outra conta");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/cadastrar/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha, email }),
      });

      if (response.ok) {
        setSucesso('Usuário cadastrado com sucesso!');
      } else {
        const errorData = await response.json();
        setErro(errorData.detail || 'Email já associado a outra conta');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor');
      console.error(error);
    }
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
