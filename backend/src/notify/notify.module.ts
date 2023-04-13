import {Global, Module} from '@nestjs/common';
import { NotifyService } from './notify.service';

@Global()
@Module({
  controllers: [],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule {}
