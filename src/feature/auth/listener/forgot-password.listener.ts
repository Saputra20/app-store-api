import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Account } from '../../account/entities/account.entity';
import { AuthService } from '../auth.service';
import { EventEmit } from '../../../common/enum';

@Injectable()
export class ForgetPasswordListener {
  constructor(private readonly authService: AuthService) {}

  @OnEvent(EventEmit.FORGOT_PASSWORD)
  handleForgetPassword(payload: Account) {
    console.log(payload);
  }
}
