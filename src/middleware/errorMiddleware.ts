import { NextFunction, Request, Response } from 'express';
import HttpException from "../exception/httpException";
import ApiResponseBuilder from "../utils/apiResponseBuilder";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const errorResponse = ApiResponseBuilder.rejectResponse('System Error', [error.message])
    const json = ApiResponseBuilder.decorateResponse(errorResponse);

    response.status(status).json(json);
}

export default errorMiddleware;
