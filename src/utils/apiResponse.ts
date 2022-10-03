export default class ApiResponse {
    private _status: number;
    private _data: object|string;
    private _errors: string[];

    public get status(): number {
        return this._status;
    }

    public set status(value: number) {
        this._status = value;
    }

    public get data(): object|string {
        return this._data;
    }

    public set data(value: object|string) {
        this._data = value;
    }

    public get errors(): string[] {
        return this._errors;
    }

    public set errors(value: string[]) {
        this._errors = value;
    }
}
