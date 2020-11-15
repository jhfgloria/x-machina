const { transition, final } = require("../src/transitions");

describe("Transition", () => {
  it.each`
    transition                | expected
    ${transition("GREEN")}    | ${{ transition: "GREEN" }}
    ${transition("RED")}      | ${{ transition: "RED" }}
    ${transition("YELLOW")}   | ${{ transition: "YELLOW" }}
  `("it returns transition object", ({ transition, expected }) => {
    expect(transition).toEqual(expected);
  });
});

describe("Final", () => {
  it("returns an empty transition object", () => {
    expect(final()).toEqual({});
  });
});
