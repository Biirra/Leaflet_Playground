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
        const result = [];

        // create leaflet layer data for each asset.
        for(let i = 0; i < assets.length; i++){
            const currAsset = assets[i];
            // generate desired result to be used by the map controller.
            const resultItem = {
                layer: this.createLeafletMarker(currAsset), // for now we use a marker.
                displayName: currAsset.displayName,
                groupName: currAsset.groupName,
                checked: currAsset.checked,
            };
            result.push(resultItem);
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
        if(!asset.displayName){
            DebugHandler.error(`AssetController.validateAssetData: asset has no displayName.`, asset);
            isValid = false;
        }
        if(!asset.type){
            DebugHandler.error(`AssetController.validateAssetData: asset has no type.`, asset);
            isValid = false;
        }
        if(!asset.latlang){
            DebugHandler.error(`AssetController.validateAssetData: asset has no latlang.`, asset);
            isValid = false;
        }
        if(!asset.groupName){
            DebugHandler.error(`AssetController.validateAssetData: asset has no groupName.`, asset);
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