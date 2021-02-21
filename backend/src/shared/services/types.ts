

export interface IMQService {

}

export interface MQServiceProps {
  queue: string;
  exchange: string;
  serviceName: string;
  listenPattern: string;
}

export type ConsumerCallback = (b: Buffer) => any;

