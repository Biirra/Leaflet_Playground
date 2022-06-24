class AssetController{
    _assets = [];
    _leafletLayerData = [];
    constructor(){
        this.init();
    }
    init(){
        const assets = ImportController.getAllAssets(); // get all assets from the import controller.
        this.addAssets(assets);

        // get prepared leaflet layer data from assets.
        this.leafletLayerData = this.getPrepairedLeafletLayerData(this.assets);
        DebugHandler.log(`AssetController.init: leafletLayerData added to controller.`, this._leafletLayerData);
    }

    /**
     * add a single asset to the asset controller.
     * Controller expects valid asset data. asset data is validated and possibly converted to asset before adding to the controller.
     * Will skip adding if asset is invalid.
     * @param {Asset} 
     * @param {boolean} isConverted A flag to indicate if the asset is already converted to the correct format. To counter a infinite loop.
     */
    addAsset(asset, isConverted = false){
        if(asset instanceof Asset){
            this._assets.push(asset);
        } else {
            console.warn('AssetController.addAsset: asset is not an instance of Asset. Will try to convert data to Asset...', asset);
            if(isConverted){
                // if the asset is already converted once, we have a infinite loop. stop it.
                console.error('Conversion of asset failed. Skipping asset.', asset);
                return;
            }
            // try converting to asset.
            const newAsset = new Asset();
            newAsset.setData(asset);
            this.addAsset(newAsset, true);
        }
    }
    getPrepairedLeafletLayerData(inputAssets){
        const assets = inputAssets;
        const result = {};

        for(let i = 0; i < assets.length; i++){
            const asset = assets[i];

            if(!asset.layerGroupId) continue; // check if asset has a layerId. if not, skip asset.

            
            // create a leaflet layer group for layerId if it does not exist.
            if(!result[asset.layerGroupId]){
                result[asset.layerGroupId] = {
                    layer: L.layerGroup(),
                    displayName: asset.layerGroupId
                };
            }

            const leafletMarker = this.createLeafletMarker(asset); // create a leaflet market for asset
            result[asset.layerGroupId].layer.addLayer(leafletMarker); // add leaflet marker to layer group
        }

        return result;
    }
    createLeafletMarker(asset){
        const marker = L.marker([asset.coordinates.lat, asset.coordinates.lng]);
        marker.bindPopup(asset.name);
        return marker;
    }
    /**
     * adds asset data to the asset controller.
     * Controller expects valid asset data. asset data is validated before adding to the controller.
     * @param {Array} assets an array of assets.
     */
    addAssets(assets){
        for(let i = 0; i < assets.length; i++){
            const currAsset = assets[i];
            const dataIsValid = this.validateAssetData(currAsset);
            if(dataIsValid){
                const asset = new Asset();
                asset.setData(currAsset);
                this.addAsset(asset);
            }
        }
    }
    validateAssetData(asset){
        let isValid = true;
        if(!asset.name){
            DebugHandler.error(`AssetController.validateAssetData: asset has no name.`, asset);
            isValid = false;
        }
        if(!asset.type){
            DebugHandler.error(`AssetController.validateAssetData: asset has no type.`, asset);
            isValid = false;
        }
        if(!asset.location){
            DebugHandler.error(`AssetController.validateAssetData: asset has no location.`, asset);
            isValid = false;
        }
        if(!asset.layerGroupId){
            DebugHandler.error(`AssetController.validateAssetData: asset has no layerGroupId.`, asset);
            isValid = false;
        }
        return isValid;
    }
    set leafletLayerData(leafletLayerData){
        this._leafletLayerData = leafletLayerData;
    }
    get leafletLayerData(){
        return this._leafletLayerData;
    }
    get assets(){
        return this._assets;
    }
    set assets(assets){
        this._assets = assets;
    }
}