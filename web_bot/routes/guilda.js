var express = require('express');
var provedorMqtt=require('../mqtt-provider/provedorMqtt'); 
var router = express.Router();

var generateUUID = (function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16)
				.substring(1);
	}
	return function() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4()
				+ s4() + s4();
	};
})();

var topicoOut="/falecom/cordenador";
var whoami=generateUUID();
var topicoIn="/falecom/web/" + whoami;

/* GET requisicao de um BOT. */
router.get('/', function(req, res, next) {

   cliente=provedorMqtt.conectar();

   cliente.on('connect',function(connack){
	   console.log("conectado ao broker mqtt");
       provedorMqtt.assinar(cliente,topicoIn);
	   console.log("subscrito no tópico: " + topicoIn);
       cliente.publish(topicoOut,topicoIn);

       cliente.on('message',function(topic,message){
         console.log("mensagem recebida: " + message );
        });
    });

    res.send("sucesso");

});

module.exports = router;
