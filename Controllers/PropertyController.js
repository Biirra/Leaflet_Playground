// Things that are to big to carry on person.
class PropertyController{
    _properties = [];
    constructor(){

    }

    addProperty(property) {
        if(!(property instanceof Property)) return;
        this.properties.push(property);
    }
    /**
     * @param {Array} properties - [Property, ...]
     */
    set properties(properties){
        if(typeof properties != Array){
            console.warn('Properties has not been set. Not of type Array.', properties);
            return;
        }
        // empty array is always accepted.
        if(properties.length === 0){ 
            this._properties = properties;
        }
        // filter out elements that don't belong.
        for(let i = properties.length - 1; i >= 0; i--){
            if(!(properties[i] instanceof Property))
                properties.slice(i, 1)
        }
        this._properties = properties;
    }
    get properties(){
        for(let i = this._properties.length - 1; i >= 0; i--){
            if(!(this._properties[i] instanceof Property)){
                this._properties.slice(i, 1)
            }  
        }
        return this._properties;
    }
}





