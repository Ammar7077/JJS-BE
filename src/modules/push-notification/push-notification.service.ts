import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { UserService } from '../system-users/user/user.service';
import { PushNotificationDto } from './dto/push-notification.dto';

@Injectable()
export class PushNotificationService {
  constructor(private readonly userService: UserService) {}

  async pushNotification(
    userID: Types.ObjectId,
    pushNotificationDto: PushNotificationDto,
  ): Promise<Object> {
    /// Ex.: Notification for Jobseeker about:: Having an interview/feedback and save it in the history
    /// type: interview/feedback/report/position
    const user = await this.userService
      .findByIDAndUpdate(userID, {
        $push: {
          notifications: {
            senderID: pushNotificationDto.senderID,
            type: pushNotificationDto.type,
            senderName: pushNotificationDto.senderName,
            title: pushNotificationDto.title,
            body: pushNotificationDto.body,
            location: pushNotificationDto.location,
            link: pushNotificationDto.link,
            interviewStart: pushNotificationDto.interviewStart,
            interviewEnd: pushNotificationDto.interviewEnd,
            position: pushNotificationDto.position,
            isAccepted: pushNotificationDto.isAccepted,
          },
        },
      })
      .setOptions({ overwrite: false });
    emptyDocument(user, 'user');

    /// Ex.: Notification for company about:: Save req interview/feedback in to Company history
    const saveInToHistory = await this.userService
      .findByIDAndUpdate(pushNotificationDto.senderID, {
        $push: {
          notifications: {
            senderID: userID,
            type: pushNotificationDto.type,
            senderName: pushNotificationDto.senderName,
            title: pushNotificationDto.title,
            body: pushNotificationDto.body,
            location: pushNotificationDto.location,
            link: pushNotificationDto.link,
            interviewStart: pushNotificationDto.interviewStart,
            interviewEnd: pushNotificationDto.interviewEnd,
            position: pushNotificationDto.position,
            isAccepted: pushNotificationDto.isAccepted,
          },
        },
      })
      .setOptions({ overwrite: false });
    emptyDocument(saveInToHistory, 'user');

    return { 'request sent': true };
  }
}
