var provedorMqtt=require('./mqtt-provider/provedorMqtt'); 

var topicoIn="/falecom/cordenador";
var topicoOut="/falecom/bot"

cliente=provedorMqtt.conectar();

cliente.on('connect',function(connack){
	console.log(connack);
	console.log("conectado ao broker mqtt");
	cliente.subscribe(topicoIn);
	console.log("subscrito no tópico: " + topicoIn);
});

cliente.on('message',function(topic,message){
	console.log("mensagem recebida: " + message );
	cliente.publish(message,"ID gerado pelo bot");
});	
