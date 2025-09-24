/*******************************************************************************
 * Objetivo: EndPoints referente a API de estados e cidades
 * Data: 17/09/2025
 * Autor: Arthur Angelus Andrade de Almeida
 * Versão: 1.0
 * 
 * Observações: Instalação do Express, Cors, Body-Parse
 * npm install  express      --save
 * npm install  cors         --save
 * npm install  body-parser  --save
 ******************************************************************************/

// Import das dependencias da API
const express       = require('express') // Responsável pela API
const cors          = require('cors') // Responsável pelas permissões da API (App)
const bodyParser    = require('body-parser') // Responsável por gerenciar a chegada dos dados da API com o Front

//import do arquivo de funções
const dados         = require('./modulo/funcoes.js')

// Retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080

// Criando uma instância de uma classe do express
const app = express()

// Configuração de permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*') // Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET') // Verbos permitidos na API
    // Carrega as configurações no CORS da API
    app.use(cors())
    next() // Próximo, carregar os próximos endpoints
})

//request -> chegada de dados na API
//response -> retorno de dados na API

// ENDPOINTS
app.get('/v1/estados', (request, response) => {
    //pesquisa na função de estados
    let estados = dados.getAllEstados()
    
    //retorna o status code
    response.status(estados.status_code)
    //retorna o JSON
    response.json(estados)
})

app.get('/v1/estado/:uf', function(request, response){
    let sigla = request.params.uf
    console.log(sigla)
})

app.get('/v1/estado/regiao/:id', function(request, response){
    let sigla  = request.query.uf
    let estado = request.query.estado
    let regiao = request.query.regiao
    let id     = request.params.id
    console.log(sigla)
    console.log(estado)
    console.log(regiao)
    console.log(id)
})

app.get('/v1/estado/nome/:uf', (request, response) => {
    let sigla      = request.params.uf;
    let resultado = dados.getEstadoBySigla(sigla);
    
    response.status(resultado.status_code).json(resultado); // Retorna o resultado com o status apropriado
})

app.get('/v1/estado/capital/:uf', (request, response) => {
    let sigla = request.params.uf;
    let resultado = dados.getCapitalBySigla(sigla);

    response.status(resultado.status_code).json(resultado); // Retorna o resultado com o status apropriado
})

app.get('/v1/estados/regiao/:regiao', (request, response) => {
    let regiao = request.params.regiao; // Obtém a região da URL
    let resultado = dados.getEstadosByRegiao(regiao); // Chama a função

    response.status(resultado.status_code).json(resultado); // Retorna o resultado com o status apropriado
});

app.get('/v1/estados/capitais/pais', (request, response) => {
    let resultado = dados.getVerifyCapitaisDoPais(); // Chama a função sem parâmetros

    response.status(resultado.status_code).json(resultado); // Retorna o resultado com o status apropriado
});

app.get('/v1/estado/cidades/:uf', (request, response) => {
    let sigla = request.params.uf;
    let resultado = dados.getCidadesBySigla(sigla);
    
    response.status(resultado.status_code).json(resultado);
});

//start na API
app.listen(PORT, function(){
    console.log('API aguardando requisições....')
})