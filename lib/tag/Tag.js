//{app}\lib\tag\Tag.js
export default class Tag{
    #latestUpdateDttm = null;
    #prevVal = "";
    #currentVal = "";
    constructor(option){
        this.tagName = option.tagname;
        this.data_start_idx = option.data_start_idx;
        this.data_length = option.data_length;
        this.data_type = option.data_type;
    }

    get LastDttm(){
        return this.#latestUpdateDttm;
    }

    get Data(){
        return this.#currentVal;
    }

    set Data(val){
        this.#prevVal = this.#currentVal;
        this.#currentVal = val;
        this.#latestUpdateDttm = new Date();
    }
}