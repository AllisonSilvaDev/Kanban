import { Draggable } from '@hello-pangea/dnd';

export default function Coluna({ tarefas, deletarTarefa }) {
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
                                <button
                                    onClick={() => deletarTarefa(tarefa.id)}
                                    style={{
                                        background: 'red',
                                        color: 'white',
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginTop: '10px'
                                    }}
                                >
                                    Excluir
                                </button>
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
