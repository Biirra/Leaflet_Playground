const LAYER_TYPE = {
    GEOJSON: "geojson",
}
const LAYER_DATA = {
    TOWNSHIP_NETHERLANDS: {
        type: LAYER_TYPE.GEOJSON,
        url: "https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/townships.geojson",
        displayName: "Gemeente's Nederland",
        options: {style: {color: 'red'}}
    },
    PROVINCE_NETHERLANDS: {
        type: LAYER_TYPE.GEOJSON,
        url: "https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/provinces.geojson",
        displayName: "Provincie's Nederland",
        options: {style: {color: 'blue'}}
    }

}