import IDriver from './IDriver.js'
export default class Tcp extends IDriver{
    constructor(option){
        super();
        this.ip = option.ip;
        this.port = option.port;
    }
    Open(){
        // TO DO
    }
    
    Close(){
        // TO DO
    }

    async Receive(callback){
        // TO DO
    }

    async Send(callback){
        // TO DO
    }
}