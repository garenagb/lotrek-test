import {Request, Response} from "express";
import {UserService} from "../services/userService";
import ApiResponseBuilder from "../utils/apiResponseBuilder";

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public loginUser = async (req: Request, res: Response) => {
        const {username, password} = req.body;

        const result = await this.userService.login(username, password);
        const json = ApiResponseBuilder.decorateResponse(result);

        return res.status(result.status).json(json);
    }

    public registerUser = async (req: Request, res: Response) => {
        const {username, password} = req.body;

        const result = await this.userService.register(username, password);
        const json = ApiResponseBuilder.decorateResponse(result);

        return res.status(result.status).json(json);
    }
}
