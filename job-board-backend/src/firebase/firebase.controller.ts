import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('notifications')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('send')
  async sendNotification(@Body() body: { token: string; title: string; body: string }) {
    return this.firebaseService.sendNotification(body.token, body.title, body.body);
  }
}
