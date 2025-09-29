import React, { useState, useEffect } from 'react';

export default function Coluna({ tarefas }) {
    const [tarefasAtualizadas, setTarefasAtualizadas] = useState(tarefas);
    const [modalEditar, setModalEditar] = useState(false);
    const [tarefaEditando, setTarefaEditando] = useState(null);

    useEffect(() => {
        console.log("Tarefas recebidas:", tarefas);
        setTarefasAtualizadas(tarefas);
    }, [tarefas]);

    const atualizarStatus = async (id, novoStatus) => {
        try {
            console.log(`Atualizando tarefa ${id} para status ${novoStatus}`);
            const response = await fetch(`http://127.0.0.1:8000/api/tarefas/${id}/status/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: novoStatus }),
            });

            if (response.ok) {
                const dadosAtualizados = await response.json();
                console.log("Tarefa atualizada:", dadosAtualizados);
                setTarefasAtualizadas((prevTarefas) =>
                    prevTarefas.map((tarefa) =>
                        tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa
                    )
                );
                window.location.href = window.location.href;
            } else {
                console.error('Erro ao atualizar a tarefa');
            }
        } catch (error) {
            console.error('Erro de rede ou servidor', error);
        }
    };

    const excluirTarefa = async (id) => {
        try {
            console.log(`Excluindo tarefa ${id}`);
            const response = await fetch(`http://127.0.0.1:8000/api/tarefas/${id}/excluir/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setTarefasAtualizadas((prevTarefas) =>
                    prevTarefas.filter((tarefa) => tarefa.id !== id)
                );
                console.log("Tarefa excluída:", id);
            } else {
                console.error('Erro ao excluir a tarefa');
            }
        } catch (error) {
            console.error('Erro de rede ou servidor', error);
        }
    };

    const editarTarefa = (tarefa) => {
        setTarefaEditando(tarefa);
        setModalEditar(true);
    };

    const salvarEdicao = async () => {
        try {
            console.log(`Salvando edição para a tarefa ${tarefaEditando.id}`);
            const response = await fetch(`http://127.0.0.1:8000/api/tarefas/${tarefaEditando.id}/editar/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descricao: tarefaEditando.descricao,
                    setor: tarefaEditando.setor,
                    prioridade: tarefaEditando.prioridade,
                    status: tarefaEditando.status, // Não esquecer de enviar o status também
                }),
            });

            if (response.ok) {
                const dadosAtualizados = await response.json();
                console.log("Tarefa atualizada:", dadosAtualizados);
                setTarefasAtualizadas((prevTarefas) =>
                    prevTarefas.map((tarefa) =>
                        tarefa.id === dadosAtualizados.id ? dadosAtualizados : tarefa
                    )
                );
                setModalEditar(false);
            } else {
                console.error('Erro ao salvar a edição');
            }
        } catch (error) {
            console.error('Erro de rede ou servidor', error);
        }
    };

    return (
        <div className="coluna" role="list" aria-live="polite"> 
            {tarefasAtualizadas.length > 0 ? (
                tarefasAtualizadas.map((tarefa) => (
                    <div key={tarefa.id} className="tarefa-item" role="listitem" aria-labelledby={`tarefa-${tarefa.id}`}>
                        <h3 id={`tarefa-${tarefa.id}`} className="tarefa-titulo">
                            Tarefa {tarefa.id}: {tarefa.descricao}
                        </h3>
                        <p><strong>Setor:</strong> {tarefa.setor}</p>
                        <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>

                        <div className="container-button">
                            <div className="button">
                                <button type="button" onClick={() => editarTarefa(tarefa)}>Editar</button>
                            </div>
                            <div className="button">
                                <button type="button" onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
                            </div>
                        </div>

                        <p><strong>Status:</strong> {tarefa.status}</p>
                        <div className="container-status">
                            <label htmlFor={`status-${tarefa.id}`} aria-label="Alterar status da tarefa">Alterar Status:</label>
                            <select
                                id={`status-${tarefa.id}`}
                                value={tarefa.status}
                                onChange={(e) => setTarefaEditando({ ...tarefaEditando, status: e.target.value })}
                                aria-describedby={`status-description-${tarefa.id}`}
                            >
                                <option value="fazer">A Fazer</option>
                                <option value="fazendo">Fazendo</option>
                                <option value="concluido">Concluído</option>
                            </select>
                            <div className="button">
                                <button onClick={() => atualizarStatus(tarefa.id, tarefaEditando.status)}>Alterar Status</button>
                            </div>
                        </div>

                        <p id={`status-description-${tarefa.id}`} style={{ visibility: 'hidden' }}>
                            Selecione o novo status para esta tarefa.
                        </p>
                    </div>
                ))
            ) : (
                <p>Não há tarefas nesta coluna.</p>
            )}

            {/* Modal de Edição */}
            {modalEditar && tarefaEditando && (
                <div className="modal">
                    <h2>Editar Tarefa {tarefaEditando.id}</h2>
                    <label>Descrição</label>
                    <input
                        type="text"
                        value={tarefaEditando.descricao}
                        onChange={(e) => setTarefaEditando({ ...tarefaEditando, descricao: e.target.value })}
                    />
                    <label>Setor</label>
                    <input
                        type="text"
                        value={tarefaEditando.setor}
                        onChange={(e) => setTarefaEditando({ ...tarefaEditando, setor: e.target.value })}
                    />
                    <label>Prioridade</label>
                    <input
                        type="text"
                        value={tarefaEditando.prioridade}
                        onChange={(e) => setTarefaEditando({ ...tarefaEditando, prioridade: e.target.value })}
                    />
                    <label>Status</label>
                    <select
                        value={tarefaEditando.status}
                        onChange={(e) => setTarefaEditando({ ...tarefaEditando, status: e.target.value })}
                    >
                        <option value="fazer">A Fazer</option>
                        <option value="fazendo">Fazendo</option>
                        <option value="concluido">Concluído</option>
                    </select>
                    <button onClick={salvarEdicao}>Salvar Edição</button>
                    <button onClick={() => setModalEditar(false)}>Cancelar</button>
                </div>
            )}
        </div>
    );
}
