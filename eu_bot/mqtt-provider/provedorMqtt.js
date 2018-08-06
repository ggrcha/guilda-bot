var mqtt=require('mqtt')

var cliente;

module.exports.conectar = function() {
	cliente = mqtt.connect(process.env.MQTT_BROKER , {port:process.env.MQTT_PORT, keepalive:10000 , 
		username: "" , password: ""});
	return cliente;
}

module.exports.assinar = function(cliente,topico) {
	cliente.subscribe(topico);
}
