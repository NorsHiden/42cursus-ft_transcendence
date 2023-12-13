import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatGateway } from './gateway/chat.gateway';
import { WsGuard } from '../guards/ws.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Services } from 'src/utils/consts';
import { GatewaysService } from '../services/gateways.service';
import { ChannelsModule } from 'src/channels/channels.module';

@Module({
  imports: [ChannelsModule],
  providers: [
    {
      provide: Services.Chat,
      useClass: ChatService,
    },
    {
      provide: Services.Gateways,
      useClass: GatewaysService,
    },
    ChatGateway,
    WsGuard,
    JwtService,
    ConfigService,
  ],
  exports: [
    {
      provide: Services.Chat,
      useClass: ChatService,
    },
  ],
})
export class ChatModule {}
