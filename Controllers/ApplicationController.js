class ApplicationController {
    _map;
    _mapLeaflet;
    _mapController;


    _itemController;
    constructor() {
        
        this._mapLeaflet = new MapLeaflet("map");
        this._map = this.mapLeaflet.map;

        this._mapController = new LeafletMapController(this.mapLeaflet);
        this._itemController = new DataItemController();

        this.init();
    }
    init() {

        this.map.setView(DEFAULT_COORDINATES, DEFAULT_ZOOM_LEVEL); // set coordinates to some place on startup.
        this.mapLeaflet.changeWorldMap(DEFAULT_CHART); // add a map so there is always a map selected.

        // add leafletDataLayers to the mapController
        this.mapController.layerControl.addDataLayers(this.itemController.dataItems);

        // add async data layers to the mapController. Done at top level to avoid CORS issues.
        this.mapController.layerControl.addAsyncDataLayers(LAYER_DATA);
        
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

    set itemController(itemController) {
        this._itemController = itemController;
    }
    get itemController() {
        return this._itemController;
    }
    set mapController(mapController) {
        this._mapController = mapController;
    }
    get mapController() {
        return this._mapController;
    }
}