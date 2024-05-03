
export default class Mongodb{
    static session = new Mongodb();
    constructor(){
        if(!Mongodb.session){
            this.connectionstring = "";
            this.loop = null;
            this.started = false;
            this.tags = {}
        }
        else{
            throw new Error("Use Mongodb.session !");
        }
    }

    Init(connectionstring, tags){
        this.connectionstring = connectionstring;
        this.tags = tags;
        this.loop = setInterval(() => {
            if(this.started){
                this.tags.forEach((tag)=>{
                    this.InsertOne(tag.tagName, `LastDttm:${tag.LastDttm}, data:${tag.Data}`);
                });
            }
        }, 1000);
    }

    Start(){
        this.started = true;
    }

    InsertOne(collection, data){
        console.log(`Mongo DB Insert : collection[${collection}] data[${data}]`);
        //TO DO
    }
}