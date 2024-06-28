export declare class EmailService {
    private transporter;
    constructor();
    enviaEmail(to: string, subject: string, text: string, html: string): Promise<void>;
}
