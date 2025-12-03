// utils/formatter.ts
import { createColors } from "colorette";
import type { AI_Response } from "../types/types";

const { cyanBright, yellowBright, redBright, greenBright, magentaBright, gray } = createColors({ useColor: true });

export const formatAIResponse = (response: AI_Response): string => {
  const { command, description, dangerLevel} = response;

  const dangerColor = (() => {
    switch (dangerLevel) {
      case "LOW": return greenBright(dangerLevel);
      case "MEDIUM": return yellowBright(dangerLevel);
      case "HIGH": return redBright(dangerLevel);
      case "CRITICAL": return redBright(dangerLevel + " ⚠"); // add emoji for emphasis
      default: return dangerLevel;
    }
  })();


  return `
${cyanBright("Command:")} ${command}

${cyanBright("Description:")} ${description}

${cyanBright("Danger Level:")} ${dangerColor}
`;
};
