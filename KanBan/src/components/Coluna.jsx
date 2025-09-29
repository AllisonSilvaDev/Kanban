import { useState, useEffect } from 'react';

import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export default function Coluna({ tarefas }) {
    return (
        <div className="coluna">
            {tarefas.length > 0 ? (
                tarefas.map((tarefa, index) => (
                    <Draggable
                        key={tarefa.id.toString()}
                        draggableId={tarefa.id.toString()}
                        index={index}
                    >
                        {(provided) => (
                            <div
                                className="tarefa-item"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <h3>Tarefa {tarefa.id}: {tarefa.descricao}</h3>
                                <p><strong>Setor:</strong> {tarefa.setor}</p>
                                <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                                <p><strong>Status:</strong> {tarefa.status}</p>
                            </div>
                        )}
                    </Draggable>
                ))
            ) : (
                <p>Não há tarefas nesta coluna.</p>
            )}
        </div>
    );
}

