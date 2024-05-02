import IDriver from './IDriver.js'
export default class Serial extends IDriver{
    constructor(option){
        super();
        this.portname = option.portname;
        this.baudrate = option.baudrate;
        this.databits = option.databits;
        this.stopbits = option.stopbits;
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