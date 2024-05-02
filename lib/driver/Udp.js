import IDriver from './IDriver.js'
export default class Udp extends IDriver{
    constructor(option){
        super();
        this.ip = option.ip;
        this.port = option.port;
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
    }

    async Send(data){
        // TO DO
    }
}