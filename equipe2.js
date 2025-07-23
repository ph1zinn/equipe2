const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
 
let estoques  = []

function menu() {
    console.log('<<<<<<ESTOQUE>>>>>>');
    console.log('1. Adicionar o produto ao estoque');
    console.log('2. Listar produtos do estoque');
    console.log('3. Atualizar quantidade de produtos no estoque');
    console.log('4. Revomer produto do estoque');
    console.log('5. Verificar quantidade baixa de produtos');
    console.log('6. Sair');
    console.log('\n' + '='.repeat(30));

    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                adicionarProduto();
                break;
            case '2':
                ListarProdutosEmEstoque();
                break;
            case '3':
                AtualizarAQuantidadeDoProduto();
                break;
            case '4':
                removerProdutos();
                break;
            case '5':
                verificarFalta();
                break;
            case '6':
                rl.close();
                console.log('Obrigado por usar o programa de Estoque. Até mais!!');
                break;
            default:
                console.log('Opção inválida. Tente novamente.')
                menu()
        }
    })
}

function adicionarProduto () {
rl.question('Digite o nome do produto: ', (nome) => {
    rl.question('Digite categoria do produto, (ex: Elétrodomesticos, calçados, masculino...etc): ', (categoria) => {
        rl.question('Digite a quantidade de produtos: ', (quantidade) => {
            rl.question('Digite o valor do produto: ', (valor) => {
                const estoque = {
                    nome,
                    categoria,
                    quantidade,
                    valor,
                };
                estoques.push(estoque);
                console.log('Seu produto foi adicionado com sucesso!!');
                console.log('Deseja adicionar outro produto?: (s/n)');
      
                rl.question('', (resposta) => {
                    resposta.toLowerCase() === 's'
                        ? adicionarProduto()
                        : menu();
                    });
                });
            });
        });
    });
}

function removerProdutos() {
    if (produtos.length === 0) {

        console.log('Nenhum produto registrado')
        console.log('\nPressione enter para retornar ao menu')
        return rl.question('', mostrarMenu)
}

console.log('\n===PRODUTOS===')
produtos.forEach((produto, index) => {
    console.log('${index + 1}. Produto: ${produto} | Quantidade: ${quantidade} | Preço: ${preco} | id: ${id}')
})

rl.question('\nDigite o número do produto que deseja apagar: ', (num) => {
    const index = parseInt(num, 10) - 1; 

    if (index >= 0 && index < produtos.length) {
      const [removido] = produtos.splice(index, 1);
      console.log(`Produto ${removido.produto} foi removido com sucesso!`);
    } else {
      console.log('Produto inválido!');
    }

    console.log('\nPressione Enter para voltar ao menu...');
    rl.question('', mostrarMenu);
  });
}

function verificarFalta() {
    console.log('Produtos com quantidade baixa: ')

    let produtosFalta = []

    for (let i = 0; i < produtos.length; i++){
        if (produto.quantidade <= 5) {
            produtosFalta.push(produto)
        }
    }
    if (produtosFalta.length === 0) {
        console.log('Nenhum produto está com estoque baixo!')
        console.log('\nPressione enter para retornar ao menu')
        return rl.question('', mostrarMenu)
    } else {
        console.log('\n===BAIXO ESTOQUE===')
        produtosFalta.forEach((produto, index) => {
            console.log('${index + 1}. Produto: ${produto} | Quantidade: ${quantidade} | Preço: ${preco} | id: ${id}')
            console.log('\nPressione enter para retornar ao menu')
            return rl.question('', mostrarMenu)
})
    }
}