//Função responsavel por buscar os pedidos na API e exibir na tela
function listarPedidos(){
    //Busca no HTML o elemento onde a lista sera exibida
    const lista = document.getElementById("lista");

    //Limpa a lista antes de exibir os pedidos 
    lista.innerHTML = "Carregando Pedidos...";

    //faz o requisito GET para API com URL dela publicada (ou local)
    fetch(xxxxxx)
    //Converte a resposta da API para JSON 
    .then(res => res.json())

    //Mostra o resultado da API
    .then(resultado => {
        lista.innerHTML= "";

        //percorre o arry de pedidos recebidos da API
        resultado.dados.forEach(pedidos => {
            //cria um item de lista pra cada pedido
            const item = document.createElement("li");
            item.textContent= `${pedidos.id} - ${pedidos.cliente} |${pedidos.produto} |${pedidos.status}`;

            //adicionando o item dentro da lista no HTML 
            lista.appendChild(item);
        })
        //caso o Front não consiga acessar a API pra trazer os dados
        .catch(() => {
          lista.innerHTML = "Erro ao carregar os pedidos"
        });
    });
};

//Criar pedido (POST) função responsavel por cadastrar um novo pedido 

function cadastarPedido(){
    
    //pegando os valores digitados nos inputs do HTMl e depois o Limpa 
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value; 

    fetch(xxxxxx, {
        
        method: "POST",
        headers: {
            'Content-Type': "application/JSON"
        },
        body: JSON.stringify({
            id: Date.now(), //incluir o id gera um id na hora com a data e dia do pedido
            cliente: cliente,
            produto: produto,
            status: "pendente"
        })
    })
    //converte a resposta da API para JSON
    .then(res => res.json())
    
    //Atualiza assim que o pedido for cadastrado 
    .then(()=>{
        //limpa os inputs assim que for enviado o cadastro
        document.getElementById("cliente").value ="";
        document.getElementById("produto").value ="";

        //Atualiza a lista na tela
        listarPedidos();
    })
   .catch(() =>{
        alert("Erro ao Cadastrar Pedido")
    });
}

//Atualiza os pedidos (PUT) função responsavel por Atualizar os Status de um pedido

function atualizarPedido(){
    //pega o id informado e força a ser um nuemro 
    const id = Number(document.getElementById("idAtualizar").value);
    //pega o novo status do pedido digitado no input
    const status = document.getElementById("statusAtualizar").value;
    //envia uma requisição PUT para API 
    fetch(xxxxxxxx,{
        method: "PUT",
        headers: {
        'Content-Type': "application/JSON"
        },
        // envia o ID e novo status do pedido 
        body: JSON.stringify({
            id: id,
            status: status
        })
    })
    .then(res => res.json())
    .then(()=>{
        //limpa os campo apos o envio
        document.getElementById("idAtualizar").value ="";
        document.getElementById("statusAtualizar").value="";
        //reexibe a lista Atualizada
        listarPedidos();
    })
    .catch(() =>{
        alert("Erro ao Atualizar o Pedido")
    });
}

function removerPedido(){
    const id = number (document.getElementById("idRemover").value);


    facth(xxxxxxxxxx,{
    method: "DELETE",
    headers:{
        'Content-Type': "application/JSON"
        },
        // envia apenas o id do pedido que sera removido 
        body: JSON.stringify({
            id: id
        })
    })
    .then(res => res.json())
    .then(()=>{
    document.getElementById("idRemover").value="";
    listarPedidos();
    })
    .catch(() =>{
        alert("Erro ao Cancelar o Pedido")
    });
};
//chama a função assim que a pagina carrega. Assim os pedidos ja aparecem automaticamente na tela 
listarPedidos();
