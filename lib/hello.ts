import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { z } from "zod";
import { formatUserInfo } from "./auth";

// Zod schema for hello message validation
export const helloSchema = {
  name: z
    .string()
    .optional()
    .default("World")
    .describe("The name of the person to greet"),
  style: z
    .enum(["casual", "formal", "enthusiastic"])
    .optional()
    .default("casual")
    .describe("The style of greeting (casual, formal, or enthusiastic)"),
};

// Enhanced hello function with authentication support and greeting styles
export function sayHello(
  { name, style }: { name?: string; style?: "casual" | "formal" | "enthusiastic" },
  extra?: { authInfo?: AuthInfo },
) {
  // Validate and get the name
  const validatedName = name || "World";
  const greetingStyle = style || "casual";

  // Generate greeting based on style
  let greeting: string;
  switch (greetingStyle) {
    case "formal":
      greeting = `Good day, ${validatedName}`;
      break;
    case "enthusiastic":
      greeting = `🎉 Hey there, ${validatedName}! 🌟`;
      break;
    case "casual":
    default:
      greeting = `👋 Hello, ${validatedName}!`;
      break;
  }

  // Add authentication info if available
  const authInfo = extra?.authInfo;
  const userInfo = formatUserInfo(authInfo);

  // Build detailed message with auth context
  let message = greeting;

  if (authInfo) {
    message += `\n\n✅ **Authentication Status:** Verified`;
    message += userInfo;
    message += `\n📋 **Scopes:** ${authInfo.scopes?.join(", ") || "N/A"}`;
    message += `\n🔐 **OAuth 2.1 Compliance:** ${authInfo.extra?.mcpCompliant || "Yes"}`;

    if (authInfo.extra?.provider) {
      message += `\n🌐 **Provider:** ${authInfo.extra.provider}`;
    }

    message += `\n\n💡 This MCP tool is secured with OAuth 2.1 authentication!`;
  } else {
    message += `\n\n⚠️ **Authentication Status:** Development mode (OAuth bypassed)`;
    message += `\n💡 In production, this tool requires OAuth 2.1 authentication.`;
  }

  // Return MCP-compatible result format
  return {
    content: [
      {
        type: "text" as const,
        text: message,
      },
    ],
  };
}

// Tool definition for MCP handler
export const helloTool = {
  name: "say_hello",
  description: "Says hello with OAuth 2.1 authentication. Supports multiple greeting styles (casual, formal, enthusiastic) and shows authenticated user information.",
  inputSchema: helloSchema,
} as const;
