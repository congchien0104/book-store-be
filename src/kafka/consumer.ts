import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "book-store",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

// export const runConsumer = async () => {
//     await consumer.connect();
//     await consumer.subscribe({ topic: "test", fromBeginning: true });

//     await consumer.run({
//         eachMessage: async ({ message }) => {
//             console.log('Arrived in Consumer');
//             //const obj = JSON.parse(message.value);
//         }
//     })
// }


const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Received: ", {
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};
run().catch(console.error);