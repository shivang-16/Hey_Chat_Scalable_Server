import { Kafka } from "kafkajs"

const kafka = new Kafka({
    clientId: 'Hey_Chat',
    brokers: [process.env.IP_ADDRESS]
})


let producer; 
export const createProducer = async() => {
    const _producer = kafka.producer();
    await _producer.connect()
    producer = _producer
    return producer;
}

export const produceMessage = async(message) => {
    const producer = await createProducer()
    await producer.send({
        messages: message,
        topic: "Personal_Chat",
    });
    return true
}

export const messageConsumer = async() => {
    const consumer = kafka.consumer({groupId: "default"});
    await consumer.connect();
    await consumer.subscribe({topic: "Personal_Chat", fromBeginning: true});
    
    await consumer.run({
        autoCommit: true,
        eachMessage: async({message, pause}) => {
            if(!message) return
            console.log('New message recieved');
            try {
               //Bulk inserting messages to database
            } catch (error) {
                console.log("Something went wrong")
            }
        }
    })
}