class AssetController{
    _assetData = [];
    _dataLayers = [];
    constructor(){
        this.init();
    }
    init(){
        const assetData = ImportController.getAllAssets(); // get all assetData from the import controller.
        this.addAssets(assetData);

        // get prepared leaflet layer data from assetData.
        this.dataLayers = this.getDataLayers(this.assetData);
    }

    /**
     * add a single asset to the asset controller.
     * Controller expects valid asset data. asset data is validated and possibly converted to asset before adding to the controller.
     * Will skip asset if asset is invalid.
     * @param {Asset} 
     * @param {boolean} isConverted A flag to indicate if the asset is already converted to the correct format. To counter a infinite loop.
     */
    addAsset(asset, isConverted = false){
        if(asset instanceof Asset){
            this._assetData.push(asset);
        } else {
            DebugHandler.warn('AssetController.addAsset: asset is not an instance of Asset. Will try to convert data to Asset...', asset);
            if(isConverted){
                // break out if the asset is already converted once. to prevent infinite loop.
                DebugHandler.error('Conversion of asset failed. Skipping asset.', asset);
                return;
            }
            // try converting to asset.
            const newAsset = new Asset();
            newAsset.setData(asset);
            this.addAsset(newAsset, true);
        }
    }
    getDataLayers(inputAssets){
        const assetData = inputAssets;
        const result = [];

        // create leaflet layer data for each asset.
        for(let i = 0; i < assetData.length; i++){
            const currAsset = assetData[i];
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
     * @param {Array} assetData an array of assetData.
     */
    addAssets(assetData){
        for(let i = 0; i < assetData.length; i++){
            const currAsset = assetData[i];
            const dataIsValid = this.validateAssetData(currAsset); // validate asset data. if not valid, skip asset.
            if(dataIsValid){
                const asset = new Asset(); // create new asset.
                asset.setData(currAsset); // set asset data.
                this.addAsset(asset); // add asset to the controller. asset data is validated and possibly converted to asset before adding to the controller.
            }
        }
    }
    validateAssetData(asset){
        let isValid = true;
        if(!asset.displayName){ // displayName is required.
            DebugHandler.error(`AssetController.validateAssetData: asset has no displayName.`, asset);
            isValid = false;
        }
        if(!asset.type){ // type is required.
            DebugHandler.error(`AssetController.validateAssetData: asset has no type.`, asset);
            isValid = false;
        }
        if(!asset.latlang){ // latlang is required.
            DebugHandler.error(`AssetController.validateAssetData: asset has no latlang.`, asset);
            isValid = false;
        }
        if(!asset.groupName){ // groupName is required.
            DebugHandler.error(`AssetController.validateAssetData: asset has no groupName.`, asset);
            isValid = false;
        }
        return isValid;
    }
    set dataLayers(dataLayers){
        this._dataLayers = dataLayers;
    }
    get dataLayers(){
        return this._dataLayers;
    }
    get assetData(){
        return this._assetData;
    }
    set assetData(assetData){
        this._assetData = assetData;
    }
}