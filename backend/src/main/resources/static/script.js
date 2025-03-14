document.addEventListener('DOMContentLoaded', function() {
    // Alterna entre os formulários de Gasto e Renda
    document.getElementById('btnGastos').addEventListener('click', function() {
        // Exibe a seção de Gastos e esconde a de Renda
        document.getElementById('gastosSection').style.display = 'block';
        document.getElementById('rendaSection').style.display = 'none';
        
        // Exibe o formulário de Gastos e esconde o de Renda
        document.getElementById('formGastos').style.display = 'block';
        document.getElementById('formRenda').style.display = 'none';
    });

    document.getElementById('btnRenda').addEventListener('click', function() {
        // Exibe a seção de Renda e esconde a de Gastos
        document.getElementById('rendaSection').style.display = 'block';
        document.getElementById('gastosSection').style.display = 'none';
        
        // Exibe o formulário de Renda e esconde o de Gastos
        document.getElementById('formRenda').style.display = 'block';
        document.getElementById('formGastos').style.display = 'none';
    });
});

    // Enviar dados para o back-end Java para Gasto
    document.getElementById('formGastos').addEventListener('submit', function(event) {
        event.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const categoria = document.getElementById('categoria').value;
        const data = document.getElementById('data').value;
        const valor = document.getElementById('valor').value;

        const gasto = {
            titulo: titulo,
            descricao: descricao,
            categoria: categoria,
            data: data,
            valor: valor
        };

        // Enviar dados para o back-end Java (API RESTful)
        fetch('http://localhost:8080/api/gasto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gasto)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('mensagem').innerHTML = 'Gasto registrado com sucesso!';
            document.getElementById('gastoForm').reset();
            buscarHistoricoGastos();
        })
        .catch(error => {
            console.error('Erro ao registrar gasto:', error);
            document.getElementById('mensagem').innerHTML = 'Erro ao registrar gasto. Tente novamente.';
        });
    });

    // Enviar dados para o back-end Java para Renda
    document.getElementById('rendaForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const tituloRenda = document.getElementById('tituloRenda').value;
        const descricaoRenda = document.getElementById('descricaoRenda').value;
        const categoriaRenda = document.getElementById('categoriaRenda').value;
        const dataRenda = document.getElementById('dataRenda').value;
        const valorRenda = document.getElementById('valorRenda').value;

        const renda = {
            titulo: tituloRenda,
            descricao: descricaoRenda,
            categoria: categoriaRenda,
            data: dataRenda,
            valor: valorRenda
        };

        // Enviar dados para o back-end Java (API RESTful)
        fetch('http://localhost:8080/api/renda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(renda)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('mensagem').innerHTML = 'Renda registrada com sucesso!';
            document.getElementById('rendaForm').reset();
            buscarHistoricoRendas();
        })
        .catch(error => {
            console.error('Erro ao registrar renda:', error);
            document.getElementById('mensagem').innerHTML = 'Erro ao registrar renda. Tente novamente.';
        });
    });

    // Função para buscar o histórico de gastos
    function buscarHistoricoGastos() {
        fetch('http://localhost:8080/api/gasto/all')
            .then(response => response.json())
            .then(gastos => {
                const tbody = document.querySelector('#gastosSection #tabela-gastos tbody');
                tbody.innerHTML = ''; // Limpar a tabela antes de adicionar novos registros
                gastos.forEach(gasto => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${gasto.titulo}</td>
                        <td>${gasto.descricao}</td>
                        <td>${gasto.categoria}</td>
                        <td>${gasto.data}</td>
                        <td>${gasto.valor}</td>
                        <td>
                            <button onclick="editarGasto(${gasto.id})">Editar</button>
                            <button onclick="deletarGasto(${gasto.id})">Deletar</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            })
            .catch(error => console.error('Erro ao buscar histórico de gastos:', error));
    }

    // Função para buscar o histórico de rendas
    function buscarHistoricoRendas() {
        fetch('http://localhost:8080/api/renda/all')
            .then(response => response.json())
            .then(rendas => {
                const tbody = document.querySelector('#rendaSection #tabela-rendas tbody');
                tbody.innerHTML = ''; // Limpar a tabela antes de adicionar novos registros
                rendas.forEach(renda => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${renda.titulo}</td>
                        <td>${renda.descricao}</td>
                        <td>${renda.categoria}</td>
                        <td>${renda.data}</td>
                        <td>${renda.valor}</td>
                        <td>
                            <button onclick="editarRenda(${renda.id})">Editar</button>
                            <button onclick="deletarRenda(${renda.id})">Deletar</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            })
            .catch(error => console.error('Erro ao buscar histórico de rendas:', error));
    }

    // Chama as funções para preencher as tabelas de histórico
    buscarHistoricoGastos();
    buscarHistoricoRendas();



     // Função para preencher o formulário de edição com os dados da renda
     function editarRenda(id) {
        fetch(`http://localhost:8080/api/renda/${id}`)
            .then(response => response.json())
            .then(renda => {
                document.getElementById('editar-renda-id').value = renda.id;
                document.getElementById('editar-tituloRenda').value = renda.titulo;
                document.getElementById('editar-descricaoRenda').value = renda.descricao;
                document.getElementById('editar-categoriaRenda').value = renda.categoria;
                document.getElementById('editar-dataRenda').value = renda.data;
                document.getElementById('editar-valorRenda').value = renda.valor;

                // Exibe o formulário de edição de renda
                document.getElementById('form-editar-renda').style.display = 'block';
                document.getElementById('form-editar').style.display = 'none';  // Esconde o formulário de gasto
            })
            .catch(error => console.error('Erro ao carregar renda:', error));
    }

    // Função para cancelar a edição
    document.getElementById('cancelar-edicaoRenda').addEventListener('click', () => {
    document.getElementById('form-editar-renda').style.display = 'none';
    });

    // Função para salvar as alterações na renda
    document.getElementById('editar-renda-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('editar-renda-id').value;
        const rendaAtualizada = {
            titulo: document.getElementById('editar-tituloRenda').value,
            descricao: document.getElementById('editar-descricaoRenda').value,
            categoria: document.getElementById('editar-categoriaRenda').value,
            data: document.getElementById('editar-dataRenda').value,
            valor: document.getElementById('editar-valorRenda').value
        };

        fetch(`http://localhost:8080/api/renda/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rendaAtualizada)
        })
        .then(response => {
            if (response.ok) {
                alert('Renda atualizada com sucesso');
                buscarHistoricoRendas(); // Atualiza o histórico de rendas
                document.getElementById('form-editar-renda').style.display = 'none'; // Esconde o formulário
            } else {
                alert('Erro ao atualizar renda');
            }
        })
        .catch(error => console.error('Erro na requisição de atualização:', error));
    });


// Função para editar o gasto
function editarGasto(id) {
    fetch(`http://localhost:8080/api/gasto/${id}`)
        .then(response => response.json())
        .then(gasto => {
            // Preenche os campos do formulário com os dados do gasto
            document.getElementById('editar-gasto-id').value = gasto.id;
            document.getElementById('editar-titulo').value = gasto.titulo;
            document.getElementById('editar-descricao').value = gasto.descricao;
            document.getElementById('editar-categoria').value = gasto.categoria;
            document.getElementById('editar-data').value = gasto.data;
            document.getElementById('editar-valor').value = gasto.valor;

            // Exibe o formulário de edição
            document.getElementById('form-editar').style.display = 'block';
            document.getElementById('form-editar-renda').style.display = 'none';
        })
        .catch(error => console.error('Erro ao carregar gasto:', error));
}


    // Função para cancelar a edição
    document.getElementById('cancelar-edicao').addEventListener('click', () => {
    document.getElementById('form-editar').style.display = 'none';
    });

    
    // Função para salvar as alterações no gasto
    document.getElementById('editar-gasto-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('editar-gasto-id').value;
        const gastoAtualizado = {
            titulo: document.getElementById('editar-titulo').value,
            descricao: document.getElementById('editar-descricao').value,
            categoria: document.getElementById('editar-categoria').value,
            data: document.getElementById('editar-data').value,
            valor: document.getElementById('editar-valor').value
        };

        fetch(`http://localhost:8080/api/gasto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gastoAtualizado)
        })
        .then(response => {
            if (response.ok) {
                alert('Gasto atualizado com sucesso');
                buscarHistoricoGastos(); // Atualiza o histórico de gastos
                document.getElementById('form-editar').style.display = 'none'; // Esconde o formulário
            } else {
                alert('Erro ao atualizar gasto');
            }
        })
        .catch(error => console.error('Erro na requisição de atualização:', error));
    });

    // Função para deletar a renda
function deletarRenda(id) {
    if (confirm('Tem certeza que deseja deletar esta renda?')) {
        fetch(`http://localhost:8080/api/renda/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Renda deletada com sucesso');
                buscarHistoricoRendas(); // Atualiza o histórico de rendas
            } else {
                alert('Erro ao deletar renda');
            }
        })
        .catch(error => console.error('Erro na requisição de deletação:', error));
    }
}

