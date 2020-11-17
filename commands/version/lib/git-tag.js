"use strict";

const log = require("npmlog");
const childProcess = require("@lerna/child-process");

module.exports = gitTag;

function gitTag(tag, { forceGitTag, signGitTag }, opts, command = "git tag %s -m %s") {
  log.silly("gitTag", tag, command);

  const [cmd, ...args] = command.split(" ");

  const interpolatedArgs = args.map(arg => arg.replace(/%s/, tag));

  if (forceGitTag) {
    interpolatedArgs.push("--force");
  }

  if (signGitTag) {
    interpolatedArgs.push("--sign");
  }

  log.verbose(cmd, interpolatedArgs);
  return childProcess.exec(cmd, interpolatedArgs, opts);
}
