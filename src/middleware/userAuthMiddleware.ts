import express = require("express");
import ApiResponseBuilder from "../utils/apiResponseBuilder";
import {UserService} from "../services/userService";
import {UserListDto} from "../entity/userListDto";

const router = express.Router();
const jwt = require("jsonwebtoken");

router.use(async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (typeof authorization === 'undefined' || authorization.length < 1 || !authorization.includes('Bearer')) {
        const response = ApiResponseBuilder.rejectResponse('Auth error', ['Authentication header not found'])
        res.status(401).json(ApiResponseBuilder.decorateResponse(response));
        return;
    }

    const bearer = authorization.split(' ');

    if (typeof bearer[1] === 'undefined') {
        const response = ApiResponseBuilder.rejectResponse('Auth error', ['Authentication header not found'])
        res.status(401).json(ApiResponseBuilder.decorateResponse(response));
        return;
    }

    const bearerToken = bearer[1];

    try {
        const { id } = jwt.verify(bearerToken, process.env.JWT_SECRET);

        const UserServiceInstance = new UserService();
        const dto = await UserServiceInstance.getUserById(id);

        if (!(dto instanceof UserListDto)) {
            const response = ApiResponseBuilder.rejectResponse('Auth error', ['Authentication user not found'])
            res.status(401).json(ApiResponseBuilder.decorateResponse(response));
            return;
        }

        next();
    } catch (e) {
        e.status = 401;
        next(e);
    }
})

export default router;
