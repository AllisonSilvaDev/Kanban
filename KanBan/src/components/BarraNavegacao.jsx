import { Link } from "react-router-dom";

export function BarraNavegacao() {
    return (
        <nav className="barra" role="navigation" aria-label="Navegação principal">
            <ul>
                <li>
                    <Link to="/cadUsuario" aria-label="Cadastrar usuário">Cadastro de Usuário</Link>
                </li>
                <li>
                    <Link to="/cadTarefa" aria-label="Cadastrar tarefa">Cadastro de Tarefas</Link>
                </li>
                <li>
                    <Link to="#" aria-label="Gerenciar tarefas">Gerenciamento de Tarefas</Link>
                </li>
            </ul>
        </nav>
    );
}
