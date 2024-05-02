import IDriver from './IDriver.js'
export default class Tcp extends IDriver{
    constructor(option){
        super();
        this.ip = option.ip;
        this.port = option.port;
        this.receive_data = "";
    }
    Open(){
        this.connected = true;
        // TO DO
    }
    
    Close(){
        this.connected = false;
        // TO DO
    }

    async Receive(callback){
        // TO DO
        this.receive_data = Math.random();
        callback();
    }

    async Send(data){
        // TO DO
        console.log(`Send Data:${data}`)
    }
}