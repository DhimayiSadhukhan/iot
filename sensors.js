export class Temp {
  min = 0;
  max = 0;
  tol = 0;
  currentTemp = 0;
  constructor(min, max, tol) {
    this.min = min;
    this.max = max;
    this.tol = tol;
    this.currentTemp = min;
  }
  getTemp() {
    /*console.log(this.min);
    console.log(this.max);
    console.log(this.tol);
    console.log("this.currentTemp=" + this.currentTemp);*/
    this.currentTemp =
      parseFloat(this.currentTemp) +
      parseFloat(1) +
      parseFloat(Math.random() * this.tol);
    if (this.currentTemp > this.max) {
      this.currentTemp =
        parseFloat(this.min) + parseFloat(this.currentTemp - this.max);
    }
    return this.currentTemp;
  }
}
/*myTemp = new Temp();
myTemp.setAttributes(-10, 80, 5);
console.log("Temperatures");
for (var i = 0; i < 100; i++) {
  myTemp.getTemp();
}*/
export class Humidity {
  min = 0;
  max = 0;
  tol = 0;
  currentHum = 0;
  constructor(min, max, tol) {
    this.min = min;
    this.max = max;
    this.tol = tol;
    this.currentHum = min;
  }
  getHum() {
    /*console.log(this.min);
    console.log(this.max);
    console.log(this.tol);
    console.log("this.currentHum=" + this.currentHum);*/
    this.currentHum =
      parseFloat(this.currentHum) +
      parseFloat(1) +
      parseFloat(Math.random() * this.tol);
    if (this.currentHum > this.max) {
      this.currentHum =
        parseFloat(this.min) + parseFloat(this.currentHum - this.max);
    }
    return this.currentHum;
  }
}
/*myHum = new Humidity();
myHum.setAttributes(0, 100, 0.5);
console.log("Humidity");
for (var i = 0; i < 100; i++) {
  myHum.getHum();
}*/
export class Rain {
  rainState = 0;
  getRain() {
    this.rainState = Math.round(Math.random());
    return this.rainState;
  }
}
/*myRain = new Rain();
console.log("Rain");
for (var i = 0; i < 100; i++) {
  myRain.getRain();
}*/
