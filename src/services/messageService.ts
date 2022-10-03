import {TelegramBotApiDriverInterface} from "../driver/telegram/telegramBotApiDriverInterface";
import {TelegramBotApiDriver} from "../driver/telegram/telegramBotApiDriver";
import ApiResponseBuilder from "../utils/apiResponseBuilder";
import * as fs from "fs";

export class MessageService {
    private telegramBotApiDriver: TelegramBotApiDriverInterface;

    constructor() {
        this.telegramBotApiDriver = new TelegramBotApiDriver();
    }

    public sendContent = async (text: string, image: any) => {
        if (typeof text !== 'undefined' && text.length > 0) {
            const resultText = await this.telegramBotApiDriver.sendMessage({text});

            if (typeof resultText.ok === 'undefined' || !resultText.ok) {
                return ApiResponseBuilder.rejectResponse('Error sending telegram message', [resultText.description]);
            }
        }

        if (typeof image !== 'undefined' && typeof image.filepath !== 'undefined') {
            const path = image.filepath;
            const imageStream = fs.createReadStream(path);

            const resultImage = await this.telegramBotApiDriver.sendPhoto({image: imageStream});

            if (typeof resultImage.ok === 'undefined' || !resultImage.ok) {
                return ApiResponseBuilder.rejectResponse('Error sending telegram message', [resultImage.description]);
            }
        }

        return ApiResponseBuilder.approveResponse({ result: "Message successfully sent" });
    }
}
