import { BarraNavegacao } from "./BarraNavegacao";

export default function Cabecalho() {
    return (
        <header className="cabecalho" role="banner" aria-label="Cabeçalho do Gerenciamento de Tarefas">
            <h1 className="titulo" aria-label="Gerenciamento de Tarefas">Gerenciamento de Tarefas</h1>
            <BarraNavegacao />
        </header>
    );
}
