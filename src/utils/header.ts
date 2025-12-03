import figlet from "figlet";
import { createColors } from "colorette";
import type { Header_Reponse } from "../types/types";



const { cyanBright, magentaBright, yellowBright, gray } = createColors({
  useColor: true,
});

export const Header = async (): Promise<Header_Reponse> => {
  // Clean + readable FIGlet banner
  const title = cyanBright(
    figlet.textSync("Craby", {
      font: "ANSI Shadow", // cleaner + more readable than ANSI Shadow
      width: 600,
      horizontalLayout: "full",
      verticalLayout: "full",
      whitespaceBreak: true,
    })
  );

  // Subtitle (soft gray + magenta highlight)
  const subText =
    gray(`Smart terminal assistant.\n`) +
    magentaBright(
      `Explain your task, Craby gets the right command and can run it for you.\n`
    );

  // Instructions (yellow so user *definitely* sees them)
  const instructions = yellowBright(
    `> Press ESC to exit Craby.\n` +
      `> Prefix commands with ! (example: !ls) to run actual terminal commands.\n`
  );

  return {
    title: title,
    subtitle: subText,
    instructions: instructions,
  };
};
