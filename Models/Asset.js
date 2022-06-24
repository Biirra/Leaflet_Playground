class Asset {
    _assetId;
    _layerGroupId; // contains the id of the layergroup that this item is in. Important for leaflet layergroups.
    _layerGroupIdParent; // contains the id of the layergroup that this item is in. Important for leaflet layergroups. Group the layers in the layergroup.
    _coordinates; // the coordinates of the asset in leaflet.
    _visible; // Asset is visible in the map if it is added to a layergroup and is visible in the layergroup.
    _extendedData = {}; // attributes that are not part of the data model but are used by the application.
    _icon = LEAFLET_ICONS.ITEM;
    constructor(){
    }
    use(){
        return 'This item has no function.';
    }
    setData(data){
        this._assetId = data.name ? data.name : null;
        this._layerGroupId = data.layerGroupId ? data.layerGroupId : null;
        this._coordinates = data.location ? new Coordinates(data.location) : null;
        this._visible = data.visible ? data.visible : true;
        this._layerGroupIdParent = data.layerGroupIdParent ? data.layerGroupIdParent : null;
    }

    get layerGroupIdParent(){
        return this._layerGroupIdParent;
    }
    set layerGroupIdParent(layerGroupIdParent){
        this._layerGroupIdParent = layerGroupIdParent;
    }

    get assetId(){
        return this._assetId;
    }
    set assetId(assetId){
        this._assetId = assetId;
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
    get visible(){
        if(this._visible && this._layerGroupId){
            return this._visible;
        }
        return false;
    }
    set visible(visible){
        this._visible = visible;
    }
    set coordinates(coordinates){
        this._coordinates = new Coordinates(coordinates);
    }
    get coordinates() {
        return this._coordinates;
    }
}