class Asset {
    _groupName;
    _displayName;
    _coordinates; // the coordinates of the asset in leaflet.
    _checked; // Asset is checked in the map controller
    _extendedData = {}; // attributes that are not part of the data model but are used by the application.
    _icon = LEAFLET_ICONS.ITEM;
    constructor(){

    }
    use(){
        return 'This item has no function.';
    }
    setData(data){
        this._groupName = data.groupName ? data.groupName : null;
        this._displayName = data.displayName ? data.displayName : null;
        this._coordinates = data.latlang ? new Coordinates(data.latlang) : null;
        this._checked = data.checked ? data.checked : false;
        this._extendedData = data.extendedData ? data.extendedData : {};
        this._icon = data.icon ? data.icon : LEAFLET_ICONS.ITEM;

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
}