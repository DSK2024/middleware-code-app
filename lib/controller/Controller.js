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
        option.tags.forEach((item) => {
            let tag = new Tag({
                tagname:item.tagname,
                data_start_idx: item.data_start_idx,
                data_length: item.data_length,
                data_type: item.data_type,
            });
            this.tags.push(tag);
        });
        this.tags.forEach((item) => {
            console.log(item.tagName);
        });
    }
    ReadStart(){
        switch(this.connType){
            case Controller.CONN_TYPE.TCP:
                setInterval(() => {
                    try{
                        if(!this.tcp.connected)
                        {
                            this.tcp.Open();
                            console.log("tcp open!");
                        }
                        this.tags.forEach((tag) => {
                            this.tcp.Receive(()=> {
                                tag.Data = this.tcp.receive_data;
                                this.tcp.Send(true);
                            });
                        });
                    }
                    catch(e){
                        console.log(e);
                    }
                }, 1000);
                break; 
            case Controller.CONN_TYPE.SERIAL:
                this.serial.Open();
                console.log("serial open!");
                break;
            case Controller.CONN_TYPE.UDP:
                this.udp.Open();
                console.log("udp open!");
                break;
            default:
                console.log("정의 없음");
                throw new Error("정의 없음");
        }
    }
}