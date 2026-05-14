//Primeiro passo: criação do servidor
//segundo passo: exibir rota e metodo requirido  
//terceiro passo: incorporação do metodo GET 
//Quarto Passo: Atribuindo Metodo posto 

//Importando o mudulo http nativo no node.js
const http = require('http')
//importando o modulo URL nativo do node.js 
const url = require('url')


//simulando um banco de dados com um arry de objetos JavaScript 
let pedidos = [
{
    id: 1,
    cliente: "Matheus",
    produto: "teclado",
    status: "pendente"
}
]


//criação do servidor "server"
const server = http.createServer((req, res) => {
   //definindo a resposta do servidor como uma aplicação JSON
    res.setHeader('Content-taype', 'aplication/JSON');
    
    //leitura da url
    const urlCompleta = url.parse(req.url, true );

    //recebendo os dados da rota e metodo atravez da URL 
    const rota= urlCompleta.pathname;
    const metodo = req.method;

    res.setHeader("Axxess-Control-Allow-origin", "*");
    res.setHeader("Axxess-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Axxess-Control-Allow-Headers", "Content-Type");

    if(metodo === "OPTIONS "){
        res.statusCode = 204;
        res.end();
        return;
    }

    



    if(rota === "/pedidos" && metodo === "GET"){
        //Resposta que vai ser exibida ao usuario
        res.end(JSON.stringify({
            mensagem: 'lista de Pedidos',
            dados: pedidos
        }));
        return;
    };

    //Criação do metodo POST

    if (rota === "/pedidos"&& metodo === "POST"){
        let body =''

        req.on('data', parte => {

            body += parte;
        });

        req.on('end', () =>{
            const novoPedido =JSON.parse(body);
        
            pedidos.push(novoPedido);

            res.statusCode = 201;
            res.end(JSON.stringify({
                mensagem: "Pedido cadastrado com sucesso",
                pedido: novoPedido,
            }));
        });
        return;


    };

    //criando o metodo PUT 
     if (rota === "/pedidos" && metodo === "PUT") {
        let body = ''; // Variavel que armazena os pedaços da requisição
        // Ação que será disparada com a requisiçaõ para armazenar as partes da requisição dentro da variável body
 
        req.on('data', parte => {
            body += parte;
        });
 
        req.on('end', () => {
            // A variavel dados receberá a tradução do body em objeto Javascript
            const dados = JSON.parse(body);
            let encontrado = false; // facilitará o servidor a encontrar o id correspondente
 
            // pedidos esta recebendo o mapeamento do array pedidos
            // pedido (no singular) = cada objeto do array
            pedidos = pedidos.map(pedido => {
                // Comparação de ID para ser possivel substituir
                if (pedido.id === dados.id) {
                    encontrado = true; // Quando localizado, vira true
                    // Retronara todos os dados de pedidos que não foram alterados + status de cada um deles
 
                    return {
                        ...pedido,
                        status: dados.status
                    };
                };
                return pedido;
            });
            if(!encontrado){
                res.statusCode =400;
                res.end(JSON.stringify({mensagem: "pedido não encontrado"}));
                return;
            };

            res.end(JSON.stringify({
                mensagem: "pedido atualizado com sucesso",
                dados: pedidos 
            }));
        });
        return;
    };
    
    // Criação do método DELETE
    if(rota === "/pedidos" && metodo === "DELETE") {
        let body = ''; // variável que armazena os pedaços da requisição
        // ação que será disparada com a requisição para armazenar as partes da requisição dentro da variável body
        req.on('data', parte => {
            body += parte;
        });
 
        req.on('end', () => {
            // dados receberá o body traduzido para objeto em JavaScript
            const dados = JSON.parse(body);
 
            // Medirá o tamanho do array antes de o deletar-mos
            const tamanhoAntes = pedidos.length;
 
            // Manterá todos os pedidos que NÃO tem o id informado e removerá os que tem o ID igual ao enviado pela requisição.
            pedidos = pedidos.filter(pedido => pedido.id !== dados.id);
 
            // Fará a comparação de tamanho do array, se os tamanhos estiverem identidos, o pedido não foi localizado para que seja apagado.
            if(pedidos.length === tamanhoAntes) {
                res.statusCode = 404;
                res.end(JSON.stringify({ mensagem: "Pedido não encontrado"}));
                return;
            };
 
            // Reposta final que exibe o pedido removido com sucesso e exibe o array atualizado
            res.end(JSON.stringify({
                mensagem: "Pedido removido",
                dados: pedidos
            }));
        });
        return;
    };


    res.statusCode = 404;
    res.end(JSON.stringify({
        mensagem: 'pagina não encontrada'
    }));
});

const PORT = process.env.PORT || 3000;


//Definição da porta onde o servidor rodará 
server.listen(3000,() =>{
    console.log(`Servidor esta rodando na porta ${PORT}`);
});
