import { Kafka, logLevel } from "kafkajs";


const kafka = new Kafka({
    clientId: 'book-store',
    brokers: ['localhost:9092'],
    logLevel: logLevel.DEBUG,
});

const producer = kafka.producer();

export const runProducer = async (res) => {
    await producer.connect();
    await producer.send({
        topic: 'test',
        //messages: [{ value: JSON.stringify(res) }]
        messages: [{ key: 'test', value: 'Hello Kafka'}],
    })
};

// const sendPayload = async () => {
//     try {
//         await producer.send({
//             topic: 'test',
//             messages: [{ key: 'test', value: 'Hello Kafka'}],
//         })
//     } catch (e) {
//         console.error('Caught error while sending: ', e);
//     }
// } 

// const main = async () => {
//     await producer.connect();
//     setInterval(async () => {
//         await sendPayload();
//     }, 5000)
// }

// main();



