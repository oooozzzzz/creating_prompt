import { cancelKeyboard } from "../keyboards/cancelKeyboard.js";
import { prompt } from "../prompt.js";

export const changePrompt = async (conversation, ctx) => {
	ctx.reply("Введите новый промпт", {
		reply_markup: cancelKeyboard,
	});

	const curPromptCtx = await conversation.wait();
	const curPrompt = curPromptCtx.message?.text;
	if (!curPrompt) {
		curPromptCtx.msg.delete();
		return await ctx.reply("Вы отменили смену промпта",);
	}
	prompt.changeValue(curPrompt);
	await ctx.reply("Промпт изменен");
}