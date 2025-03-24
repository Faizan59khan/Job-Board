import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  private messaging: admin.messaging.Messaging;

  constructor() {
    admin.initializeApp({
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      credential: admin.credential.cert(require('../../config/firebaseServiceAccountKey.json')),
    });

    this.messaging = admin.messaging();
  }

  async sendNotification(token: string, title: string, body: string) {
    const message = {
      notification: { title, body },
      token,
    };

    try {
      const response = await this.messaging.send(message);
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
