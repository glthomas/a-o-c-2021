import winston from "winston";
import chalk from "chalk";

describe("boom", () => {
  it("wow", () => {
    const boom = winston.info("hello world");
    console.log(chalk.green("boom"));
    expect(true).toBeTruthy();
  });
});
