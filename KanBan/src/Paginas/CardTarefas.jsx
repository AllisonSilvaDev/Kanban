import React, { useState, useEffect } from 'react';
import { z } from 'zod';

// Esquema de validação com Zod
const tarefaSchema = z.object({
  descricao: z
    .string()
    .min(1, 'A descrição é obrigatória')
    .max(200, 'A descrição não pode exceder 200 caracteres'),
  setor: z
    .string()
    .min(1, 'O setor é obrigatório')
    .max(50, 'O setor não pode exceder 50 caracteres'),
  usuario: z
    .string()
    .min(1, 'O usuário é obrigatório')
    .regex(/^\d+$/, 'Usuário inválido'), // Garante que o usuário seja um número (ID)
  prioridade: z.enum(['Alta', 'Média', 'Baixa'], 'Prioridade inválida'),
  status: z.enum(['fazer', 'fazendo', 'concluido'], 'Status inválido'),
});

export function CardTarefas() {
  const [descricao, setDescricao] = useState('');
  const [setor, setSetor] = useState('');
  const [usuario, setUsuario] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [status, setStatus] = useState('fazer');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/pessoas/');
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        setErro('Erro ao carregar usuários');
      }
    } catch (error) {
      console.log(error)
      setErro('Erro de rede ou servidor');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    const validation = tarefaSchema.safeParse({ descricao, setor, usuario, prioridade, status });

    if (!validation.success) {
      // Exibe os erros de validação concatenados
      setErro(validation.error.errors.map(err => err.message).join(', '));
      return;
    }

    const usuarioId = parseInt(usuario, 10);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/cadastrarTarefa/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao, setor, usuario: usuarioId, prioridade, status }),
      });

      if (response.ok) {
        setSucesso('Tarefa cadastrada com sucesso!');
      } else {
        const errorData = await response.json();
        setErro(errorData.detail || 'Erro ao cadastrar tarefa');
      }
    } catch (error) {
      console.log(error);
      setErro('Erro de rede ou servidor');
    }
  };

  return (
    <>
      <form
        className="formulario"
        onSubmit={handleSubmit}
        role="form"
        aria-labelledby="form-title"
      >
        <h2 id="form-title" className="titulo">Cadastro da Tarefa</h2>

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

        <label htmlFor="descricao">Descrição:</label>
        <input
          id="descricao"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          aria-required="true"
        />

        <label htmlFor="setor">Setor:</label>
        <input
          id="setor"
          type="text"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          required
          aria-required="true"
        />

        <label htmlFor="usuario">Usuário:</label>
        <select
          id="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          aria-required="true"
        >
          <option value="">Selecione um usuário</option>
          {usuarios.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nome}
            </option>
          ))}
        </select>

        <label htmlFor="prioridade">Prioridade:</label>
        <select
          id="prioridade"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
          required
          aria-required="true"
        >
          <option value="">Selecione a prioridade</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          aria-required="true"
        >
          <option value="fazer">A Fazer</option>
          <option value="fazendo">Fazendo</option>
          <option value="concluido">Concluído</option>
        </select>

        <button type="submit">Cadastrar</button>
      </form>
      <div className="">
        <a href="/"><h1>Home</h1></a>
      </div>
    </>
  );
}
