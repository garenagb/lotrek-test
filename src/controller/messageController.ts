import {Request, Response} from "express";
import {MessageService} from "../services/messageService";
import ApiResponseBuilder from "../utils/apiResponseBuilder";

export class MessageController {
    private messageService: MessageService;

    constructor() {
        this.messageService = new MessageService();
    }

    public sendContent = async (req: Request, res: Response) => {
        const {text, image} = req.body;

        const result = await this.messageService.sendContent(text, image);
        const json = ApiResponseBuilder.decorateResponse(result);

        return res.status(result.status).json(json);
    }
}
