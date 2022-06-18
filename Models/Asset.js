class Asset {
    itemID;
    itemName;
    weigth;
    stealPenalty = 0;

    _existsInMap;
    _coordinates;
    _icon = LEAFLET_ICONS.ITEM;
    constructor(){
        this.existsInMap = true;
    }
    use(){
        return 'This item has no function.';
    }
    set icon(icon){
        this._icon = icon;
    }
    get icon(){
        return this._icon;
    }
    set coordinates(coordinates){
        this._coordinates = new Coordinates(coordinates);
    }
    get coordinates() {
        return this._coordinates;
    }
    set existsInMap(existsInMap){
        this._existsInMap = existsInMap;
    }
    get existsInMap(){
        return this._existsInMap;
    }
}