tr.innerHTML = `
    <td>${renda.titulo}</td>
    <td>${renda.descricao}</td>
    <td>${renda.categoria}</td>
    <td>${renda.data}</td>
    <td>${renda.valor}</td>
    <td>
        <button onclick="editarRenda(${renda.id})">Editar</button>
        <button onclick="deletarRenda(${renda.id})">Deletar</button>
    </td>
`;

// Função para deletar o gasto
function deletarGasto(id) {
    if (confirm('Tem certeza que deseja deletar este gasto?')) {
        fetch(`http://localhost:8080/api/gasto/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Gasto deletado com sucesso');
                buscarHistoricoGastos(); // Atualiza o histórico de gastos
            } else {
                alert('Erro ao deletar gasto');
            }
        })
        .catch(error => console.error('Erro na requisição de deletação:', error));
    }
}
tr.innerHTML = `
    <td>${gasto.titulo}</td>
    <td>${gasto.descricao}</td>
    <td>${gasto.categoria}</td>
    <td>${gasto.data}</td>
    <td>${gasto.valor}</td>
    <td>
        <button onclick="editarGasto(${gasto.id})">Editar</button>
        <button onclick="deletarGasto(${gasto.id})">Deletar</button>
    </td>
`;


    function mostrarSecao(secao) {
        // Esconde ambas as seções
        document.getElementById("gastosSection").classList.remove("active");
        document.getElementById("rendaSection").classList.remove("active");
    
        // Mostra apenas a seção escolhida
        document.getElementById(secao).classList.add("active");
    }
    
    // Adiciona evento de clique nos botões do sidebar
    document.getElementById("btnGastos").addEventListener("click", function () {
        mostrarSecao("gastosSection");
    });
    
    document.getElementById("btnRenda").addEventListener("click", function () {
        mostrarSecao("rendaSection");
    });
