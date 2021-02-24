require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//rotas
const rotas = require('./src/routes');

//conexão com o mongoDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.log("Erro: "+error.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(express.static(__dirname+'/public'));

server.use('/', rotas);

server.listen(process.env.PORT, () => {
    console.log("Rodando no endereço: "+process.env.PORT);
});