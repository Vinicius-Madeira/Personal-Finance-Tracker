// Função para obter as estatísticas e os dados do gráfico
async function carregarEstatisticas() {
    try {
        const estatisticasResponse = await fetch('http://localhost:8080/api/estatistica');
        const estatisticasData = await estatisticasResponse.json();
        
        const graficoResponse = await fetch('http://localhost:8080/api/estatistica/chart');
        const graficoData = await graficoResponse.json();

        // Atualizando as estatísticas na página
        document.getElementById('renda-total').textContent = `R$ ${estatisticasData.renda.toFixed(2)}`;
        document.getElementById('gasto-total').textContent = `R$ ${estatisticasData.gasto.toFixed(2)}`;
        document.getElementById('balanco').textContent = `R$ ${estatisticasData.balanço.toFixed(2)}`;

        // Criando o gráfico com os dados
        const ctx = document.getElementById('grafico').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: graficoData.listaRenda.map(renda => renda.data), // Datas
                datasets: [{
                    label: 'Renda',
                    data: graficoData.listaRenda.map(renda => renda.valor),
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 128, 0, 0.2)',
                    fill: true
                }, {
                    label: 'Gasto',
                    data: graficoData.listaGasto.map(gasto => gasto.valor),
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        labels: graficoData.listaRenda.map(renda => renda.data) // Labels para o eixo X
                    }
                }
            }
        });
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
}

// Carregando as estatísticas quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarEstatisticas);
