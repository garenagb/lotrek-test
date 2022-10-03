import Ajv from "ajv";

export class AbstractValidator {
    private readonly _data: any;
    protected _schema: object;

    constructor(data: any) {
        this._data = data;
    }

    async validate(): Promise<{ is_valid: boolean, errors: any[]|null }> {
        const ajv = new Ajv({ allErrors: true, $data: true });
        const validate = await ajv.compile(this._schema);

        const isValid = validate(this._data);

        return {
            is_valid: isValid,
            errors: !isValid ? validate.errors : null
        };
    }
}
