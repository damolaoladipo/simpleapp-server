class ErrorResponse extends Error {

    public message: string;
    public statusCode: number;
    public errors: Array<string>;
    public errorStack: any;
    public data: any;

    constructor (message: string, statusCode: number, errors: Array<string>, data?: any) {

        super();
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = data ? data : {};
        this.errorStack = this.stack;
    }

}

export default ErrorResponse;