//{app}\lib\tag\Tag.js
export default class Tag{
    #latestUpdateDttm = null;
    #prevVal = "";
    #currentVal = "";
    constructor(option){
        this.tagName = option.tagname;
    }

    get LastDttm(){
        return this.#latestUpdateDttm;
    }

    get Data(){
        return this.#currentVal;
    }

    set Data(val){
        this.#prevVal = this.currentValue;
        this.#currentVal = val;
        this.#latestUpdateDttm = Date.now();
    }
}