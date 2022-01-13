import { Temp, Humidity, Rain } from "./sensors.js";
import { plot } from "nodeplotlib";
import { interval, map } from "rxjs";
import * as mqtt from "mqtt";
/*global.min_temp;
global.max_temp;
global.temp_tol;
global.min_hum;
global.max_hum;
global.hum_tol;*/
import express from "express";
import path from "path";
const app = express();
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
app.get("/", function (req, res) {
  res.sendFile(path.resolve() + "/index.html");
});
app.use(express.urlencoded());
app.post("/", function (req, res) {
  var min_temp = req.body.min_temp;
  var max_temp = req.body.max_temp;
  var temp_tol = req.body.temp_tol;
  var min_hum = req.body.min_hum;
  var max_hum = req.body.max_hum;
  var hum_tol = req.body.hum_tol;
  var freq = req.body.freq;
  var duration = req.body.duration;
  var myTemp = new Temp(min_temp, max_temp, temp_tol);
  //console.log("Temperatures");

  var myHum = new Humidity(min_hum, max_hum, hum_tol);
  //console.log("Humidity");

  var myRain = new Rain();
  //console.log("Rain");

  res.sendFile(path.resolve() + "/index.html");

  var temp_data = [],
    hum_data = [],
    rain_data = [];
  for (var i = 0; i < duration / freq; i++) {
    temp_data.push(myTemp.getTemp());
    hum_data.push(myHum.getHum());
    rain_data.push(myRain.getRain());
  }
  //console.log(temp_data);
  const trace1 = [
    {
      y: temp_data,
      type: "bar",
      name: "Temperature",
    },
  ];
  plot(trace1);
  const trace2 = [
    {
      y: hum_data,
      type: "bar",
      name: "Humidity",
    },
  ];
  plot(trace2);
  const trace3 = [
    {
      y: rain_data,
      type: "bar",
      name: "Rain",
    },
  ];
  plot(trace3);

  var client = mqtt.connect("mqtt://broker.hivemq.com");
  client.on("connect", function () {
    for (var i = 0; i < duration / freq; i++) {
      task(i);
    }
    function task(i) {
      setTimeout(function () {
        console.log(temp_data[i]);
        console.log(hum_data[i]);
        console.log(rain_data[i]);
        client.publish(
          "Temperature",
          "Temperature is " + temp_data[i].toString()
        );
        client.publish("Humidity", "Humidity is " + hum_data[i].toString());
        client.publish("Rain", "Rain is " + rain_data[i].toString());
      }, freq * i);
    }
  });
});
