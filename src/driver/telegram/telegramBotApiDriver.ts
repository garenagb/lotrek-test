import {TelegramBotApiDriverInterface} from "./telegramBotApiDriverInterface";
const axios = require('axios');
const FormData = require('form-data');

export class TelegramBotApiDriver implements TelegramBotApiDriverInterface {
    private static SEND_MESSAGE_PATH = '/sendMessage';
    private static SEND_PHOTO_PATH = '/sendPhoto';

    private _apiUrl: string;

    constructor() {
        this._apiUrl = `${process.env.TELEGRAM_BOT_API_URL}/bot${process.env.TELEGRAM_BOT_API_TOKEN}`;
    }

    async sendMessage(data: any): Promise<any> {
        const requestData = {
            chat_id: `@${process.env.TELEGRAM_CHANNEL_NAME}`,
            text: data.text
        }

        const response = await axios.post(`${this._apiUrl}${TelegramBotApiDriver.SEND_MESSAGE_PATH}`, requestData)
            .then((res: any) => res)
            .catch((err: any) => err.response);

        return response.data;
    }

    async sendPhoto(data: any): Promise<any> {
        const formData = new FormData();

        formData.append('chat_id', `@${process.env.TELEGRAM_CHANNEL_NAME}`);
        formData.append('photo', data.image);

        const response = await axios.post(
        `${this._apiUrl}${TelegramBotApiDriver.SEND_PHOTO_PATH}`,
            formData,
            {
                headers: formData.getHeaders()
            }
        ).then((res: any) => res).catch((err: any) => err.response);

        return response.data;
    }
}
