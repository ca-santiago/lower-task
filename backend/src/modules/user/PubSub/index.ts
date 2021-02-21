import { 
  GetMQInstance,
  MQServiceConsumer,
  MQServicePublisher
} from "../../../shared/services/MQ";

export async function StartUserPubSub() {
  const conn = await GetMQInstance();

  const queue = process.env.QUEUE || 'todo-queue';
  const routingKey = process.env.MQ_SERVICE_NAME;
  const exchange = process.env.MQ_EXCHANGE;

  const pubService = new MQServicePublisher(conn, routingKey, exchange);

  const authConsumerPatternBase = `auth-service.account`
  const authConsumer = new MQServiceConsumer(
    conn, queue, 'auth-service-exchange', `${authConsumerPatternBase}.#`
  );


  // Listeners
  authConsumer.registerListener(`${authConsumerPatternBase}.created`, (data: Buffer) => {
    console.log("=================================================================");
    console.log("[MQ CREATED]");
    console.log(JSON.parse(data.toString()));
  });

  authConsumer.registerListener(`${authConsumerPatternBase}.deleted`, (data: Buffer) => {
    console.log("=================================================================");
    console.log("[MQ DELETED]");
    console.log(JSON.parse(data.toString()));
  });
}