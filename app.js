//{app}\app.js
import Controller from './lib/controller/Controller.js'
import Mongodb from  './lib/Mongodb.js'

console.log("middleware Start!");

const scanner = new Controller({
    connType : Controller.CONN_TYPE.SERIAL,
    connector : {
        portname : "COM1",
        baudrate : "9600",
        databits : "8",
        stopbits:"1",
    },
    tags:[{
        tagname : "레일1_투입부_바코드데이터",
        data_start_idx : 1,
        data_length : 15,
    }]
});
const ioT = new Controller(({
    connType : Controller.CONN_TYPE.TCP,
    connector : {
        ip:"127.0.0.1",
        port:"1234",
    },
    tags:[{
        tagname : "성형기1호 카운트",
        data_start_idx : 0x4e20,
        data_type : "DEC",
        data_length: 2
    },{
        tagname : "성형기1호 온도",
        data_start_idx : 0x4e2a,
        data_type : "DEC",
        data_length: 2
    },{
        tagname : "성형기1호 습도",
        data_start_idx : 0x4e34,
        data_type : "DEC",
        data_length: 2
    }]
}))

scanner.ReadStart();
ioT.ReadStart();

const mongoDB = setInterval(() => {
    ioT.tags.forEach((tag)=>{
        Mongodb.session.InsertOne(tag.tagName, `LastDttm:${tag.LastDttm}, data:${tag.Data}`);
    })
}, 1000);

let mongo = new Mongodb();