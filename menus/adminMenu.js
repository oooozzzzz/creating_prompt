import { Menu } from "@grammyjs/menu";
import { prompt } from "../prompt.js";

export const adminMenu = new Menu("adminMenu")
	.text("Оповестить пользователей", async (ctx) => {
		ctx.msg.delete();
		await ctx.conversation.enter("notifyUsers");
	})
	.text("Промпт", async (ctx) => {
		ctx
		await ctx.msg.editText(prompt.value)
	})
// .text("Добавить опрос", async (ctx) => {
// 	ctx.msg.delete()
// 	await ctx.conversation.enter("createPoll")
// })
// .row()
// .text("Добавить ссылку на свой магазин", async (ctx) => {
// 	ctx.msg.delete();
// 	await ctx.conversation.enter("setShopUrl");
// });
