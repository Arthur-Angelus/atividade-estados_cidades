/********************************************************************
 * Objetivo: Arquivo de funções para gerenciar a API de estados e cidades
 * Data: 17/09/2025
 * Autor: Arthur Angelus Andrade de Almeida
 * Versão: 1.0
 * 
 */

const MESSAGE_ERRO = {
    status: false,
    status_code: 500,
    development: 'Arthur Angelus Andrade de Almeida'
}

const dados = require('./estados_cidades.js')

// Retorna todos os estados
const getAllEstados = () => {
    //variavel de base para criação do cabeçalho
    let message = {
        status: true,
        status_code: 200,
        development: 'Arthur Angelus Andrade de Almeida',
        uf: [],
        quantidade: 0
    }

    //loop
    dados.listaDeEstados.estados.forEach(estado => {
        message.uf.push(estado.sigla)
    })

    //para adicionar um elemento nobo no JSON
    message.quantidade = message.uf.length

    //para remover o atributo do JSON
    //delete message.status

    console.log(message)
    if (message.uf.length > 0)
        return message // Verdadeira 200
    else
        return MESSAGE_ERRO // Falsa 500
}

// Retorna um estado pesquisando pela sigla
const getEstadoBySigla = (sigla) => {

    const estado = dados.listaDeEstados.estados.find(estado => estado.sigla.toUpperCase() === sigla.toUpperCase())

    let message = {
        status: true,
        status_code: 200,
        development: 'Arthur Angelus Andrade de Almeida',
        uf: estado ? [sigla] : [],
        nome: estado ? estado.nome : null,
        quantidade: 0
    }

    message.quantidade = message.uf.length;

    console.log(message)
    if (message.uf.length > 0)
        return message // Verdadeira 200
    else
        return MESSAGE_ERRO // Falsa 500

}

// Retorna a capital referente a um estado pesquisando pela sigla
const getCapitalBySigla = (sigla) => {

   
    const estado = dados.listaDeEstados.estados.find(estado => estado.sigla.toUpperCase() === sigla.toUpperCase())

    let message = {
        status: true,
        status_code: 200,
        development: 'Arthur Angelus Andrade de Almeida',
        uf: estado ? [sigla] : [],
        capital: estado ? estado.capital : null,
        quantidade: 0
    }

    message.quantidade = message.uf.length;

    console.log(message)
    if (message.uf.length > 0)
        return message // Verdadeira 200
    else
        return MESSAGE_ERRO // Falsa 500

}

// Retorna uma lista de estados pesquisando pela região
const getEstadosByRegiao = (regiao) => {

    const estados = dados.listaDeEstados.estados.filter(estado => estado.regiao.toLowerCase() === regiao.toLowerCase());

    let message = {
        status: true,
        status_code: 200,
        development: 'Arthur Angelus Andrade de Almeida',
        uf: [],
        estados: [],
        quantidade: 0
    };

    estados.forEach(estado => {
        message.uf.push(estado.sigla);
        message.estados.push({
            sigla: estado.sigla,
            nome: estado.nome,
            capital: estado.capital,
            regiao: estado.regiao
        });
    });

    message.quantidade = message.uf.length;

    console.log(message);
    if (message.uf.length > 0)
        return message;
    else
        return MESSAGE_ERRO;

}

// Retorna uma lista de estados referente as capitais do país
const getVerifyCapitaisDoPais = () => {

    let message = {
        status: true,
        status_code: 200,
        development: 'Arthur Angelus Andrade de Almeida',
        capitais: [],
        quantidade: 0
    };

    dados.listaDeEstados.estados.forEach(estado => {
        if (estado.capital_pais) { // Verifica se a propriedade capital_pais existe
            message.capitais.push({
                sigla: estado.sigla,
                nome: estado.nome,
                capital_atual: estado.capital_pais.capital, // true para atual, false para histórica
                ano_inicio: estado.capital_pais.ano_inicio,
                ano_fim: estado.capital_pais.ano_fim || 'Atual' // Usa 'Atual' se ano_fim for null ou undefined
            });
        }
    });

    message.quantidade = message.capitais.length;

    console.log(message);
    if (message.capitais.length > 0)
        return message; // Verdadeira 200
    else
        return MESSAGE_ERRO; // Falsa 500

}

// Retorna uma lista de cidades pesquisando pela sigla do estado
const getCidadesBySigla = (sigla) => {

    const estado = dados.listaDeEstados.estados.find(estado => estado.sigla.toUpperCase() === sigla.toUpperCase());

    let message = {
        status: true,
        status_code: 200,
        development: 'Arthur Angelus Andrade de Almeida',
        uf: estado ? [sigla] : [],
        cidades: estado ? estado.cidades : [],
        quantidade: 0
    };

    message.quantidade = message.uf.length;

    console.log(message);
    if (message.uf.length > 0)
        return message;
    else
        return MESSAGE_ERRO;

};

module.exports = {
    getAllEstados,
    getEstadoBySigla,
    getCapitalBySigla,
    getEstadosByRegiao,
    getVerifyCapitaisDoPais,
    getCidadesBySigla
}