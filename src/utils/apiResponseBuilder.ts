import ApiResponse from "./apiResponse";

export default class ApiResponseBuilder {
    public static approveResponse(data: object) {
        const response = new ApiResponse();
        response.status = 200;
        response.data = data;
        response.errors = [];
        return response;
    }

    public static rejectResponse(data: string, errors: any[]) {
        const response = new ApiResponse();
        response.status = 400;
        response.data = data;
        response.errors = errors;
        return response;
    }

    public static decorateResponse(apiResponse: ApiResponse) {
        if (apiResponse.status === 200) {
            return apiResponse.data;
        }

        const decoratedResponse = {
            result: apiResponse.data,
            errors: apiResponse.errors
        }

        if (apiResponse.errors.length < 1) {
            delete decoratedResponse.errors;
        }

        return decoratedResponse;
    }
}
