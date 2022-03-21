class Inventory{
    _items = [];
    _view;
    constructor(){
        this._view = new InventoryView(this);
    }
    addItem(item) {
        if(!(item instanceof Item)) return;
        this.items.push(item);
    }
    useItem(item){
        if(item?.use)
            item.use();
        else
            return `Item can not be used in any way.`;
    }
    /**
     * @param {Array} items - [Item, ...]
     */
    set items(items){
        if(typeof items != Array){
            console.warn('Items has not been set. Not of type Array.', items);
            return;
        }
        // empty array is always accepted.
        if(items.length === 0){ 
            this._items = items;
        }
        // filter out elements that don't belong.
        for(let i = items.length - 1; i >= 0; i--){
            if(!(items[i] instanceof Item))
                items.slice(i, 1)
        }
        this._items = items;
    }
    get items(){
        for(let i = this._items.length - 1; i >= 0; i--){
            if(!(this._items[i] instanceof Item)){
                this._items.slice(i, 1)
            }  
        }
        return this._items;
    }
    get view(){
        return this._view;
    }
}