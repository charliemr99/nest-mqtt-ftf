import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('TEST_CLIENT') private client: ClientProxy,
  ) { }

  sendTopic2(response: number) {
    const userProperties = { 'x-version': '1.0.0' };
    const record = new MqttRecordBuilder(`${response}`)
      .setProperties({ userProperties })
      .setQoS(1)
      .build();
    this.client.send('fulltimeforce2', record).subscribe(res => {
      console.log('send response: ', res);
    });
  }
}
