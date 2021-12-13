import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @MessagePattern('ftf-input')
  sumData(@Payload() payload: number[], @Ctx() context: MqttContext): number {
    console.log(`---NEW Message ${context.getTopic()}---`);
    console.log("Payload: ", payload);
    console.log("Packet: ", context.getPacket());

    const response = payload.reduce((a, b) => a + b, 0);
    this.appService.sendTopic2(response);
    return response;
  }

  @MessagePattern('ftf-output')
  logData(@Payload() payload: string, @Ctx() context: MqttContext): string {
    console.log(`---NEW Message ${context.getTopic()}---`);
    console.log("Payload: ", payload);
    console.log("Packet: ", context.getPacket());
    // const { properties: { userProperties } } = context.getPacket();
    // console.log("Packet: ", context.getPacket(), " Properties: ", userProperties['x-version'] ?? userProperties['x-version']);

    return payload + ` response from logData() in -t ${context.getTopic()}`;
  }
}
