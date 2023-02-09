export class BaseException {
    public message: string;

    public stack: string | undefined;

    public error: Error | undefined | unknown;

    public codeMessageLanguage!: string;

    public statusCode: number;

    constructor(message: string, error?: unknown, code = 500, codeMessageLanguage = "", stack = "") {
        this.message = message;
        this.error = error || undefined;
        this.stack = stack;
        this.statusCode = code;
        this.codeMessageLanguage = codeMessageLanguage;
    }

    toString(): string {
        return this.message;
    }

    toJsonResponse() {
        return { status: "error", message: this.message };
    }
}
