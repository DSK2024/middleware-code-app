import Tcp from '../driver/Tcp.js';
import Serial from '../driver/Serial.js';
import Udp from '../driver/Udp.js';
import Tag from '../tag/Tag.js';
export default class Controller{
    static CONN_TYPE = {
        TCP : "TCP",
        UDP : "UDP",
        SERIAL : "SERIAL"
    }
    constructor(option){
        this.connType = option.connType;
        switch(this.connType){
            case Controller.CONN_TYPE.TCP:
                this.tcp = new Tcp(option.connector);
                this.serial = null;
                this.udp = null;
                break; 
            case Controller.CONN_TYPE.SERIAL:
                this.tcp = null;
                this.serial = new Serial(option.connector);
                this.udp = null;
                break;
            case Controller.CONN_TYPE.UDP:
                this.tcp = null;
                this.serial = null;
                this.udp = new Udp(option.connector);
                break;
            default:
                this.tcp = null;
                this.serial = null;
                this.udp = null;
                console.log("정의 없음");
                throw new Error("정의 없음");
        };
        
        this.tags = [];
        option.tags.forEach((item, index, array) => {
            let tag = new Tag({tagname:item.tagname});
            this.tags.push(tag);
        });
        this.tags.forEach((item) => {
            console.log(item.tagName);
        });
    }
    Open(){
        switch(this.connType){
            case Controller.CONN_TYPE.TCP:
                console.log("tcp open!");
                break; 
            case Controller.CONN_TYPE.SERIAL:
                console.log("serial open!");
                break;
            case Controller.CONN_TYPE.UDP:
                console.log("udp open!");
                break;
            default:
                console.log("정의 없음");
                throw new Error("정의 없음");
        }
    }

    Receive(){
        // TO DO
    }
}