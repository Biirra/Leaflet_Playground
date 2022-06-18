const WORLD_MAPS = {
    "Satellite": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'Mapbox Satellite',
        maxZoom: 18,
        id: 'mapbox/satellite-v9',//'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
    }),
    "Streets": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'Mapbox Streets',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
    }),
    "Outdoors": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'Mapbox Outdoors',
        maxZoom: 18,
        id: 'mapbox/outdoors-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
    }),
    "Dark": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'Mapbox Dark',
        maxZoom: 18,
        id: 'mapbox/dark-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
    }),
    "Light": L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        name: 'Mapbox Light',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
    })
};

const DEFAULT_CHART = 'Dark';
const DEFAULT_ZOOM_LEVEL = 13;
const DEFAULT_COORDINATES = [52.704475, 5.753059];
class LeafletMapController{
    _map;
    _currentChart = null;
    constructor(domId){
        this.map = L.map(domId);
        this.init();
    }
    init(){
        this.map.setView(DEFAULT_COORDINATES, DEFAULT_ZOOM_LEVEL); // set coordinates to some place on startup.
        this.map.on('click', this.onMapClick.bind(this)); // bind click event to map

        this.addWorldMap(DEFAULT_CHART); // add a map so there is always a map selected.

        this.createUI(); // create the UI.
    }
    /**
     * change the current Chart to the one selected in the dropdown menu and update the map.
     * @param {String} chartname Optional. If not set, the DEFALT_CHART chart will be used.
     */
    addWorldMap(chartname){
        if(this.currentChart) this.currentChart.remove(this.map); // remove the current chart if there is one.
        if(chartname){
            this.currentChart = this.getMapByName(chartname); // set the current chart to the one selected in the dropdown menu.
        } else if(DEFAULT_CHART){
            this.currentChart = this.getMapByName(DEFAULT_CHART); // set the current chart to the default chart.
        } else {
            console.error('No default chart set.'); // if no default chart is set, throw an error.
        }
        this.currentChart.addTo(this.map); // add the current chart to the map.
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
        const result = L.geoJson(data, options); // create a geoJson object from the parsed json file.
        return result; // return the geoJson object.
    }
    onMapClick(e) {
        this.setMarker(e.latlng);
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
    setPopup(latlng, msg = '') {
        const popup = L.popup({
            closeOnClick: false,
            autoClose: false
          });
        popup.setLatLng(latlng)
            .setContent(msg)
            .openOn(this.map);
    }
    setMarker(latlng, obj, onClick){
        // Creating a marker 
        const marker = L.marker();
        if(obj?.icon) marker.setIcon(obj.icon);

        if(obj){
            const map = this.map;
            this.map.on('zoomend', function() {
                if(!obj.existsInMap) return;
                
                if (map.getZoom() < obj.coordinates.alt)
                    marker.remove();
                else 
                    marker.addTo(map);
            });
        }
        // Adding marker to the map
        marker.setLatLng(latlng);

        if(onClick){
            // applying onclick functionality
            marker.on('click', () => {
                onClick();
            });
        } 
    }
    getMapByName(name){
        return WORLD_MAPS[name];
    }
    getAllPosibleMapKeys(){
        return Object.keys(WORLD_MAPS); // return all the keys of the WORLD_MAPS object.
    }
    getAllPosibleMaps(){
        const keys = Object.keys(WORLD_MAPS);
        const result = [];
        for(let i = 0; i < keys.length; i++){
            const key = keys[i];
            result.push(WORLD_MAPS[key]);
        }
        return result;
    }
    createUI(){
        // create the Dropdown menu for selecting a chart
        // uncomment this if you want to use the dropdown menu. 
        // this.createDropDownSelectChart(); //Maps can currently be chosen in the layerController in this.createLayerController() 

        // Add the layer controller to the map. This will allow the user to switch between Layers.
        // This creates the button and the dropdown menu. Docs: (https://leafletjs.com/examples/layers-control/)
        this.createLayerController();

        // create a button to zoom in on current location
        this.createButtonZoomInOnCurrLocation();

    }
    createLayerController(){
        // create a new layer controller.
        const layerController = L.control.layers().addTo(this.map); 

        // add all the maps and mapnames to the layer controller.
        const mapNames = this.getAllPosibleMapKeys();
        const maps = this.getAllPosibleMaps();

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

        // add datalayers to the layer controller.
        const dataLayers = this.getAllPossibleDataLayers();
        for(let i = 0; i < dataLayers.length; i++){
            const layer = dataLayers[i];
            if(layer.type === LAYER_TYPE.GEOJSON){
                const promisedData = this.getGeoJson(layer.url, {style: {color: 'red'}});
                promisedData.then(result => {
                    console.log("Adding overlay...")
                    layerController.addOverlay(result, layer.displayName);
                }).catch(e => {
                    console.log("Error", e);
                });
            } else if(layer.type === LAYER_TYPE.DEFAULT){
                layerController.addOverlay(layer.layerData, layer.displayName);
            }
        }
        
    }
    getAllPossibleDataLayers(){
        const result = [LAYER_DATA.COUNTRY_BORDERS_ROUGH];
        return result;
    }
    createButtonZoomInOnCurrLocation(){

        const zoomInOnUserLocation = () => { // create a function that will be called when the button is clicked
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    const latlng = L.latLng(position.coords.latitude, position.coords.longitude);
                    this.map.setView(latlng, 15);
                });
            }
        }

        const button = new LeafletButton({
            position: "topleft",
            icon: LEAFLET_ICONS.ZOOM_ON_CURRENT_LOCATION,
            width: '32px',
            height: '32px',
        }); // create a new button
        button.onClick = zoomInOnUserLocation; // set the onClick event for the button. This will be called when the button is clicked.
        button.addTo(this.map); // add the button to the map.
    }
    set map(map){
        this._map = map;
    }
    get map(){
        return this._map;
    }
    get currentChart(){
        return this._currentChart;
    }
    set currentChart(chart){
        this._currentChart = chart;
    }
}







