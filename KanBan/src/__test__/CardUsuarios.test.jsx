import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CardUsuario } from "../Paginas/CardUsuarios";

describe("Componente CardUsuario", () => {
  it("Renderiza o título do formulário", () => {
    render(<CardUsuario />);

    const titulo = screen.getByRole("heading", { name: "Cadastro de usuário" });
    expect(titulo).toBeInTheDocument();
  });

  it("Renderiza os campos de nome, email e senha", () => {
    render(<CardUsuario />);

    expect(screen.getByLabelText("Nome:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha:")).toBeInTheDocument();
  });

  it("Simula o envio do formulário com dados válidos", async () => {
    render(<CardUsuario />);

    fireEvent.change(screen.getByLabelText("Nome:"), { target: { value: "João Silva" } });
    fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "joao@example.com" } });
    fireEvent.change(screen.getByLabelText("Senha:"), { target: { value: "123456" } });

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Usuário cadastrado com sucesso!");
    });
  });

  it("Simula o envio do formulário com dados inválidos", async () => {
    render(<CardUsuario />);

    fireEvent.change(screen.getByLabelText("Nome:"), { target: { value: "" } }); 
    fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "invalid-email" } }); 
    fireEvent.change(screen.getByLabelText("Senha:"), { target: { value: "12" } }); 

    fireEvent.click(screen.getByText("Cadastrar"));


  });
});
