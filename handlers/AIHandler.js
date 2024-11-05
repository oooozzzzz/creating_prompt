import { StringOutputParser } from "@langchain/core/output_parsers";
import { parser, withMessageHistory } from "../chain.js";
import { Changable } from "../classes.js";
import { toMainMenuKeyboard } from "../keyboards/toMainMenuKeyboard.js";
import { prompt } from "../prompt.js";
// import { loader } from "../loaders.js";
import { getAnswer, newThread } from "../services.js";
import { v4 as uuidv4 } from "uuid";
import { getAgentAnswer } from "../agent.js"


const handleOrder = async (ctx, order) => {
	console.log(order);
	const foodInfo = order.menuItems
		.map((item) => {
			return `${item.name}: ${item.amount} шт.\n`;
		})
		.join("");
	const allergyInfo = `${
		order.hasAllergy
			? "Аллергия на: " + `${order.allergy.join(", ")}`
			: "Аллергии нет"
	}
	`;
	const text = `Заказ:
${foodInfo}
${allergyInfo}
Время забора: ${order.timeToPickUpTheOrder}
Номер телефона: ${order.phoneNumber}
Способ оплаты: ${order.paymentMethod}
Количество столовых приборов: ${order.cutlery}
`;
	newThread(ctx);
	console.log(text);
	await ctx.api.sendMessage(762569950, text);
	await ctx.reply(
		`Сумма к оплате с учетом скидки 15% составит ${
			order.sum * 0.85
		} рублей. Ждем Вас в ресторане Марико!`,
		{
			reply_markup: toMainMenuKeyboard(),
		}
	);
};

export const AIHandler = async (ctx) => {
	console.log(ctx.msg.text);
	// if (ctx.session.toChat) {
	await ctx.api.sendChatAction(ctx.from.id, "typing");
	const thread = ctx.session.thread_id;

	// 	const { answer, order, photo } = await getAnswer(ctx.msg.text, thread);
	// 	console.log(answer);
	// 	console.log(photo);
	// 	if (photo) {
	// 		await ctx.replyWithPhoto(photo, { caption: answer });
	// 	} else {
	// 		await ctx.reply(answer);
	// 	}
	// 	order?.isCompleted ? await handleOrder(ctx, order) : null;
	// }
	const config = {
		configurable: {
			sessionId: thread,
		},
	};

	// const prompt = `Представь, что ты племяница Марико.
	// В начале нашего разговора представься.
	// Твоя задача: собрать информацию о моем заказе. Узнай всю информацию о заказе: количество порций, которые я хочу заказать, наличие аллергии, время забора, номер телефона, способ оплаты, на какое количество персон положить столовые приборы.  Не формируй карточку заказа до тех пор, пока я не скажу тебе все эти данные.
	// В твоих ответах должна содержаться информация. Твой ответ никогда не должен содержать <br>. В твоем ответе не должно содержаться больше одного вопроса. Никогда не используй символ <br>.
	// Если ты хочешь форматировать текст своего ответа, делай это только при помощи тегов <b></b> и <i></i>. Например: <b>текст</b> никакие другие HTML теги и способы форматирования текста использовать нельзя.
	// Карточка заказа это вся информация о моем заказе, которую ты узнал от меня.
	// После того, как ты выяснишь все детали моего заказа, уточни у меня все ли правильно, выводи построчно. Только после того, как я соглашусь, отправь мне карточку заказа. Представь, что внутри твоего ответа два отдельных сообщения - в одном ты говоришь "Спасибо за заказ!", а во втором отправляешь мне карточку моего заказа.`

// console.log(prompt.value)

	// const response = await withMessageHistory.invoke(
	// 	{
	// 		input: ctx.msg.text,
	// 		prompt: prompt.value,
	// 	},
	// 	config
	// );

	const response = await getAgentAnswer(ctx.msg.text, thread)

	console.log(response);
	await ctx.reply(response)
	return
	// const output = await new StringOutputParser().invoke(response);
	// console.log(output);
	// await ctx.reply(output);
};
