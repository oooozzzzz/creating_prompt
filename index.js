import { amoCRM } from "./axiosClient.js";
import { bot } from "./bot.js";
import { memory } from "./chain.js";
import { getAdminPassword, getOwnerPassword } from "./db.js";
import { adminHandler } from "./handlers/adminHandler.js";
import { AIHandler } from "./handlers/AIHandler.js";
import { ownerHandler } from "./handlers/ownerHandler.js";
import { startHandler } from "./handlers/startHandler.js";
import { askContactKeyboard } from "./keyboards/askContactKeyboard.js";
import { startMenu } from "./menus/startMenu.js";
import { prompt } from "./prompt.js";
import { toAdminMenu, toMainMenu, toOwnerMenu } from "./routes.js";
import { clearMessageHistory, newThread, toPref } from "./services.js";

bot.command("start", async (ctx) => {
	await ctx.msg.delete();
	// const response = await amoCRM.get("leads/pipelines/8782574");
	// try {
	// 	const post_response = await amoCRM.post("leads", [
	// 		{
	// 			name: "Петрович гей",
	// 			price: 10,
	// 			pipeline_id: 8782574,
	// 		},
	// 	]);
	// } catch (error) {
	// 	console.log(error.response.data["validation-errors"][0].errors);
	// }
	// console.log(post_response.data)
	// const data = response.data;
	// console.log(data._embedded.leads[0].custom_fields_values[0].values[0].value)
	// console.log(data._embedded);
	// console.log(ctx.match)
	// if (!ctx.session.hasPhoneNumber) {
	// 	await ctx.reply("Приветственное слово, описание");
	// 	await ctx.reply("Пожалуйста, нажмите кнопку <b>отправить</b> внизу", {
	// 		reply_markup: askContactKeyboard,
	// 	});
	// } else {
	await startHandler(ctx);
	// }
});
bot.command("chatid", async (ctx) => {
	await ctx.reply(ctx.chat.id);
});
bot.command("set_prompt", async (ctx) => {
	await ctx.msg.delete();
	await clearMessageHistory(ctx.session.thread_id)
	newThread(ctx)
	await ctx.conversation.enter('changePrompt')
});
bot.command("prompt", async (ctx) => {
	await ctx.msg.delete();
	await ctx.reply(prompt.value)
});
bot.command("clear", async (ctx) => {
	await ctx.msg.delete();
	await clearMessageHistory(ctx.session.thread_id)
	newThread(ctx)
	await ctx.reply("История очищена")
});

bot.on(":contact", async (ctx) => {
	ctx.session.hasPhoneNumber = true;
	await startHandler(ctx);
});

bot.callbackQuery("toMenu", async (ctx) => {
	toMainMenu(ctx);
	ctx.answerCallbackQuery();
});

bot.callbackQuery("toAdminMenu", async (ctx) => {
	toAdminMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("toOwnerMenu", async (ctx) => {
	toOwnerMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("ok", async (ctx) => {
	ctx.answerCallbackQuery();
});
bot.callbackQuery("cancel", async (ctx) => {
	try {
		ctx.msg.delete();
	} catch (error) {}
	ctx.conversation.exit();
	ctx.answerCallbackQuery();
});



bot.on(":text", async (ctx) => {
	const text = ctx.msg.text;
	switch (text) {
		// case await getAdminPassword():
		// 	await adminHandler(ctx);
		// 	break;
		// case await getOwnerPassword():
		// 	await ownerHandler(ctx);
		// 	break;
		default:
			await AIHandler(ctx);
			break;
	}
});

bot.on(":file", async (ctx) => {

});

bot.callbackQuery(/-/, async (ctx) => {
	// Взаимодействие с категориями

	const { preference, action } = toPref(ctx);
	switch (action) {
		default:
			break;
	}
	ctx.answerCallbackQuery();
});

bot.catch((error) => {
	console.error(error);
	bot.start();
});
bot.start();
