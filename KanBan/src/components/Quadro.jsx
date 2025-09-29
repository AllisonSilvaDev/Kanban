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
            setErro('Erro de rede ou servidor');
        }
    };

    useEffect(() => {
        fetchTarefas();
    }, []);

    const atualizarStatusTarefa = async (id, novoStatus) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tarefas/${id}/`, {
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
                console.error('Erro ao atualizar a tarefa');
            }
        } catch (error) {
            console.error('Erro de rede ou servidor', error);
        }
    };

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return; // se soltar fora de um droppable, ignora

        // Se não mudou de coluna, não faz nada
        if (source.droppableId === destination.droppableId) return;

        const novoStatus = destination.droppableId;

        // Atualiza estado local imediatamente
        setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa) =>
                tarefa.id === parseInt(draggableId)
                    ? { ...tarefa, status: novoStatus }
                    : tarefa
            )
        );

        // Atualiza no backend
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
                                <Coluna tarefas={tarefasFazer} />
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
                                <Coluna tarefas={tarefasFazendo} />
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
                                <Coluna tarefas={tarefasConcluido} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </main>
    );
}
