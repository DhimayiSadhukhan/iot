import * as mqtt from "mqtt";
var client = mqtt.connect("mqtt://broker.hivemq.com");
client.on("connect", function () {
  client.subscribe("Temperature");
  client.subscribe("Humidity");
  client.subscribe("Rain");
});
client.on("message", function (topic, message) {
  console.log(message.toString());
});
