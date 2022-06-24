


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
    
    /**
     * Retrieves a geoJson object from the server.
     * example link: 
     * https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson // a rough estamate of the country borders.
     * @param {String} geoJsonLink 
     * @param {Object} options Optional. Options for the request.
     */
    async getGeoJson(geoJsonLink, options) {
        const response = await fetch(geoJsonLink).catch(e => {
            console.log("Error", e);
          }); // get the geojson file.
        const data = await response.json(); // parse the json file.
        const result = L.geoJson(data, options); // create a L.geoJson object from the parsed json file.
        return result; // return the geoJson object.
    }
    
    createDropDownSelectChart(){
        const dropdown = new LeafletDropDown({position: "topleft"}, WORLD_MAPS, DEFAULT_CHART); // create a new dropdown menu
        const self = this; // save the controller in a variable

        // create a function that will be called when a new chart is selected
        const onSelectNewChart = function(e){ 
            self.addWorldMap(e.target.value);   // add the new chart
        }
        dropdown.onChange = onSelectNewChart; // set the onChange event for the dropdown. This will be called when the user selects a new chart.
        dropdown.addTo(this.map);
    }
    createUI(){
        // create the Dropdown menu for selecting a chart
        // uncomment this if you want to use the dropdown menu. 
        // this.createDropDownSelectChart(); //Maps can currently be chosen in the layerController in this.createLayerController() 

        // Add the layer controller to the map. This will allow the user to switch between Layers.
        // This creates the button and the dropdown menu. Docs: (https://leafletjs.com/examples/layers-control/)
        this.leafletLayerController = this.createLayerController();
        this.leafletLayerController.addTo(this.map);

        // create a button to zoom in on current location
        const buttonZoomInOnCurrLocation = this.createButtonZoomInOnCurrLocation();
        buttonZoomInOnCurrLocation.addTo(this.map);

    }
    createLayerController(){
        // create a new layer controller.
        const layerController = L.control.layers(); 
        
        this.addTileLayer(layerController); // add the tile layers to the layer controller.
        
        return layerController;
    }
    /**
     * Adds tile layers as a option. Used to add choises for world maps.
     * @param {TileLayer} layerController 
     * @returns 
     */
    addTileLayer(layerController){
        // add all the maps and mapnames to the layer controller.
        const mapNames = this.mapData.getAllPosibleMapKeys();
        const maps = this.mapData.getAllPosibleMaps();

        // check if the output length of mapNames and maps is the same.
        if(mapNames.length !== maps.length){
            console.error('The length of the mapNames and maps arrays are not the same.');
            return;
        }

        // add all the maps to the layer controller.
        for(let i = 0; i < maps.length; i++){
            const map = maps[i];
            const mapName = mapNames[i];
            layerController.addBaseLayer(map, mapName);
        }
    }
    getAllPossibleDataLayers(){
        const result = [];
        const keys = Object.keys(LAYER_DATA);
        for (let i = 0; i < keys.length; i++) {
            const currDataLayer = keys[i];
            result.push(LAYER_DATA[currDataLayer]);
        }
        return result;
    }

    addDataLayer(dataLayer, displayName){
        this.leafletLayerController.addOverlay(dataLayer, displayName);
    }
    addDataLayerGroups(dataLayerGroups){
        const keys = Object.keys(dataLayerGroups);
        for(let i = 0; i < keys.length; i++){
            const key = keys[i];
            const layerGroup = dataLayerGroups[key];
            this.addDataLayerGroup(layerGroup);
        }
    }
    addDataLayerGroup(layerGroup){
        const layer = layerGroup.layer;
        const displayName = layerGroup.displayName;        
        this.leafletLayerController.addOverlay(layer, displayName);
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







