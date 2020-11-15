const createMachine = require("../src/index");
const { transition } = require("../src/transitions");

console.log("Starting the traffic light");

let light = createMachine({
  initialState: "GREEN",
  GREEN: transition("YELLOW"),
  YELLOW: transition("RED"),
  RED: transition("GREEN"),
});

for (i = 0; i < 20; i++) {
  console.log(light.state);
  light = light.transit();
}

console.log("Stopping the traffic light");
