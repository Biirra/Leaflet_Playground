class ApplicationController {
    _map;
    _mapLeaflet;
    _mapController;


    _assetController;
    constructor() {
        
        this._mapLeaflet = new MapLeaflet("map");
        this._map = this.mapLeaflet.map;

        this._mapController = new LeafletMapController(this.mapLeaflet);
        this._assetController = new AssetController();

        this.init();
    }
    init() {

        this.map.setView(DEFAULT_COORDINATES, DEFAULT_ZOOM_LEVEL); // set coordinates to some place on startup.
        this.mapLeaflet.changeWorldMap(DEFAULT_CHART); // add a map so there is always a map selected.

        // add leafletDataLayers to the mapController
        this.mapController.layerControl.addDataLayers(this.assetController.dataLayers);

        // add async data layers to the mapController. Done at top level to avoid CORS issues.
        this.mapController.layerControl.addAsyncDataLayers(LAYER_DATA);

        
        // get gejson from local folder using import controller. CORS issues.
        // const geojson = ImportController.getGeoJsonFromLocal("assets/countries.geojson");
        // console.log(geojson)

        
    }

    get map() {
        return this._map;
    }
    set map(map) {
        this._map = map;
    }
    get mapLeaflet() {
        return this._mapLeaflet;
    }
    set mapLeaflet(mapLeaflet) {
        this._mapLeaflet = mapLeaflet;
    }

    set assetController(assetController) {
        this._assetController = assetController;
    }
    get assetController() {
        return this._assetController;
    }
    set mapController(mapController) {
        this._mapController = mapController;
    }
    get mapController() {
        return this._mapController;
    }
}