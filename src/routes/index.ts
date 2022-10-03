import express = require("express");
import formidable = require('formidable');
import {NextFunction} from "express";
import {AuthController} from "../controller/authController";
import {MessageController} from "../controller/messageController";
import userAuthMiddleware from "../middleware/userAuthMiddleware";
import {ValidatorSendMessage} from "./validation/validatorSendMessage";
import ApiResponseBuilder from "../utils/apiResponseBuilder";
import {ValidatorSignin} from "./validation/validatorSignin";
import {ValidatorSignup} from "./validation/validatorSignup";

const router = express.Router();

router.post("/auth/signup", async (req: any, res: any, next: NextFunction) => {
    try {
        const validator = new ValidatorSignup(req.body);
        const validatorResponse = await validator.validate();

        if (!validatorResponse.is_valid) {
            const response = ApiResponseBuilder.rejectResponse('Validation Error', validatorResponse.errors)
            res.status(401).json(ApiResponseBuilder.decorateResponse(response));
            return;
        }

        const controller = new AuthController();
        return await controller.registerUser(req, res);
    } catch (e) {
        next(e);
    }
});

router.post("/auth/signin", async (req: any, res: any, next: NextFunction) => {
    try {
        const validator = new ValidatorSignin(req.body);
        const validatorResponse = await validator.validate();

        if (!validatorResponse.is_valid) {
            const response = ApiResponseBuilder.rejectResponse('Validation Error', validatorResponse.errors)
            res.status(401).json(ApiResponseBuilder.decorateResponse(response));
            return;
        }

        const controller = new AuthController();
        return await controller.loginUser(req, res);
    } catch (e) {
        next(e);
    }
});

router.post("/telegram/send_message", [userAuthMiddleware], async (req: any, res: any, next: NextFunction) => {
    try {
        if (req.headers['content-type'].includes('multipart/form-data')) {
            const form = formidable({ multiples: true });

            form.parse(req, async (err: any, fields: any, files: any) => {
                if (err) {
                    next(err);
                    return;
                }

                req.body = { text: fields.text, image: files.image };
                const validator = new ValidatorSendMessage(req.body);
                const validatorResponse = await validator.validate();

                if (!validatorResponse.is_valid) {
                    const response = ApiResponseBuilder.rejectResponse('Validation Error', validatorResponse.errors)
                    res.status(401).json(ApiResponseBuilder.decorateResponse(response));
                    return;
                }

                const controller = new MessageController();
                return await controller.sendContent(req, res);
            });
        } else {
            const validator = new ValidatorSendMessage(req.body);
            const validatorResponse = await validator.validate();

            if (!validatorResponse.is_valid) {
                const response = ApiResponseBuilder.rejectResponse('Validation Error', validatorResponse.errors)
                res.status(401).json(ApiResponseBuilder.decorateResponse(response));
                return;
            }

            const controller = new MessageController();
            return await controller.sendContent(req, res);
        }
    } catch (e) {
        next(e);
    }
});

export default router;
