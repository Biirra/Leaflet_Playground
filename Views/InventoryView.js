class InventoryView{
    _inventory;
   constructor(inventory){
       this._inventory = inventory;
   }
   createInventoryView(domParentId) {
        // find dom element.
        const domParent = document.getElementById(domParentId);
        // check if element is found.
        if(!domParent) return ERROR.ELEMENT_NOT_FOUND;
        domParent.innerHTML = '';

        if(this.inventory.items.length === 0) return;

        const title = document.createElement('h3');
        title.innerHTML = 'Inventory:';
        domParent.append(title);

        const table = document.createElement('table');
        table.style.width = '50%';
        domParent.append(table);

        for (let i = 0; i < this.inventory.items.length; i++) {
            const currItem = this.inventory.items[i];
            
            const icon = document.createElement('div');
            icon.style.width = '30px';
            icon.style.height = '30px';
            icon.style.backgroundColor = 'blue';
            const iconColumn = document.createElement('td');
            iconColumn.append(icon);

            const name = document.createElement('h3');
            name.style.margin = '0';
            name.innerHTML = `${currItem.name}`
            const nameColumn = document.createElement('td');
            nameColumn.append(name);
            
            const useBtn = document.createElement('button');
            useBtn.innerHTML = 'Use'
            useBtn.onclick = currItem.use.bind(currItem);
            const useBtnColumn = document.createElement('td');
            useBtnColumn.append(useBtn);

            const dropBtn = document.createElement('button');
            dropBtn.innerHTML = 'Drop';
            const dropBtnColumn = document.createElement('td');
            dropBtnColumn.append(dropBtn);

            const row = document.createElement('tr');
            row.append(iconColumn);
            row.append(nameColumn);
            row.append(useBtnColumn);
            row.append(dropBtnColumn);

            table.append(row)
        }

        return table;
   }
   get inventory(){
       return this._inventory;
   }
}