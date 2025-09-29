from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('pessoas/', ListarPessoasAPIView.as_view(), name='listar_pessoas'),
    path('tarefas/', ListarTarefasAPIView.as_view(), name='listar_tarefas'),
    path('cadastrar/', CadastrarPessoaAPIView.as_view(), name='cadastrar_pessoa'),
    path('cadastrarTarefa/', CadastrarTarefasAPIView.as_view(), name='cadastrar_tarefa'),
    path('tarefas/<int:id>/editar/', AtualizarTarefaAPIView.as_view(), name='editar_tarefa'),
    path('tarefas/<int:id>/status/', AtualizarStatusTarefaAPIView.as_view(), name='atualizar_status_tarefa'),
    path('tarefas/<int:id>/excluir/', ExcluirTarefaAPIView.as_view(), name='excluir_tarefa'),
]
