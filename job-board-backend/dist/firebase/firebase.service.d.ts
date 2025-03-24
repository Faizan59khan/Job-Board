export declare class FirebaseService {
    private messaging;
    constructor();
    sendNotification(token: string, title: string, body: string): Promise<string>;
}
