export class HTTPError {
    public message: string;
    public code: number;

    constructor(message: string, code = 500) {
        this.message = message;
        this.code = code;
    }

    toString() {
        return  `Error, message: ${this.message}, code: ${this.code}`;
    }
}
