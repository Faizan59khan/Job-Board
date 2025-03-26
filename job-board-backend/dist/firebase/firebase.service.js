"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const admin = require("firebase-admin");
const common_1 = require("@nestjs/common");
let FirebaseService = class FirebaseService {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(require('../../config/firebaseServiceAccountKey.json')),
        });
        this.messaging = admin.messaging();
    }
    async sendNotification(token, title, body) {
        const message = {
            notification: { title, body },
            token,
        };
        try {
            const response = await this.messaging.send(message);
            console.log('Successfully sent message:', response);
            return response;
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    }
};
exports.FirebaseService = FirebaseService;
exports.FirebaseService = FirebaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map