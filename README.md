## 미들웨어의 핵심모듈 소개 
> 1) 통신 드라이버 
> 2) 태그 
> 3) 컨트롤러 
> 4) 웹 API

더 자세히 알고 싶다면 미들웨어를 소개하는 [글](https://yozm.wishket.com/magazine/detail/2606/)을 읽어볼 것을 권한다.

## 디렉터리 구조
```text
middleware-code-app/ # 작업 영역 root
│ app.js             # 애플리케이션 메인 실행 코드
├─── lib\            # 라이브러리 폴더 영역
  ├─── driver\       # 통신 드라이버 폴더 영역 (설비 통신 프로토콜)
  ├─── tag\          # 태그 폴더 영역 (바이너리 데이터가 정보화되는 영역)
  ├─── controller\   # 컨트롤러 폴더 영역 (설비 → 미들웨어 처리)
├─── service\
  │ WebApi.js        # 웹 API 코드 (미들웨어 → 사용자 처리)
```
* 여기서 주도적인 실행의 단위는 2개로, 컨트롤러와 웹 API이다. 컨트롤러는 통신 드라이버를 이용하여 설비에서 데이터를 개더링한 다음 태그에 저장한다. 웹 API는 요청이 오면 모든 태그를 뒤져 개더링 된 정보를 전송한다

1) 통신 드라이버
* 드라이버란 하드웨어와 애플리케이션을 이어주는 매개체를 의미한다. 우선 인터페이스를 위해 IDriver 클래스를 만들고 메소드를 접속(Open), 접속 끊기(Close), 수신(Receive), 발신(Send)으로 나누었다. 모든 수신과 발신을 상속할 클래스들이 비동기로 구현되도록 async로 정의해 두자.
```javascript
//{app}\lib\driver\IDriver.js
export default class IDriver{
    Open(){}
    Close(){}
    async Receive(callback){}
    async Send(data){}
}
```
2) 태그
* 태그는 내가 인터페이스하려는 데이터를 태깅하는 작업이다. 예를 들어, RFID 리더기가 읽은 데이터가 팔레트의 ID 값이라고 하자. 우리가 수신한 데이터 자체에는 팔레트 ID라는 정보가 전혀 없다. 따라서 여기에서 의미를 주는 요소를 따로 태깅하는 것이다.
```javascript
//{app}\lib\tag\Tag.js
export default class Tag{
    #currentVal = "";
    constructor(option){
        this.tagName = option.tagname;
    }
    get Data(){
        return this.#currentVal;
    }
    set Data(val){
        this.#currentVal = val;
    }
}
```
3) 컨트롤러
* 컨트롤러는 통신 드라이버와 태그 모두를 멤버로 갖고 이들을 제어하는 역할이다.
```javascript
//{app}\lib\controller\Controller.js
import Tcp from '../driver/Tcp.js';
import Tag from '../tag/Tag.js';
export default class Controller{
    static CONN_TYPE = {TCP : "TCP"}
    constructor(option){
        this.connType = option.connType;
        switch(this.connType){
            case Controller.CONN_TYPE.TCP:
                this.tcp = new Tcp(option.connector); break;
        };       
        this.tags = [];//태그 컬렉션
        option.tags.forEach((item, index, array) => {
            let tag = new Tag({tagname:item.tagname});
            this.tags.push(tag);
        });
    }
    ReadStart(){
        switch(this.connType){
            case Controller.CONN_TYPE.TCP:
                setInterval(() => {
                    try{
                        if(!this.tcp.connected)
                            this.tcp.Open();
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
                //TO DO
                break;
        }
    }
}
```
4) 웹 API
* 웹 API는 싱글턴 패턴으로 구현해 하나의 서버에서만 처리되도록 한다.
```javascript
//{app}\service\WebApi.js
import Http from 'http'
export default class WebApi{
    static server = new WebApi();
    constructor(){
        if(WebApi.server){
            throw new Error("Use WebApi.server !");
        }
    }
    Init(port, url, tags){
        this.port =port;
        this.tags = tags;
        this.server = Http.createServer((req, res) => {
            if (req.url == url && req.method === 'POST') {
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                });
                let result = "";
                this.tags.forEach((tag)=>{
       			result+=`{tagname:${tag.tagName}, data:${tag.Data}`;
                });
                res.end(result);
            }
        })
    }
    Start(){
        this.server.listen();
    }
}
```
5) 미들웨어 실행
* 이제 이들을 실행해 주는 코드 app.js를 보자. 이 코드에는 IoT 장비를 연결하기 위한 정보가 포함된다. 그 하위에는 각 데이터를 태깅하며 정의한 데이터가 들어 있다.
```javascript
//{app}\app.js
import Controller from './lib/controller/Controller.js'
const ioT = new Controller(({
    connType : Controller.CONN_TYPE.TCP,
    connector : {ip:"127.0.0.1", port:"1234"},
    tags:[{tagname : "성형기1호 카운트"}]
}))
ioT.ReadStart();
WebApi.server.Init(8080, '/middleware', ioT.tags);
WebApi.server.Start();
```
* 이렇게 수집된 데이터는 태그 집합에 모인다. 만약 웹 API로 요청이 들어오면, 미들웨어는 현재의 태그 정보를 모두 모아 응답한다. 

<끝>
