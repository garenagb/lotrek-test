import {AbstractValidator} from "./abstractValidator";

export class ValidatorSignup extends AbstractValidator {
    protected _schema: object = {
        "type": "object",
        "properties": {
            "username": { type: "string" },
            "password": { type: "string", pattern: "(?=[A-Za-z0-9@#$%^&+:;{}()?!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+:;{}()?!=])(?=.{6,}).*$" },
            "password2": {
                const: {
                    "$data": "1/password"
                },
                type: "string"
            }
        },
        "required": ["username", "password", "password2"]
    }

    constructor(data: any) {
        super(data);
    }
}
