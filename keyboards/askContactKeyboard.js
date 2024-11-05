import { Keyboard } from "grammy";

export const askContactKeyboard = new Keyboard()
	.requestContact("Поделиться")
	.resized(true)
	.oneTime(true);
