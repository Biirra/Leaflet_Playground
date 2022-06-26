


class LeafletMapController{
    _map;    
    _layerControl;
    _drawTool;
    _buttonZoomInOnCurrLocation;
    constructor(mapData){
        this._map = mapData.map; //L.map(domId);
        this.init();
    }
    init(){
        this.createUI(); // create the UI.
        
    }

    createUI(){

        // Add the layer controller to the map. This will allow the user to switch between Layers.
        // This creates the button. Docs: (https://leafletjs.com/examples/layers-control/)
        this._layerControl = new LayerControl(this.map);

        // create a button to zoom in on current location.
        this._buttonZoomInOnCurrLocation = this.createButtonZoomInOnCurrLocation();
        this.buttonZoomInOnCurrLocation.addTo(this.map);

        // create the drawTool. This will allow the user to draw on the map.
        this._drawTool = new DrawTool(this.map);
        // drawTool.addEditableLayers(leafletDataLayers);
    }

    

    createButtonZoomInOnCurrLocation(){

        const button = new LeafletButton({
            position: "topleft",
            icon: LEAFLET_ICONS.ZOOM_ON_CURRENT_LOCATION,
            width: '32px',
            height: '32px',
        }); // create a new button

        const zoomInOnUserLocation = () => { // create a function that will be called when the button is clicked
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    const latlng = L.latLng(position.coords.latitude, position.coords.longitude);
                    this.map.setView(latlng, 15);
                });
            }
        }

        button.onClick = zoomInOnUserLocation; // set the onClick event for the button. This will be called when the button is clicked.
        return button;
    }

    set layerControl(layerControl){
        this._layerControl = layerControl;
    }
    get layerControl(){
        return this._layerControl;
    }

    get drawTool(){
        return this._drawTool;
    }
    set drawTool(drawTool){
        this._drawTool = drawTool;
    }

    get buttonZoomInOnCurrLocation(){
        return this._buttonZoomInOnCurrLocation;
    }
    set buttonZoomInOnCurrLocation(buttonZoomInOnCurrLocation){
        this._buttonZoomInOnCurrLocation = buttonZoomInOnCurrLocation;
    }

    set map(map){
        this._map = map;
    }
    get map(){
        return this._map;
    }

}







