const createMachine = require("../src/index");
const { transition, final } = require("../src/transitions");

console.log("Starting request");

let request = createMachine({
  initialState: "NOT_REQUESTED",
  NOT_REQUESTED: transition("LOADING"),
  LOADING: transition("SUCCESS"),
  SUCCESS: final(),
});

while (!request.finished) {
  console.log(request.state);
  request = request.transit();
}

console.log(request.state);

console.log("Stopping the traffic light");
