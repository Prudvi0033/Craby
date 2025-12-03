import readline from "readline";
import { createColors, green } from "colorette";
import ora from "ora";
import { Header } from "../utils/header";
import { gemini } from "../utils/gemini";

const { blue } = createColors({ useColor: true });

const main = async () => {
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const header = await Header();

  console.log(header.title);
  console.log(header.subtitle);
  console.log(header.instructions);

  prompt.question(`${green("> ")}`, async (ans) => {
    const spinner = ora("Craby is thinking...").start();
    spinner.color = "cyan";
    try {
      const geminiResponse = await gemini(ans);
      console.log(blue(`${geminiResponse}`));
    } catch (error) {
      spinner.fail("Failed to get response.");
      console.error(error);
    } finally {
      prompt.close();
    }
  });
};

main();
