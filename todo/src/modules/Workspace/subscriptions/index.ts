import {
  GetMQInstance,
  MQServiceConsumer,
  MQServicePublisher,
} from "../../../shared/services/MQ";
import {createSpaceUseCase} from "../useCases";

export async function StartTodoSubscriptions() {
  const mq = await GetMQInstance();

  const routingKey = `${process.env.MQ_SERVICE_NAME}.account`;
  const exchange = process.env.MQ_EXCHANGE;
  const queue = process.env.MQ_QUEUE;

  const mqPublisher = new MQServicePublisher(mq, routingKey, exchange);

  const baseExchange = "auth-service-exchange";
  const mqConsumer = new MQServiceConsumer(
    mq,
    queue,
    baseExchange,
    `auth-service.account.#`
  );

  // Publishers

  // Consumers
  mqConsumer.registerListener(
    "auth-service.account.created",
    (data: Buffer) => {
			const payload = JSON.parse(data.toString());
			createSpaceUseCase.run({
			 name: payload.extra.props.value,
			 accountId: payload.accoutnId,
			});
		}
  );
}
