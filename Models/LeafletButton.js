

class LeafletButton extends L.Control{
    _title = "";
    _innerHTML = "Hello World!";
    _toolTip = "Basic tooltip for the button";
    _height = "30px";
    _width = "150px";
    _cursor = "pointer";
    _icon;

    constructor(options){
        super(options);
        this.width = options.width || this.width;
        this.height = options.height || this.height;
        
    }
    onAdd(map) {

        // prepare ontainer the button will be added to
        const container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control');
        container.style.font = `bold 18px 'Lucida Console', Monaco, monospace`;

        // Creating a button
        var button = L.DomUtil.create('a', '', container);
        button.title = this.title;
        
        button.onclick = this.onClick.bind(this);
        button.style.width = this.width;
        button.style.height = this.height;
        button.style.cursor = this.cursor;

        button.append(LEAFLET_ICONS.ZOOM_ON_CURRENT_LOCATION.createIcon());
        
        return container;
    }
    onRemove(map) {
        // Nothing to do here
    }
    /**
     * Should be overidden by user to handle the click event of the button.
     */
    onClick(){
        console.warn("onClick function is not overridden by user.", this);
    }

    set title(title){
        this._title = title;
    }
    get title(){
        return this._title;
    }
    set innerHTML(innerHTML){
        this._innerHTML = innerHTML;
    }
    get innerHTML(){
        return this._innerHTML;
    }   
    set toolTip(toolTip){
        this._toolTip = toolTip;
    }
    get toolTip(){
        return this._toolTip;
    }
    set height(height){
        this._height = height;
    }
    get height(){
        return this._height;
    }
    set width(width){
        this._width = width;
    }
    get width(){
        return this._width;
    }
    set cursor(cursor){
        this._cursor = cursor;
    }
    get cursor(){
        return this._cursor;
    }
    set icon(icon){
        this._icon = icon;
    }
    get icon(){
        return this._icon;
    }

}