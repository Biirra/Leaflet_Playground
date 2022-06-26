class Asset {
    _groupName; // the name of the group the asset belongs to.
    _displayName; 
    _coordinates; // the coordinates of the asset in leaflet.
    _checked; // Asset is checked in the map controller
    _extendedData = {}; // attributes that are not part of the data model but are used by the application.
    _icon = LEAFLET_ICONS.ITEM;
    _popup = null;
    constructor(){

    }
    use(){
        return 'This item has no function.';
    }
    setData(data){
        this._groupName = data.groupName ? data.groupName : null; // groupName is required. 
        this._displayName = data.displayName ? data.displayName : null; // displayName is required.
        this._coordinates = data.latlang ? new Coordinates(data.latlang) : null; // latlang is required.
        this._checked = data.checked ? data.checked : false; // checked is optional.
        this._extendedData = data.extendedData ? data.extendedData : {}; // extendedData is optional.
        this._icon = data.icon ? data.icon : LEAFLET_ICONS.ITEM; // icon is optional.

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
}