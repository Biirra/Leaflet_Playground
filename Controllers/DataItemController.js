class DataItemController{
    _dataItems = [];
    constructor(){
        this.init();
    }
    init(){
        const dataItems = ImportController.getAllAssets(); // get all dataItem from the import controller.
        this.addItems(dataItems);

    }

    /**
     * add a single item to the item controller.
     * Controller expects valid item data. item data is validated and possibly converted to item before adding to the controller.
     * Will skip item if item is invalid.
     * @param {Item} 
     * @param {boolean} isConverted A flag to indicate if the item is already converted to the correct format. To counter a infinite loop.
     */
    addItem(itemData, isConverted = false){
        if(itemData instanceof DataItem){
            const dataItem = itemData;  // data is a valid data item.
            this._dataItems.push(dataItem);
        } else {
            DebugHandler.warn('ItemController.addItem: item is not an instance of Item. Will try to convert data to Item...', itemData);
            if(isConverted){
                // break out if the item is already converted once. to prevent infinite loop.
                DebugHandler.error('Conversion of item failed. Skipping item.', itemData);
                return;
            }
            // try converting data to item.
            const newItem = new DataItem(itemData);
            this.addItem(newItem, true);
        }
    }
    /**
     * adds item data to the item controller.
     * Controller expects valid item data. item data is validated before adding to the controller.
     * @param {Array} dataItem an array of dataItem.
     */
    addItems(dataItem){
        for(let i = 0; i < dataItem.length; i++){
            const currItem = dataItem[i];
            const dataIsValid = this.validateItemData(currItem); // validate item data. if not valid, skip item.
            if(dataIsValid){
                const item = new DataItem(currItem); // create new item.
                this.addItem(item); // add item to the controller. item data is validated and possibly converted to item before adding to the controller.
            }
        }
    }
    validateItemData(item){
        let isValid = true;
        if(!item.displayName){ // displayName is required.
            DebugHandler.error(`ItemController.validateItemData: item has no displayName.`, item);
            isValid = false;
        }
        if(!item.type){ // type is required.
            DebugHandler.error(`ItemController.validateItemData: item has no type.`, item);
            isValid = false;
        }
        if(!item.latlang){ // latlang is required.
            DebugHandler.error(`ItemController.validateItemData: item has no latlang.`, item);
            isValid = false;
        }
        if(!item.groupName){ // groupName is required.
            DebugHandler.error(`ItemController.validateItemData: item has no groupName.`, item);
            isValid = false;
        }
        return isValid;
    }
    get dataItems(){
        return this._dataItems;
    }
    set dataItems(dataItems){
        this._dataItems = dataItems;
    }
}