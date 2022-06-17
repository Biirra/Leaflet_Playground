
class LeafletDropDown extends L.Control{
    _map;
    _dropDownOptions;
    _defaultOption;
    constructor(options, dropDownOptions, defaultOption){
        super(options);
        this.dropDownOptions = dropDownOptions;
        this.defaultOption = defaultOption;
    }
    
    /**
     * creates options for the dropdown menu from the object of data given.
     * @param {Object} obj 
     * @returns {Array} array of options for the dropdown menu.
     */
    getOptions(obj, defaultChart){
        const keys = Object.keys(obj);
        const result = [];
        for(let i = 0; i < keys.length; i++){
            const key = keys[i];
            const selected = defaultChart === key ? 'selected' : '';
            result.push(`<option value="${key}" ${selected}>${key}</option>`);
        }
        return result;
    }
    onAdd(map){
        // prepare ontainer the dropdown menu will be added to
        const container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control');
        container.style.font = `bold 18px 'Lucida Console', Monaco, monospace`;
    
        // create dropdown menu
        const dropdown = L.DomUtil.create('select', 'leaflet-bar-part leaflet-bar-part-single', container);
        console.log(dropdown);
        dropdown.addEventListener("change", this.onChange.bind(this));
        
        dropdown.style.width = '200px';
        dropdown.style.height = '30px';


        // add options to the dropdown menu
        const options = this.getOptions(this.dropDownOptions, this.defaultOption);
        for(let i = 0; i < options.length; i++){
            dropdown.innerHTML += options[i];
        }
        return container;
    }
    /**
     * Should be overidden by user to handle the change event of the dropdown menu.
     * @param {*} e 
     */
    onChange(e){
        console.warn("onChange function is not overridden by user.");
    }

    onRemove(map){
    
    }
    set map(map){
        this._map = map;
    }
    get map(){
        return this._map;
    }

    set dropDownOptions(dropDownOptions){
        this._dropDownOptions = dropDownOptions;
    }
    get dropDownOptions(){
        return this._dropDownOptions;
    }

    set defaultOption(defaultOption){
        this._defaultOption = defaultOption;
    }
    get defaultOption(){
        return this._defaultOption;
    }
    
}