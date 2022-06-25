


class LeafletMapController{
    _map;
    _mapData;
    _leafletLayerController;
    constructor(mapData){
        this.map = mapData.map; //L.map(domId);
        this.mapData = mapData;
        this.init();
    }
    init(){
        this.map.setView(DEFAULT_COORDINATES, DEFAULT_ZOOM_LEVEL); // set coordinates to some place on startup.
        //this.map.on('click', this.onMapClick.bind(this)); // bind click event to map

        this.mapData.changeWorldMap(DEFAULT_CHART); // add a map so there is always a map selected.

        this.createUI(); // create the UI.
        
    }

    createUI(){

        // Add the layer controller to the map. This will allow the user to switch between Layers.
        // This creates the button. Docs: (https://leafletjs.com/examples/layers-control/)
        const leafletLayerController = this.createLayerController();
        leafletLayerController.addTo(this.map);

        // TODO: add async GeoJson layers to the map. Requires a NodeJS server.

        // create a button to zoom in on current location
        const buttonZoomInOnCurrLocation = this.createButtonZoomInOnCurrLocation();
        buttonZoomInOnCurrLocation.addTo(this.map);

        // create the drawTool. This will allow the user to draw on the map.
        const drawTool = new DrawTool(this.map);
    }
    createLayerController(){
        
        // create a new layer controller. docs: https://github.com/davicustodio/Leaflet.StyledLayerControl
        const baseMaps = GROUPED_WORLD_MAPS; // add the default map to the layer controller.
        const overlays = {}; // create an empty array for the overlays.
        const options = {
            container_width 	: "300px",
            container_maxHeight : "800px", 
            group_maxHeight     : "800px",
            exclusive       	: false
        };
        const layerController = L.Control.styledLayerControl(baseMaps, overlays, options);
        layerController.options.group_togglers.show = false; // Needs some work before its enabled. Current function closes all groups on use.
        this._leafletLayerController = layerController;
        return layerController;
    }

    /**
     * add a single data layer to the map.
     * @param {L.Control.layer()} layer
     * @param {string} displayName 
     * @param {string} grpName the group name of the layer. This is used to group the layers.
     */
    addDataLayer(layer){
        const displayName = layer.displayName;
        const groupName = layer.groupName;
        
        const overlayOptions = {
            groupName : groupName,
            expanded:true
        }        
        const llc = this.leafletLayerController.addOverlay(layer.layer, displayName, overlayOptions);
        if(layer.checked){
            llc.selectLayer(layer.layer); // check the layer in layer controller menu. This will add it to the map.
        }
    }
    addDataLayers(dataLayers){
        for(let i = 0; i < dataLayers.length; i++){
            const currDataLayer = dataLayers[i];
            this.addDataLayer(currDataLayer);
        }
    }

    addAsyncDataLayers(dataLayers){
        for(let i = 0; i < dataLayers.length; i++){
            const currDataLayer = dataLayers[i];
            this.addAsyncDataLayer(currDataLayer);
        }
    }
    addAsyncDataLayer(dataLayer){
        const result = dataLayer;
        const promiseGeoJson = ImportController.getAsyncGeoJson(dataLayer.url, dataLayer.options);
        promiseGeoJson.then(data => {
            result.layer = data;
            this.addDataLayer(result);
        })
        
    }

    createButtonZoomInOnCurrLocation(){

        const button = new LeafletButton({
            position: "topleft",
            icon: LEAFLET_ICONS.ZOOM_ON_CURRENT_LOCATION,
            width: '32px',
            height: '32px',
        }); // create a new button

        const zoomInOnUserLocation = () => { // create a function that will be called when the button is clicked
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    const latlng = L.latLng(position.coords.latitude, position.coords.longitude);
                    this.map.setView(latlng, 15);
                });
            }
        }

        button.onClick = zoomInOnUserLocation; // set the onClick event for the button. This will be called when the button is clicked.
        return button;
    }
    
    set leafletLayerController(value){
        this._leafletLayerController = value;
    }
    get leafletLayerController(){
        return this._leafletLayerController;
    }

    set map(map){
        this._map = map;
    }
    get map(){
        return this._map;
    }
    set mapData(mapData){
        this._mapData = mapData;
    }
    get mapData(){
        return this._mapData;
    }

}







