document.addEventListener('DOMContentLoaded', function() {
    const produtos = {}; // Dicionário para armazenar produtos e suas informações

    document.getElementById('add').addEventListener('click', function() {
        const nomeProduto = document.getElementById('produto').value.trim().toLowerCase();
        const estoque = parseFloat(document.getElementById('estoque').value);
        const vendas = parseFloat(document.getElementById('vendas').value);
        const dias = parseFloat(document.getElementById('dias').value);

        if (nomeProduto && !isNaN(estoque) && !isNaN(vendas) && !isNaN(dias)) {
            if (produtos[nomeProduto]) {
                produtos[nomeProduto].estoque = estoque;
                produtos[nomeProduto].vendas = vendas;
                produtos[nomeProduto].dias = dias;
            } else {
                produtos[nomeProduto] = { estoque, vendas, dias };
            }
            atualizarListaProdutos();
            limparCampos();
        } else {
            alert('Por favor, preencha todos os campos com valores válidos.');
        }
    });

    document.getElementById('calcular').addEventListener('click', function() {
        const resultadoDiv = document.getElementById('resultado');
        let resultadoTexto = '';

        for (const nome in produtos) {
            const produto = produtos[nome];
            const quantidadeNecessaria = (produto.vendas * produto.dias) - produto.estoque;
            resultadoTexto += `${nome.charAt(0).toUpperCase() + nome.slice(1)}: ${Math.max(0, quantidadeNecessaria).toFixed(2)} kg necessário\n`;
        }

        resultadoDiv.textContent = resultadoTexto || 'Nenhum produto encontrado.';
    });

    function atualizarListaProdutos() {
        const listaDiv = document.getElementById('produtos-list');
        listaDiv.innerHTML = ''; // Limpar a lista atual

        for (const nome in produtos) {
            const produto = produtos[nome];
            const itemDiv = document.createElement('div');
            itemDiv.className = 'produto-item';
            itemDiv.textContent = `${nome.charAt(0).toUpperCase() + nome.slice(1)} - Estoque: ${produto.estoque} kg, Vendas Diárias: ${produto.vendas} kg, Dias de Giro: ${produto.dias}`;
            listaDiv.appendChild(itemDiv);
        }
    }

    function limparCampos() {
        document.getElementById('produto').value = '';
        document.getElementById('estoque').value = '';
        document.getElementById('vendas').value = '';
        document.getElementById('dias').value = '';
    }
});
