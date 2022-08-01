class ApplicationController {
    constructor() {
        this.mapLeaflet = new MapLeaflet("map");
        this.map = this.mapLeaflet.map;

        this.mapController = new LeafletMapController(this.mapLeaflet);
        this.itemController = new DataItemController();

        this.init();
    }
    init() {

        this.map.setView(DEFAULT_COORDINATES, DEFAULT_ZOOM_LEVEL); // set coordinates to some place on startup.
        this.mapLeaflet.changeWorldMap(DEFAULT_CHART); // add a map so there is always a map selected.

    }
    loadMockData() {
        this.itemController.addDataItems(MOCK_DATA.items);
        // add leafletDataLayers to the mapController
        this.mapController.layerControl.addDataLayers(this.itemController.dataItems);

        // add async data layers to the mapController. Done at top level to avoid CORS issues.
        this.mapController.layerControl.addAsyncDataLayers(LAYER_DATA);
    }
}