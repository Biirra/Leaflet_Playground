

class ImportController{
    // retrieve a single item from a outside source.
    static getAsset(itemId){
        const mock_data = MOCK_DATA.assets;
        for(let i = 0; i < mock_data.length; i++){
            if(mock_data[i].name === itemId){
                return mock_data[i];
            }
        }
        return null;
    }
    static getAllAssets(){
        return MOCK_DATA.assets;
    }

    /**
     * Retrieves a geoJson object from a outside source.
     * example link: 
     * https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson // a rough estamate of the country borders.
     * @param {String} geoJsonLink 
     * @param {Object} options Optional. Options for the request.
     */
    static async getAsyncGeoJson(geoJsonLink, options) {
        const response = await fetch(geoJsonLink).catch(e => {
            console.log("Error", e);
          }); // get the geojson file.
        const data = await response.json(); // parse the json file.
        const result = L.geoJson(data, options); // create a L.geoJson object from the parsed json file.
        return result; // return the geoJson object.
    }

    // get a .geJson file from a local folder using xhr.
    static getGeoJsonFromLocal(fileName){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', fileName, true);
        xhr.responseType = 'json';
        xhr.onload = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.response);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(null);
    }
}