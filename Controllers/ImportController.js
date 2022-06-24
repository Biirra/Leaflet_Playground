

class ImportController{
    // retrieve a single asset from a outside source.
    static getAsset(assetId){
        const mock_data = MOCK_DATA.assets;
        for(let i = 0; i < mock_data.length; i++){
            if(mock_data[i].name === assetId){
                return mock_data[i];
            }
        }
        return null;
    }
    static getAllAssets(){
        return MOCK_DATA.assets;
    }
}