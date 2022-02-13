// @ts-ignore
// const ganache = require("ganache-cli");
const Promise = require("bluebird");
const { readFile } = require("fs");
const { resolve } = require("path");

const ReadFile = Promise.promisify(readFile);

/**
 * Injecting the environment variables manually because the extension
 * vscode-jest has trouble loading the environment vars.
 */
const envPath = resolve(".env");
// const ganachePort = 8545;

module.exports = async function () {
  // const ganacheServer = ganache.server();

  // const loadGanache = new Promise((res) => {
  //   ganacheServer.listen(ganachePort, function (err, blockchain) {
  //     if (err) {
  //       console.error(err);
  //       process.exit(1);
  //     }

  //     console.log(`\n\nGanache is now listening on port: ${ganachePort}\n`);

  //     console.log({ blockchain });
  //     // process.env.blockchain = blockchain;
  //     return res();
  //   });
  //   return;
  // });

  // global.__GANACHE__ = ganacheServer;

  return ReadFile(envPath).then((envContents) => {
    // Take the file contents buffer
    return (
      envContents
        // convert it to a string
        .toString()
        // put each line to an array
        .split("\n")
        // remove the comment only and empty lines from the array
        .filter((line) => line[0] !== "#" || line !== "")
        // iterate over the valid lines
        .forEach((envVarLine) => {
          // separate the name and value components and assign them
          // through deconstruction
          const [variableName, variableValue] = envVarLine.split("=");
          // add the environment variable to the process environment
          process.env[variableName] = variableValue;
        })
    );
  });
  // .then(() => loadGanache);
};
