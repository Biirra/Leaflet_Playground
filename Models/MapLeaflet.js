class MapLeaflet{
    _map;
    _currentChart = null;
    constructor(domId){
        var mapOptions = {
            // turned off because this should exist in a config file.
            // docs: https://www.tutorialspoint.com/leafletjs/leafletjs_controls.htm#:~:text=Zoom%20%E2%88%92%20By%20default%2C%20this%20control,the%20map%20options%20to%20false.
            // zoomControl: false, // remove the zoom control
            // attributionControl: false,   // remove the attribution control
            drawControl: false, // is added to the map by the LeafletMapController.
         }
        this._map = L.map(domId, mapOptions);

    }
    getMapByName(name){
        return WORLD_MAPS[name];
    }
    /**
     * belongs perhaps in a separate class.
     * change the current Chart to the one selected and update the map.
     * @param {String} chartname Optional. If not set, the DEFALT_CHART chart will be used.
     */
     changeWorldMap(chartname){
        if(this.currentChart) this.currentChart.remove(this.map); // remove the current chart if there is one.
        if(chartname){
            this.currentChart = this.getMapByName(chartname); // set the current chart to the one selected in the dropdown menu.
        } else if(DEFAULT_CHART){
            this.currentChart = this.getMapByName(DEFAULT_CHART); // set the current chart to the default chart.
        } else {
            console.error('No default chart set.'); // if no default chart is set, throw an error.
        }
        this.currentChart.addTo(this.map); // add the current chart to the map.
    }
    getAllPosibleMapKeys(){
        return Object.keys(WORLD_MAPS); // return all the keys of the WORLD_MAPS object.
    }
    getAllPosibleMaps(){
        const keys = Object.keys(WORLD_MAPS);
        const result = [];
        for(let i = 0; i < keys.length; i++){
            const key = keys[i];
            result.push(WORLD_MAPS[key]);
        }
        return result;
    }
    setPopup(latlng, msg = '') {
        const popup = L.popup({
            closeOnClick: false,
            autoClose: false
          });
        popup.setLatLng(latlng)
            .setContent(msg)
            .openOn(this.map);
    }
    setMarker(latlng, obj, onClick){
        // Creating a marker 
        const marker = L.marker();
        if(obj?.icon) marker.setIcon(obj.icon);

        if(obj){
            const map = this.map;
            this.map.on('zoomend', function() {
                if(!obj.existsInMap) return;
                
                if (map.getZoom() < obj.coordinates.alt)
                    marker.remove();
                else 
                    marker.addTo(map);
            });
        }
        // Adding marker to the map
        marker.setLatLng(latlng);

        if(onClick){
            // applying onclick functionality
            marker.on('click', () => {
                onClick();
            });
        } 
    }
    onMapClick(e) {
        this.setMarker(e.latlng);
    }
    get map(){
        return this._map;
    }
    set map(map){
        this._map = map;
    }
    
    get currentChart(){
        return this._currentChart;
    }
    set currentChart(chart){
        this._currentChart = chart;
    }
}