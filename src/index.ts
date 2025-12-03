import readline from "readline";
import { green, blue, yellow } from "colorette";
import ora from "ora";
import { Header } from "./utils/header";
import { gemini } from "./lib/gemini";
import { formatAIResponse } from "./utils/formatAiResponse";

const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const header = await Header();
  console.log(header.title);
  console.log(header.subtitle);
  console.log(header.instructions);

  const ask = (query: string): Promise<string> =>
    new Promise((resolve) => rl.question(query, resolve));

  const ans = await ask(green("> "));

  if (ans === "\x1B") {
    console.log(yellow("\nExiting Craby..."));
    rl.close();
  }

  const spinner = ora("Craby is thinking...").start();
  spinner.color = "cyan";

  try {
    const geminiResponse = await gemini(ans);
    spinner.succeed("Done!");

    if (geminiResponse) {
      console.log(blue(`${formatAIResponse(geminiResponse)}\n`));
    } else {
      console.log(yellow("No response from AI.\n"));
    }
  } catch (error) {
    spinner.fail("Failed to get response.");
    console.error(error);
  }
};

main();
