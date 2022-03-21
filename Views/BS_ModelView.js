class ModalView{
    _modalId;
    _headerData;
    _bodyData;
    constructor(modalId, headerData, bodyData){
        this.modalId = modalId
        this.headerData = headerData;
        this.bodyData = bodyData;
    }

    set bodyData(bodyData){
        this._bodyData = bodyData;
    }
    get bodyData(){
        return this._bodyData;
    }

    set headerData(headerData){
        this._headerData = headerData;
    }
    get headerData() {
        return this._headerData;
    }

    set modalId(id){
        this._modalId = id;
    }
    get modalId(){
        return this._modalId;
    }
    get modalView(){
        return ModalView.getModalView(this.modalId, this.headerData, this.bodyData);
    }
    static getModalView(modalId, headerData, bodyData){

        const checkIfModalExists = document.getElementById(modalId);
        if(checkIfModalExists) return checkIfModalExists;

        const modal = document.createElement('div');
        modal.id = modalId;
        modal.classList += 'modal';
        modal.tabIndex = -1;
        modal.role = 'dialog';
        
        const dialog = document.createElement('div');
        dialog.classList += 'modal-dialog';
        dialog.role = 'document';
        modal.append(dialog);

        const content = document.createElement('div');
        content.classList += 'modal-content';
        dialog.append(content);

        if(headerData) {
            const header = document.createElement('div');
            header.classList += 'modal-header';
            header.append(headerData);
            content.append(header);
        }
        if(bodyData) {
            const body = document.createElement('div');
            body.classList += 'modal-body';
            body.append(bodyData);
            content.append(body);            
        }

        const footer = document.createElement('div');
        footer.classList += 'modal-footer';
        content.append(footer);

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.classList += "btn btn-secondary";
        closeBtn.onclick = () => { modal.style.display = 'block' };
        content.append(closeBtn);

        return modal;
    }
}