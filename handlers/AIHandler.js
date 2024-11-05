import { getAgentAnswer } from "../agent.js"


export const AIHandler = async (ctx) => {
	console.log(ctx.msg.text);
	// if (ctx.session.toChat) {
	await ctx.api.sendChatAction(ctx.from.id, "typing");
	const thread = ctx.session.thread_id;

	const config = {
		configurable: {
			sessionId: thread,
		},
	};
	const response = await getAgentAnswer(ctx.msg.text, thread)

	console.log(response);
	await ctx.reply(response)
};
