//{app}\lib\driver\IDriver.js
export default class IDriver{
    constructor(){
        this.connected = false;
    }
    Open(){}
    Close(){}
    async Receive(callback){}
    async Send(data){}
}