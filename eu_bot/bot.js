var provedorMongo=require('./mongo-provider/dbProvider');
var provedorMqtt=require('./mqtt-provider/provedorMqtt');

var topicoOut="/falecom/cordenador";
var topicoIn="/falecom/eubot";

cliente=provedorMqtt.conectar();
var mongo=provedorMongo.getDb();

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

cliente.on('connect',function(connack){
    console.log("conectado ao broker mqtt");
    provedorMqtt.assinar(cliente,topicoIn);
    console.log("subscrito no tópico: " + topicoIn);
 });

 cliente.on('message',function(topic,message){
    console.log("mensagem recebida: " + message + " no topico: " + topic );
    cliente.publish(topicoOut,generateUUID());
});	
