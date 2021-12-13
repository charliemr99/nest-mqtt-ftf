import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('TEST_CLIENT') private client: ClientProxy,
  ) { }

  sendTopic2(response: number) {
    const record = new MqttRecordBuilder(`${response}`)
      .setQoS(1)
      .build();
    this.client.send('ftf-output', record).subscribe(res => {
      console.log('response output: <', res, '>');
    });
  }
}
