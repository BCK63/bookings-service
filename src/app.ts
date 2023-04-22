import express, { Application } from 'express';
import amqp from 'amqplib';

const app: Application  = express();

async function createConnection() {
  try {
    const conn = await amqp.connect('amqp://localhost:5673');
    const channel: amqp.Channel = await conn.createChannel();
    channel.assertQueue('bookings');
    channel.assertQueue('bookings-response')
    channel.consume('bookings', (msg: amqp.ConsumeMessage)=> {
      console.log('h');
      channel.ack(msg);
       channel.sendToQueue(msg.properties.replyTo, Buffer.from('received'));
       
    })
  } catch (error) {
   console.log(error); 
  }
}
createConnection();