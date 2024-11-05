// We use an ephemeral, in-memory chat history for this demo.
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { llm } from "./llm.js";
import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";

const messageHistories = {};

const zodSchema = z.object({
	answer: z
		.string()
		.describe("Твой ответ. В нем не может быть карточки заказа."),

	card: z
		.string()
		.or(z.undefined())
		.or(z.null())
		.optional()
		.describe("Карточка заказа в строковом формате."),
});

export const parser = StructuredOutputParser.fromZodSchema(zodSchema);

const prompt = ChatPromptTemplate.fromMessages([
	["system", `{prompt}\n`],
	["placeholder", "{chat_history}"],
	["human", "{input}"],
]);

const chain = prompt.pipe(llm);
export const memory = new InMemoryChatMessageHistory();

export const withMessageHistory = new RunnableWithMessageHistory({
	runnable: chain,
	getMessageHistory: async (sessionId) => {
		if (messageHistories[sessionId] === undefined) {
			messageHistories[sessionId] = memory;
		}
		return messageHistories[sessionId];
	},
	inputMessagesKey: "input",
	historyMessagesKey: "chat_history",
});
