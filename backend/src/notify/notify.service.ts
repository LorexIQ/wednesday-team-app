import { Injectable } from '@nestjs/common';
import {Message} from "firebase-admin/lib/messaging";
import {MessageDto} from "./dto/message.dto";
const admin = require("firebase-admin");
const serviceAccount = require("../../assets/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

@Injectable()
export class NotifyService {
    async sendNotify(sendData: MessageDto) {
        if (sendData.token) {
            const message: Message = {
                notification: {
                    title: sendData.title,
                    body: sendData.body
                },
                token: sendData.token
            };
            await admin.messaging().send(message);
        }
    }
}
