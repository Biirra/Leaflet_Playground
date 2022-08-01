class DataItemView{
    _dataItem;

    _headerData;
    _bodyData;
    _footerData;
    constructor(dataItem){
        this.dataItem = dataItem;
    }

    getView(id){
        // if the view already exists return it.
        const checkIfViewExists = document.getElementById(id);
        if(checkIfViewExists) return checkIfViewExists;

        // create the header
        const headerContainer = document.createElement('div');
        const header = this.createHeader();
        headerContainer.append(header);

        // create the body
        const bodyContainer = document.createElement('div');
        //const body = this.createBody();
        //bodyContainer.append(body);

        // create the footer
        const footerContainer = document.createElement('div');
        const footer = this.createFooter();
        footerContainer.append(footer);

        // create the view for the popup.
        const result = document.createElement('div');
        result.id = id;
        result.append(headerContainer);
        result.append(bodyContainer);
        result.append(footerContainer);

        return result;
    }
    createHeader(){

        const result = document.createElement('div');
        this.headerData = {
            html: result,
        }

        console.log(this.headerData);
        return result;
    }
    createBody(){

        const dataLabelsOfItems = this.getItemDataAsLabel();
        if(Array.isArray(dataLabelsOfItems)){
            for(let i = 0; i < dataLabelsOfItems.length; i++){
                const labelData = dataLabelsOfItems[i];
                console.log(labelData);
                const label = this.createLabel(labelData);
                
                const labelContainer = document.createElement('div');
                labelContainer.append(label);

            }
        }
        const body = document.createElement('div');
        body.append(bodyElements);

        const result = document.createElement('div');
        result.append(body);

        // save data to object.
        this.bodyData = {
            html: result,
        }

        console.log(this.bodyData);
        return result;
    }
    createFooter(){
        
        const footer = document.createElement('div');
        footer.style.height = '0px'; // set to 0px because i have nothing yet to put in the footer. but i want the dashed line.
        footer.style.borderTop = '1px dashed black';
        footer.style.marginLeft = '-18px';
        footer.style.marginRight = '-18px';

        const result = document.createElement('div');
        result.append(footer);

        // save data to object. 
        this.footerData = {
            html: result,
        }
        console.log(this.footerData);
        return result;
    }
    createLabel(labelData){
        const label = document.createElement('label');
        label.innerHTML = labelData.label;
        return label;
    }
    createSelectInput(options){
        const input = document.createElement('select');

        for(let i = 0; i < options.length; i++){
            const option = document.createElement('option');
            option.innerHTML = options[i];
            input.append(option);
        }
        return input;
    }
    set headerData(headerData){
        this._headerData = headerData;
    }
    get headerData(){
        return this._headerData;
    }

    set bodyData(bodyData){
        this._bodyData = bodyData;
    }
    get bodyData(){
        return this._bodyData;
    }

    set footerData(footerData){
        this._footerData = footerData;
    }
    get footerData(){
        return this._footerData;
    }

    set dataItem(dataItem){
        this._dataItem = dataItem;
    }
    get dataItem(){
        return this._dataItem;
    }
    
}