#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import prompts from "prompts";
import minimist from "minimist";
import { red } from "kolorist";

/**
 * @param {string} dir
 */
function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

/**
 * @param {string} path
 */
function isEmpty(path) {
  const files = fs.readdirSync(path);
  const isEmpty = files.length === 0 ||
    (files.length === 1 && files[0] === ".git");
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

async function init() {
  console.log("Creating a Rust project...");
  const cwd = process.cwd();

  const argv = minimist(process.argv.slice(2));

  // if(!fs.existsSync('package.json')) {
  //   throw new Error(red('✖') + ' package.json not found')
  // }
  let targetDir = argv._[0];
  const defaultProjectName = !targetDir ? "rust-project" : targetDir;

  try {
    result = await prompts(
      [
        {
          name: "projectName",
          type: targetDir ? null : "text",
          message: "Project name:",
          initial: defaultProjectName,
          onState: (
            state,
          ) => (targetDir = String(state.value).trim() || defaultProjectName),
        },
        {
          name: "shouldOverwrite",
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "confirm",
          message: () =>
            (targetDir === "."
              ? "Current directory"
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`,
        },
        {
          name: "overwriteChecker",
          type: (prev, values) => {
            if (values.shouldOverwrite === false) {
              throw new Error(red("✖") + " Operation cancelled");
            }
            return null;
          },
        },
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled");
        },
      },
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    process.exit(1);
  }

  const {
    projectName,
    shouldOverwrite,
  } = result;

  const root = path.join(cwd, targetDir);

  if (fs.existsSync(root) && shouldOverwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }
}

init().catch((e) => {
  console.error(e);
});
