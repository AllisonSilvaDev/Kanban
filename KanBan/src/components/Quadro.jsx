import React, { useState, useEffect } from 'react';
import Coluna from './Coluna';
import '../styles/Quadro.scss';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export default function Quadro() {
    const [tarefas, setTarefas] = useState([]);
    const [erro, setErro] = useState('');

    const fetchTarefas = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/tarefas/');
            if (response.ok) {
                const data = await response.json();
                setTarefas(data);
            } else {
                setErro('Erro ao carregar as tarefas');
            }
        } catch (error) {
            console.log(error)
            setErro('Erro de rede ou servidor');
        }
    };

    useEffect(() => {
        fetchTarefas();
    }, []);

    const atualizarStatusTarefa = async (id, novoStatus) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tarefas/${id}/editar/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: novoStatus }),
            });

            if (response.ok) {
                setTarefas((prevTarefas) =>
                    prevTarefas.map((tarefa) =>
                        tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa
                    )
                );
            } else {
                const errorData = await response.json();
                console.error('Erro ao atualizar a tarefa:', errorData);
            }
        } catch (error) {
            console.error('Erro de rede ou servidor', error);
        }
    };

    const deletarTarefa = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tarefas/${id}/excluir/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // remove do estado local
                setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== id));
            } else {
                const errorData = await response.json();
                console.error("Erro ao excluir tarefa:", errorData);
                setErro(errorData.detail || "Erro ao excluir a tarefa");
            }
        } catch (error) {
            console.error("Erro de rede ou servidor:", error);
            setErro("Erro de rede ou servidor");
        }
    };

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return; 

        if (source.droppableId === destination.droppableId) return;

        const novoStatus = destination.droppableId;

        setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa) =>
                tarefa.id === parseInt(draggableId)
                    ? { ...tarefa, status: novoStatus }
                    : tarefa
            )
        );

        atualizarStatusTarefa(parseInt(draggableId), novoStatus);
    };

    const tarefasFazer = tarefas.filter((t) => t.status === 'fazer');
    const tarefasFazendo = tarefas.filter((t) => t.status === 'fazendo');
    const tarefasConcluido = tarefas.filter((t) => t.status === 'concluido');

    return (
        <main className="containerQuadro">

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="containerQuadros">
                    <Droppable droppableId="fazer">
                        {(provided) => (
                            <div
                                className="quadro"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <h2 className="titulo">A Fazer</h2>
                                <Coluna tarefas={tarefasFazer} deletarTarefa={deletarTarefa} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="fazendo">
                        {(provided) => (
                            <div
                                className="quadro"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <h2 className="titulo">Fazendo</h2>
                                <Coluna tarefas={tarefasFazendo} deletarTarefa={deletarTarefa} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="concluido">
                        {(provided) => (
                            <div
                                className="quadro"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <h2 className="titulo">Concluído</h2>
                                <Coluna tarefas={tarefasConcluido} deletarTarefa={deletarTarefa} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </main>
    );
}
