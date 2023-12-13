import { Server } from "socket.io";
import  Redis  from "ioredis";

const pub = new Redis({
  host: "redis-138ccac8-shivamkumarraut12-56a2.a.aivencloud.com",
  port: 22748,
  username: "default",
  password: "AVNS_90MWSlc03om7aBXii1Z",
});
pub.on('error', (err) => {
    console.error('Redis Publisher Error:', err);
});
const sub = new Redis({
    host: "redis-138ccac8-shivamkumarraut12-56a2.a.aivencloud.com",
    port: 22748,
    username: "default",
    password: "AVNS_90MWSlc03om7aBXii1Z",
});
sub.on('error', (err) => {
    console.error('Redis Subscriber Error:', err);
});

class SocketService{
    private _io: Server;

    constructor(){
        console.log("Init Socket Service...");
        this._io = new Server({
            cors:{
                allowedHeaders: ['*'],
                origin: "*"
            },
        });
        sub.subscribe('MESSAGES')
    }

    public initListeners(){
        const io = this.io;
        console.log("Init scoket listeners");
        io.on('connect', (socket)=>{
            console.log(`New Socket connected `, socket.id);

            socket.on('event:message', async ({message}: {message: string})=>{
                console.log(`New message Recevied. `, message);
                // Publish msg to redis
                await pub.publish('MESSAGES', JSON.stringify({ message }), (err, reply) => {
                    if (err) {
                        console.error('Error publishing message to Redis:', err);
                    } else {
                        console.log('Message published to Redis. Reply:', reply);
                    }
                });
                
            })
        })
        sub.on('message',(channel, message)=>{
            if(channel === 'MESSAGES'){
                console.log("New message from redis ", message)
                io.emit("message", message);
            }
        })
    }

    get io(){
        return this._io;
    }
}

export default SocketService;