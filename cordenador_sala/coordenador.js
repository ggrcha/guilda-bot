var provedorMongo=require('./mongo-provider/dbProvider');
var provedorMqtt=require('./mqtt-provider/provedorMqtt'); 

var topicoIn="/falecom/cordenador";
var topicoOut="/falecom/bot"

var cliente=provedorMqtt.conectar();
var mongo=provedorMongo.getDb();

cliente.on('connect',function(connack){
	console.log(connack);
	console.log("conectado ao broker mqtt");
	cliente.subscribe(topicoIn);
	console.log("subscrito no tópico: " + topicoIn);
});

cliente.on('message',function(topic,message){
	console.log("coordenador: mensagem recebida: " + message );
	messageObj=JSON.parse(message);
	mongo.collection('usuarios').insertOne(messageObj, function(err,resultado){
		(err == null) ? console.log('salvo') : console.log(err)
	});
	cliente.publish("/falecom/" + messageObj.id,"bot de teste");
	console.log("publicada mensagem para: /falecom/" + messageObj.id);
});	

