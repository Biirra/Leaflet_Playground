class LeafletLayerControlButton extends L.control{
    constructor(options){
        super(options);
        console.log("Layercontroller loaded");
    }
    onAdd(map){
        // prepare ontainer the dropdown menu will be added to
        const container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar leaflet-control');
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
}