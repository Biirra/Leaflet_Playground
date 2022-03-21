class LeafletMapController{
    _map;
    DEFAULT_COORDINATES = [52.704475, 5.753059];
    DEFAULT_ZOOM_LEVEL = 13;
    constructor(domId){
        this.map = L.map(domId);
        this.init();
    }
    init(){
        this.map.setView(this.DEFAULT_COORDINATES, this.DEFAULT_ZOOM_LEVEL); // set coordinates to some place on startup.

        // leaflet map init stuff.
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/satellite-v9',//'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYmlpcnJhIiwiYSI6ImNrd3drY3Q5NDA0eW8ycHF0dmM3MDgwMWQifQ.2tw1EgExPnfO6KDcbqyqpA'
        }).addTo(this.map);

        this.setInputListeners(); // set Listeners
        
        
        this.addGeoJson();
    }
    async addGeoJson() {
        const response = await fetch("https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson");
        const data = await response.json();
        console.log(data);
        L.geoJson(
            data,{
            style: {
                fillColor: 'none',
                weight: 0.5,
                opacity: 1,
                dashArray: '3',
                fillOpacity: 0.5,
                color: "#ffffff"
            }
        }).addTo(this.map);
    }
    setInputListeners(){
        this.map.on('click', this.onMapClick.bind(this));
    }
    onMapClick(e) {
        this.setMarker(e.latlng);
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
                marker.remove();
            });
        } 
    }
    set map(map){
        this._map = map;
    }
    get map(){
        return this._map;
    }
}
