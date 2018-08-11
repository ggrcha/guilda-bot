var express = require('express');
var provedorMqtt=require('../mqtt-provider/provedorMqtt'); 
var request = require('request');
var router = express.Router();

var topicoOut="/falecom/cordenador";

/* GET requisicao de um BOT. */
router.get('/', function(req, res, next) {

   cliente=provedorMqtt.conectar();

   cliente.on('connect',function(connack){
	   console.log("conectado ao broker mqtt");
	   res.render("guilda")
	});
});

router.post('/',function(req,res,next){

	console.log("mensagem recebida: " + req.body.mensagem);
	console.log("mensagem recebida: " + req.body.userID);
})

module.exports = router;
