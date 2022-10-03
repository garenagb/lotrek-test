import {AbstractValidator} from "./abstractValidator";

export class ValidatorSendMessage extends AbstractValidator {
    protected _schema: object = {
        "type": "object",
        "properties": {
            "image": { type: "object" },
            "text": { type: "string" }
        },
        "oneOf": [
            {
                "required": [ "text" ]
            },
            {
                "required": [ "image" ]
            },
        ]
    }

    constructor(data: any) {
        super(data);
    }
}
