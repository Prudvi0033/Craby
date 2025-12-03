import { GoogleGenAI } from "@google/genai";
import type { AI_Response } from "../types/types";

const ai = new GoogleGenAI({});

const SYSTEM_PROMPT = `You are an expert terminal command assistant for file system operations.

## Output Format:
Respond ONLY with valid JSON:
{
  "command": "the exact command to execute",
  "description": "brief description (one sentence max)",
  "dangerLevel": "LOW|MEDIUM|HIGH|CRITICAL"
}

## Danger Level Guidelines:
- LOW: Safe read-only operations (listing, searching, reading files)
- MEDIUM: Reversible modifications (copying, renaming files in user directories)
- HIGH: File deletion from user directories or system-related modifications
- CRITICAL: System file deletion, recursive deletion on system directories, or operations that damage system integrity

## Safety Rules (CRITICAL - DO NOT BYPASS):
1. NEVER generate commands that:
   - Delete files from /bin, /sbin, /usr, /etc, /sys, /proc, /lib, /root, /boot directories
   - Use 'sudo rm -rf' on system directories
   - Modify system configuration files without explicit user override
   - Perform recursive deletion on system partitions

2. For critical operations, set dangerLevel to CRITICAL and do not generate the command

3. Always use the most specific paths to avoid accidental system file modifications

## System Context:
- Current OS: ${process.platform}
- Working Directory: ${process.cwd()}
- User: Standard user (not root)`;

export const gemini = async (userPrompt: string): Promise<AI_Response | null> => {
  try {
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Request: ${userPrompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    const text = response.text;
    if (!text) return null;

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in response");
      return null;
    }

    const result = JSON.parse(jsonMatch[0]);
    
    return {
      command: result.command,
      description: result.description,
      dangerLevel: result.dangerLevel,
    };
  } catch (error) {
    console.error("Error in gemini:", error);
    return null;
  }
};