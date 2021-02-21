import * as amqp from 'amqplib';
import { ConsumerCallback } from './types';

let MQConn: amqp.Connection;

export async function GetMQInstance(): Promise<amqp.Connection>{
	if(MQConn) return MQConn;
	else return await StartConnection();
}

async function StartConnection(): Promise<amqp.Connection> {
	if(MQConn) return MQConn;
	try{
    console.log('[MQ] Starting conection');
	  const url = process.env.MQ_URL || 'amqp://localhost';
    MQConn = await amqp.connect(url);
    console.log('[MQ] Conection started');
	  return MQConn;
	}	catch (err) {
		console.log('[MQ] Could not connect');
		console.log('[MQ] ' + err.message);
		throw err;
	}
}


export class MQServicePublisher {

	private channel: amqp.Channel;

	constructor(
	  private readonly mq: amqp.Connection,
		private readonly routingKey: string,
    private readonly exchange: string,
	){
		this.init();
	}

	async init(): Promise<void>{
    this.channel = await this.mq.createChannel();
		await this.channel.assertExchange(this.exchange, 'topic');
	}

	public async publish(data: {}, eventName: string): Promise<void> {
	  this.channel.publish(
			this.exchange, `${this.routingKey}.${eventName}`,
			Buffer.from(JSON.stringify(data))
		);
	}
}


export class MQServiceConsumer {
	private channel: amqp.Channel;
	private listeners: Record<string,Array<ConsumerCallback>> = {};

  constructor(
    private readonly connection: amqp.Connection,
    private readonly queue: string,
    private readonly exchange: string,
    private readonly listenPattern: string,
    ){
		this.Init();
	}

  private async Init(): Promise<void> {
		this.channel = await this.connection.createChannel();

		await this.channel.assertQueue(this.queue);
		await this.channel.bindQueue(this.queue, this.exchange, this.listenPattern);
		this.on();
	}

	private on(){
		this.channel.consume(this.queue, (msg) => {
			this.dispatchListener(msg.fields.routingKey, msg);
		});
	}

	private dispatchListener(routingKey: string, data: amqp.ConsumeMessage){
	  this.listeners[routingKey]?.map(theListener => {
      theListener(data.content);	
      this.channel.ack(data);
		});
	}
	
	public registerListener(pattern: string, fn: ConsumerCallback){
	  if(this.listeners.hasOwnProperty(pattern) == false)
	    this.listeners[pattern]  = [];
	  this.listeners[pattern].push(fn);
	}
}

