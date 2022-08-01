
/**
 * This class holds the data for a data Item. It is build as a base DataItem class which is extended by the specific data item classes.
 * for example, the data item class for a asset is AssetDataItem. The data item class for a SR is SRDataItem.
 */
class DataItem {
    _itemId;
    _view; 
    _groupName; // the name of the group the dataItem belongs to.
    
    _layerName; // the name of the layer it is drawn to. In case of a marker, this is null. A marker is its own layer.
    _layerType; // contains the type of the layer. For example, LAYER_TYPE.POINT, LAYER_TYPE.POLYLINE, LAYER_TYPE.POLYGON.
    _layer; //  the layer it is drawn to.

    _displayName; 
    _coordinates; // the coordinates of the dataItem in leaflet.
    _checked; // Asset is checked in the map controller
    _extendedData = {}; // attributes that are not part of the data model but are used by the application.
    _icon;
    _popup = null;
    _marker;
    constructor(view, options){
        this._view = view;
        this._groupName = options.groupName ? options.groupName : null; // groupName is required. 
        this._layerName = options.layerName ? options.layerName : null; // layerName is required.
        this._coordinates = options.latlang ? new Coordinates(options.latlang) : null; // latlang is required.
        this._layerType = options.layerType ? options.layerType : null; // layerType is required.

        this._displayName = options.displayName ? options.displayName : "Placeholder display name."; // displayName is optional.
        this._checked = options.checked ? options.checked : false; // checked is optional.
        this._extendedData = options.extendedData ? options.extendedData : {}; // extendedData is optional.
        this._icon = options.icon ? options.icon : LEAFLET_ICONS.ITEM; // icon is optional.
        this._popup = options.popup ? options.popup : null; // popup is optional.

        if(this.coordinates || (this.coordinates && this.icon))this._marker = L.marker([this.coordinates.lat, this.coordinates.lng], {icon: this.icon});
        this._layer = options.layer ? options.layer : this.marker; // layer is optional.
        this.init();
    }

    init(){
        this.layer.bindPopup(this.popup);
    }

    validate(){
        let isValid = true;
        if(!this.layerName){ // layerName is required.
            DebugHandler.error(`ItemController.validateItemData: item has no layerName.`, this);
            isValid = false;
        }
        if(!this.groupName){ // groupName is required.
            DebugHandler.error(`ItemController.validateItemData: item has no groupName.`, this);
            isValid = false;
        }
        if(!this.coordinates){ // latlang is required.
            DebugHandler.error(`ItemController.validateItemData: item has no coordinates.`, this);
            isValid = false;
        }
        if(!this.layerType){ // latlang is required.
            DebugHandler.error(`ItemController.validateItemData: item has no layerType.`, this);
            isValid = false;
        }
        return isValid;
    }
    
    get view(){
        return this._view;
    }
    set view(view){
        this._view = view;
    }

    get groupName(){
        return this._groupName;
    }
    set groupName(groupName){
        this._groupName = groupName;
    }
    get extendedData(){
        return this._extendedData;
    }
    set extendedData(extendedData){
        this._extendedData = extendedData;
    }
    get displayName(){
        return this._displayName;
    }
    set displayName( displayName ) {
        this._displayName = displayName;
    }
    get layerGroupId(){
        return this._layerGroupId;
    }
    set layerGroupId(layerGroupId){
        this._layerGroupId = layerGroupId;
    }
    set icon(icon){
        this._icon = icon;
    }
    get icon(){
        return this._icon;
    }
    get checked(){
        return this._checked;
    }
    set checked(checked){
        this._checked = checked;
    }
    set coordinates(coordinates){
        this._coordinates = new Coordinates(coordinates);
    }
    get coordinates() {
        return this._coordinates;
    }
    get popup(){
        return this._popup;
    }
    set popup(popup){
        this._popup = popup;
    }
    get marker(){
        return this._marker;
    }
    set marker(marker){
        this._marker = marker;
    }
    get itemId(){
        return this._itemId;
    }
    set itemId(itemId){
        this._itemId = itemId;
    }
    get layerName(){
        return this._layerName;
    }
    set layerName(layerName){
        this._layerName = layerName;
    }
    get layer(){
        return this._layer;
    }
    set layer(layer){
        this._layer = layer;
    }
    get layerType(){
        return this._layerType;
    }
    set layerType(layerType){
        this._layerType = layerType;
    }
}