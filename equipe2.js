const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let estoques = []; 

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
                console.log('Opção inválida. Tente novamente.');
                menu();
        }
    });
}

function adicionarProduto() {
    rl.question('Digite o nome do produto: ', (nome) => {
        rl.question('Digite categoria do produto, (ex: Elétrodomesticos, calçados, masculino...etc): ', (categoria) => {
            rl.question('Digite a quantidade de produtos: ', (quantidade) => {
                if (quantidade <= 0 || isNaN(quantidade)) {
                    console.log('Quantidade inválida!!');
                    return adicionarProduto();
                }
                rl.question('Digite o valor do produto: R$:', (valor) => {
                    const estoque = {
                        nome,
                        categoria,
                        quantidade: parseInt(quantidade),
                        valor: parseFloat(valor),
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


function ListarProdutosEmEstoque() {
    if (estoques.length === 0) { 
        console.log('Nenhum produto registrado no estoque.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu);
    }

    console.log('\n=== PRODUTOS EM ESTOQUE ===');
    estoques.forEach((produto, index) => {
        console.log(`${index + 1}. Nome: ${produto.nome} | Categoria: ${produto.categoria} | Quantidade: ${produto.quantidade} | Valor: R$ ${produto.valor.toFixed(2)}`);
    });

    console.log('\nPressione Enter para retornar ao menu...');
    rl.question('', menu);
}


function AtualizarAQuantidadeDoProduto() {
    if (estoques.length === 0) { 
        console.log('Nenhum produto registrado no estoque para atualizar.');
        console.log('\nPressione Enter para retornar ao menu...');
        return rl.question('', menu);
    }

    console.log('\n=== ATUALIZAR QUANTIDADE ===');
    estoques.forEach((produto, index) => {
        console.log(`${index + 1}. Nome: ${produto.nome} | Quantidade Atual: ${produto.quantidade}`);
    });

    rl.question('Digite o número do produto que deseja atualizar: ', (num) => {
        const index = parseInt(num, 10) - 1;

        if (index >= 0 && index < estoques.length) {
            rl.question('Digite a nova quantidade: ', (novaQuantidade) => {
                estoques[index].quantidade = parseInt(novaQuantidade); 
                console.log(`Quantidade de ${estoques[index].nome} atualizada para ${estoques[index].quantidade}.`);
                console.log('\nPressione Enter para retornar ao menu...');
                rl.question('', menu);
            });
        } else {
            console.log('Número de produto inválido!');
            console.log('\nPressione Enter para retornar ao menu...');
            rl.question('', menu);
        }
    });
}


function removerProdutos() {

    if (estoques.length === 0) {
        console.log('Nenhum produto registrado');
        console.log('\nPressione enter para retornar ao menu');
        return rl.question('', menu);
    }

    console.log('\n===PRODUTOS===');

    estoques.forEach((produto, index) => {
        console.log(`${index + 1}. Produto: ${produto.nome} | Quantidade: ${produto.quantidade} | Valor: R$ ${produto.valor.toFixed(2)} | Categoria: ${produto.categoria}`);
    });

    rl.question('\nDigite o número do produto que deseja apagar: ', (num) => {
        const index = parseInt(num, 10) - 1;

        if (index >= 0 && index < estoques.length) {
            const [removido] = estoques.splice(index, 1);
            console.log(`Produto ${removido.nome} foi removido com sucesso!`);
        } else {
            console.log('Produto inválido!');
        }

        console.log('\nPressione Enter para voltar ao menu...');
        rl.question('', menu);
    });
}

function verificarFalta() {
    console.log('Produtos com quantidade baixa: ');

    let produtosFalta = [];

    for (let i = 0; i < estoques.length; i++) {
        if (estoques[i].quantidade <= 5) {
            produtosFalta.push(estoques[i]);
        }
    }

    if (produtosFalta.length === 0) {
        console.log('Nenhum produto está com estoque baixo!');
        console.log('\nPressione enter para retornar ao menu');
        return rl.question('', menu);
    } else {
        console.log('\n===BAIXO ESTOQUE===');
        produtosFalta.forEach((produto, index) => {
            console.log(`${index + 1}. Produto: ${produto.nome} | Quantidade: ${produto.quantidade} | Valor: R$ ${produto.valor.toFixed(2)} | Categoria: ${produto.categoria}`);
        });
        console.log('\nPressione enter para retornar ao menu');
        return rl.question('', menu);
    }
}

menu();