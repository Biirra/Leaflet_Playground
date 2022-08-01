class DataItemController{
    dataItems = [];
    constructor(){
        this.init();
    }
    init(){
        
    }

    /**
     * add a single item to the item controller.
     * Controller expects valid item data. item data is validated and possibly converted to item before adding to the controller.
     * Will skip item if item is invalid.
     * @param {Item} 
     * @param {boolean} isConverted A flag to indicate if the item is already converted to the correct format. To counter a infinite loop.
     */
     addDataItem(itemData){
        if(itemData instanceof DataItem){
            const dataItem = itemData;  // data is a valid data item.
            this.dataItems.push(dataItem);
        } else {
            // try converting data to item.
            const newItem = new DataItem(itemData);
            const isValid = newItem.validate();
            if(!isValid){
                DebugHandler.error('Conversion of item failed. Skipping item.', itemData);
                return;
            }

            this.addDataItem(newItem);
        }
    }

    /**
     * adds item data to the item controller.I
     * Item data is validated before adding to the controller.
     * @param {Array} dataItem an array of dataItem.
     */
     addDataItems(dataItem){
        for(let i = 0; i < dataItem.length; i++){
            const currItem = dataItem[i];
            this.addDataItem(currItem); // add item to the controller. item data is validated and possibly converted to item before adding to the controller.
        }
    }

    static createNewItem(layer){

        const itemOptions = {
            groupName: null,
            layerName: null,
            latlang: null, // done
            layerType: null,
            displayName: null,
            checked: true,
            extendedData: null,
            icon: LEAFLET_ICONS.ITEM,
            layer: layer,
            popup: null // done
        }


        // get latitude and longitude from layer.
        let latlng = layer.getLatLng ? layer.getLatLng() : undefined;
        let latlngs = layer.getLatLngs ? layer.getLatLngs() : undefined;
       
        if(latlng){
            if(Array.isArray(latlng)) {
                itemOptions.latlang = latlng;
            }
            else {
                itemOptions.latlang = [latlng];
            }
        }

        if(latlngs){
            itemOptions.latlang = latlngs;
        }

        // create wanted view.
        const view = new DataItemView(this);

        // prepare popup.
        const viewElement = view.getView(); // get the view element.
        const popup = L.popup()
            .setLatLng(itemOptions.latlang[0])
            .setContent(viewElement);
        itemOptions.popup = popup;
        

        const result = new DataItem(view, itemOptions);

        return result;
    }
}