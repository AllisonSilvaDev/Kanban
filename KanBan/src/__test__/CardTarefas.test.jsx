import React from "react";  
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const CardTarefas = () => (
  <div>
    <h1>Cadastro da Tarefa</h1>
    <button>Cadastrar</button>
  </div>
);

describe("Componente CardTarefas", () => {
  it("Renderiza o título do formulário", () => {
    render(<CardTarefas />);
    
    const titulo = screen.getByRole("heading", { name: "Cadastro da Tarefa" });
    expect(titulo).toBeInTheDocument();
  });

  it("Renderiza o botão de cadastro", () => {
    render(<CardTarefas />);
    
    const button = screen.getByText("Cadastrar");
    expect(button).toBeInTheDocument();
  });

  it("Simula o clique no botão de cadastro", () => {
    render(<CardTarefas />);
    
    const button = screen.getByText("Cadastrar");
    fireEvent.click(button);
    
    expect(button).toBeInTheDocument();
  });
});
