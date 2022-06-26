const DRAW_TOOL_OPTIONS = {
    position: 'topleft',
    draw: {
        polyline: {
            shapeOptions: {
                color: '#FF44FF',
                weight: 4
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
        rectangle: false, // Turns off this drawing tool
        circle: false, // Turns off this drawing tool
        circlemarker: false, // Turns off this drawing tool
        marker: {
            icon: LEAFLET_ICONS.ITEM // Custom icon for markers
        }
        },
        edit: {
            featureGroup: null, //REQUIRED!!
            remove: true
        }
    }

class DrawTool{
    _map;
    _editableLayerGroup;
    _drawControl;
    _options;
    constructor(map, options = DRAW_TOOL_OPTIONS){
        this.map = map;
        this.options = options;
        this.init();
    }
    init(){
        this.createEditableLayerGroup(); //create editableLayerGroup to add drawn layers to.
        this.createDrawControl(); //create drawControl and add it to map 
        this.addListeners(); //add listeners to map to listen for draw events
    }
    createEditableLayerGroup(){
        this._editableLayerGroup = new L.FeatureGroup(); //create editableLayerGroup to add drawn layers to.
        this.options.edit.featureGroup = this.editableLayerGroup; //set drawControl options to use this group.
        this.map.addLayer(this.editableLayerGroup); //add editableLayerGroup to map.
    }
    createDrawControl(){
        this.drawControl = new L.Control.Draw(this.options); //create drawControl. this is the control that will be added to map.
        this.map.addControl(this.drawControl); //add drawControl to map.
    }
    addEditableLayers(layers){
        for(let i = 0; i < layers.length; i++){ 
            const layer = layers[i]; 
            this.addEditableLayer(layer); 
        }
    }
    addEditableLayer(layer){
        this.drawControl.options.edit.featureGroup.addLayer(layer.layer); //add layer to editableLayerGroup. so it can be edited.
        
    }
    addListeners(){
        
        this.map.on('draw:created', this.onDrawCreated.bind(this)); //add listener to map to listen for draw events and call onDrawCreated when a draw is created.

        this.map.on('draw:edited', this.onDrawEdited.bind(this)); //add listener to map to listen for draw events and call onDrawEdited when a draw is edited.

        this.map.on('draw:deleted', this.onDrawDeleted.bind(this)); //add listener to map to listen for draw events and call onDrawDeleted when a draw is deleted.
    }
    onDrawDeleted(e){
        const layers = e.layers;
        layers.eachLayer(function (layer) {
            DebugHandler.log('DrawTool', 'draw:deleted', layer);
            //do whatever you want; most likely save back to db
        });
    }
    onDrawEdited(e){
        const layers = e.layers;
        layers.eachLayer(function (layer) {
            DebugHandler.log('DrawTool', 'draw:edited', layer);
            //do whatever you want; most likely save back to db
        });
    }
    onDrawCreated(e){
        const type = e.layerType;
        const layer = e.layer;    
        DebugHandler.log('DrawTool', 'draw:created', type, layer);
        
        
        layer.bindPopup('A popup!'); //bind popup to layer.
        this.editableLayerGroup.addLayer(layer); //add layer to editableLayerGroup. so it can be edited.
    }
    set map(value){
        this._map = value;
    }
    get map(){
        return this._map;
    }
    get editableLayerGroup(){
        return this._editableLayerGroup;
    }
    set editableLayerGroup(value){
        this._editableLayerGroup = value;
    }
    get drawControl(){
        return this._drawControl;
    }
    set drawControl(value){
        this._drawControl = value;
    }
}