import Http from 'http'

export default class WebApi{
    static server = new WebApi();
    constructor(){
        if(WebApi.server){
            throw new Error("Use Mongodb.session !");
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
                    result += `{tagname:${tag.tagName}, data:${tag.Data}, LastDttm:${tag.LastDttm}}`;
                });
                res.end(result);
            }
        })
    }

    Start(){
        this.server.listen(this.port, () => {
            console.log(`Server running on port`);
        });
    }
}