from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework import status
from rest_framework.response import Response
from .models import Tarefa, Pessoa
from .serializer import TarefaSerializer, PessoaSerializer
from rest_framework import generics

# Create your views here.

def listar_tarefas(request):
    tarefas = Tarefa.objects.all()
    return render(request, "tarefas/lista.html", {"tarefas": tarefas})

class ListarTarefasAPIView(ListAPIView):
    serializer_class = TarefaSerializer

    def get_queryset(self):
        queryset = Tarefa.objects.all()

        # Filtrar por status, se o parâmetro de status for fornecido
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)

        return queryset

class CadastrarTarefasAPIView(CreateAPIView):
    serializer_class = TarefaSerializer

    def post(self, request):
        serializer = TarefaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Atualizar a tarefa com um ID
class AtualizarTarefaAPIView(generics.UpdateAPIView):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer
    lookup_field = 'id'  # Usamos o 'id' para identificar a tarefa

    # Não precisamos sobrescrever o método patch, pois UpdateAPIView já lida com isso
    # O DRF já tem o método partial_update que lida com as requisições PATCH automaticamente

class AtualizarStatusTarefaAPIView(generics.UpdateAPIView):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer
    lookup_field = 'id'

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class ExcluirTarefaAPIView(APIView):
    def delete(self, request, *args, **kwargs):
        try:
            pk = kwargs.get('id')
            tarefa = Tarefa.objects.get(pk=pk)
            tarefa.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Tarefa.DoesNotExist:
            return Response({"error": "Tarefa não encontrada"}, status=status.HTTP_404_NOT_FOUND)

# Views para Pessoa
class ListarPessoasAPIView(ListAPIView):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer

class CadastrarPessoaAPIView(CreateAPIView):
    serializer_class = PessoaSerializer

    def post(self, request):
        serializer = PessoaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
