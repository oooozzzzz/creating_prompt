import { Menu, MenuRange } from "@grammyjs/menu";
import { getAnswer } from "../services.js";
import { discountItem, discountsMenu } from "./discountsMenu.js";

export const startMenu = new Menu("startMenu")
	.text(
		(ctx) => "О нас",
		async (ctx) => {
			ctx.reply("О нас")
		}
	)

startMenu.register([discountsMenu, discountItem]);
