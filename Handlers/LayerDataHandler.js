


const LAYER_DATA = [
    /**
     * Minimal Leaflet required data layer.
     * {
     *      displayName: "Country Borders",
     *      groupName: "Country Borders",
     *      url: "https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson",
     *      layer: null,
     *      options: {
     *          style: {color: 'red'}
     *      }
     * }
     */
    {
        displayName: "Gemeente's Nederland",
        groupName: "aSync GeoJson",
        url: "https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/townships.geojson",
        layer: null,
        options: {
            style: {color: 'red'}
        }
    },
    {
        displayName: "Provincie's Nederland",
        groupName: "aSync GeoJson",
        url: "https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/provinces.geojson",
        layer: null,
        options: {
            style: {color: 'blue'}
        }
    },

]

const GROUPED_LAYER_DATA = [
    {
        groupName : "async GeoJSON",
        expanded  : true,
        layers    : { 
        }	
     }
];