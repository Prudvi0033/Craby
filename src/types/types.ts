export interface AI_Response  {
    command: string;
  description: string;
  dangerLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}


export interface Header_Reponse {
    title: String,
    subtitle: String,
    instructions: String
}