import {AbstractValidator} from "./abstractValidator";

export class ValidatorSignin extends AbstractValidator {
    protected _schema: object = {
        "type": "object",
        "properties": {
            "username": { type: "string" },
            "password": { type: "string" }
        },
        "required": ["username", "password"]
    }

    constructor(data: any) {
        super(data);
    }
}
