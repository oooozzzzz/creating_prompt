import { createUser } from "../db.js";
import { askContactKeyboard } from "../keyboards/askContactKeyboard.js";
import { startMenu } from "../menus/startMenu.js";
import { newThread } from "../services.js";

export const startHandler = async (ctx) => {
	// await ctx.msg.delete();
	// newThread(ctx)
	// if (ctx.session.toChat) {
	// 	await ctx.reply("Хорошо, отменяем заказ. Если будут какие-то вопросы, обязательно задавайте!")
	// }
	// ctx.session.toChat = false
	const phone = ctx.msg?.contact?.phone_number;
	if (phone) {
		await createUser({ tg_id: ctx.from.id, name: ctx.from.first_name, phone });
		await ctx.reply("Добро пожаловать!", {
			reply_markup: { remove_keyboard: true },
		});
	}
	// console.log(ctx.session);
	await ctx.reply(ctx.t("start"), { reply_markup: startMenu });
	// ctx.reply("Пожалуйста, нажмите кнопку <b>отправить</b> внизу", {
	// 	reply_markup: askContactKeyboard,
	// });
};
