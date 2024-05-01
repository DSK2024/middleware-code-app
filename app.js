//{app}\app.js
import Controller from './lib/controller/Controller.js'

console.log("middleware Start!");

let scanner = new Controller({
    connType : Controller.CONN_TYPE.SERIAL,
    connector : {
        portname : "COM1",
        baudrate : "9600",
        databits : "8",
        stopbits:"1",
    },
    tags:[{
        tagname : "레일1_투입부_바코드데이터"
    }]
});
let ioT = new Controller(({
    connType : Controller.CONN_TYPE.UDP,
    connector : {
        ip:"127.0.0.1",
        port:"1234",
    },
    tags:[{
        tagname : "성형기1호 카운트",
        address : 0x4e20,
    },{
        tagname : "성형기1호 온도",
        address : 0x4e2a,
    },{
        tagname : "성형기1호 습도",
        address : 0x4e34,
    }]
}))

scanner.Open();
ioT.Open();

