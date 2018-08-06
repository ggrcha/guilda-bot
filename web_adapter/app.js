var express=require('express');
var mqtt=require('mqtt');
var app=express();

var topico="/falecom/cordenador";

var cliente = mqtt.connect("mqtt://mqtt" , {port:1883, keepalive:10000 , 
	username: "" , password: ""});

app.get('/', function(req,res) {
	console.log('requisicao recebida. Acessando broker MQTT');
	cliente.publish(topico,"teste de requisicao");
	res.send('teste');
});

cliente.on('connect',function(connack){
	console.log(connack);
	console.log("conectado ao broker mqtt");
	cliente.subscribe(topico);
	console.log("subscrito no tópico: " + topico);
});

cliente.on('error',function(error){
	console.log("erro ao conectar no broker mqtt: " + error);
	process.exit(1);
});	

cliente.on('message', function (topic, message) {
	console.log("mensagem recebida: " + message );
});

process.on('SIGINT', function() {
  console.log('\nSinal de interrupção capturado !!');
  console.log('encerrando ...');
  cliente.end();
  process.exit();
});

var server = app.listen(3000,function() {});