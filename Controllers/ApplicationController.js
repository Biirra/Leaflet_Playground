class ApplicationController {
    _mapController;
    _assetController;
    constructor(mapData) {
        this.mapController = new LeafletMapController(mapData);
        this.assetController = new AssetController();

        this.init();
    }
    init() {
        // get all leafletDataLayers from the assetController
        const leafletDataLayers = this.assetController.leafletLayerData;
        // add leafletDataLayers to the mapController
        this.mapController.addDataLayers(leafletDataLayers);

        // add async data layers to the mapController. Done at top level to avoid CORS issues.
        this.mapController.addAsyncDataLayers(LAYER_DATA);


        // get gejson from local folder using import controller. CORS issues.
        // const geojson = ImportController.getGeoJsonFromLocal("assets/countries.geojson");
        // console.log(geojson)

        
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