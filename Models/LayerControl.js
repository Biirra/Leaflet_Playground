const LAYER_CONTROL_CONFIG = {
    container_width 	: "300px",
    container_maxHeight : "800px", 
    group_maxHeight     : "800px",
    exclusive       	: false
}

class LayerControl{
    _map; 
    _layerControl;
    constructor(map){
        this.map = map;
        this.init();
    }
    init(){
        this.createLayerControl(); // create the layer control.
    }
    /**
     * add a single data layer to the map.
     * @param {L.Control.layer()} layer
     * @param {string} displayName 
     * @param {string} grpName the group name of the layer. This is used to group the layers.
     */
    addDataLayer(layer){
        const displayName = layer.displayName; // get the display name of the layer.
        const groupName = layer.groupName; // get the group name of the layer.
        
        const overlayOptions = {
            groupName : groupName, // set the group name of the layer. This is used to group the layers.
            expanded: true // set the layer to be expanded.
        }        
        const llc = this.layerControl.addOverlay(layer.layer, displayName, overlayOptions); // add the layer to the layer control.
        if(layer.checked){
            llc.selectLayer(layer.layer); // check the layer in layer controller menu. This will add it to the map.
        }
    }
    addDataLayers(dataLayers){
        for(let i = 0; i < dataLayers.length; i++){
            const currDataLayer = dataLayers[i];
            this.addDataLayer(currDataLayer); // add the data layer to the layer control.
        }
    }

    addAsyncDataLayers(dataLayers){
        for(let i = 0; i < dataLayers.length; i++){
            const currDataLayer = dataLayers[i]; 
            this.addAsyncDataLayer(currDataLayer); // add the data layer to the layer control.
        }
    }
    addAsyncDataLayer(dataLayer){
        const result = dataLayer;
        const promiseGeoJson = ImportController.getAsyncGeoJson(dataLayer.url, dataLayer.options); // get the geojson from the url.
        promiseGeoJson.then(data => { // when the promise is resolved.
            result.layer = data;  // set the layer to the data.
            this.addDataLayer(result); // add the data layer to the layer control.
        }) .catch(error => { // if the promise is rejected.
            DebugHandler.error(`LayerControl.addAsyncDataLayer: error getting async data.`, error);
        });
        
    }
    createLayerControl(){
        const baseMaps = GROUPED_WORLD_MAPS; // add the default maps to the layer controller.
        const overlays = {}; // create an empty array for the overlays.
        const options = LAYER_CONTROL_CONFIG // set the options for the layer control.
        this._layerControl = L.Control.styledLayerControl(baseMaps, overlays, options); // create the layer control.
        this.layerControl.addTo(this.map); // add the layer control to the map.
    }
    set map(map){
        this._map = map;
    }
    get map(){
        return this._map;
    }
    set layerControl(layerControl){
        this._layerControl = layerControl;
    }
    get layerControl(){
        return this._layerControl;
    }

}