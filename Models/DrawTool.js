const DRAW_TOOL_OPTIONS = {
    position: 'topleft',
    draw: {
        polyline: {
            shapeOptions: {
                color: '#f357a1',
                weight: 10
            }
        },
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)' // Message that will show when intersect
            },
            shapeOptions: {
                color: '#bada55'
            }
        },
        circle: true, // Turns off this drawing tool
        rectangle: {
            shapeOptions: {
                clickable: true
            }
        },
        marker: {
            icon: LEAFLET_ICONS.ITEM
        }
        },
        edit: {
            featureGroup: null, //REQUIRED!!
            remove: true
        }
    }

class DrawTool{
    _map;
    _editableLayers;
    _drawControl;
    _options;
    constructor(map, options = DRAW_TOOL_OPTIONS){
        this.map = map;
        this.options = options;
        this.init();
    }
    init(){
        this.createEditableLayers();
        this.createDrawControl();
        this.addListeners();
    }
    createEditableLayers(){
        this.editableLayers = new L.FeatureGroup();
        this.options.edit.featureGroup = this.editableLayers;
        this.map.addLayer(this.editableLayers);
    }
    createDrawControl(){
        this.drawControl = new L.Control.Draw(this.options);
        this.map.addControl(this.drawControl);
    }
    addListeners(){
        const addPopupOnMarker = (e) => {
            const type = e.layerType;
            const layer = e.layer;    
            console.log(type);
            console.log(layer.toGeoJSON());
            if (type === 'marker') {
                //layer.bindPopup('A popup!');
            }
            layer.bindPopup('A popup!');
            this.editableLayers.addLayer(layer);
        }
        this.map.on('draw:created', addPopupOnMarker.bind(this));

        this.map.on('draw:edited', function (e) {
            var layers = e.layers;
            layers.eachLayer(function (layer) {
                //do whatever you want; most likely save back to db
            });
        });
    }
    set map(value){
        this._map = value;
    }
    get map(){
        return this._map;
    }
    get editableLayers(){
        return this._editableLayers;
    }
    set editableLayers(value){
        this._editableLayers = value;
    }
    get drawControl(){
        return this._drawControl;
    }
    set drawControl(value){
        this._drawControl = value;
    }
}