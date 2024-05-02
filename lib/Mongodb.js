
export default class Mongodb{
    static session = new Mongodb();
    constructor(){
        if(!Mongodb.session){
            this.connectionstring = "mongodb://127.0.0.1:8288";
        }
        else{
            throw new Error("Use Mongodb.session !");
        }
    }

    InsertOne(collection, data){
        console.log(`Mongo DB Insert : collection[${collection}] data[${data}]`);
        //TO DO
    }
}