class PersonView{
    _person;
    constructor(person){
        this.person = person;
    }
    createPersonalInfoTable(domParentId){
        const displayPersonalData = {
            honorific       : this.person.honorific,
            firstName       : this.person.firstName,
            prefix          : this.person.prefix,
            lastName        : this.person.lastName,
            birthName       : this.person.birthName,
            birthDay        : this.person.birthDay.toDateString(),
            species         : this.person.species.name,
            gender          : this.person.gender.name,
            health          : this.person.health, 
            height          : this.person.height + ' m',
            weight          : this.person.weight + ' kg',
            bmi             : this.person.bmi,
            alive           : this.person.alive,
        }

        // find dom element.
        const domParent = document.getElementById(domParentId);
        // check if element is found.
        if(!domParent) return ERROR.ELEMENT_NOT_FOUND;
        // add the table for personal view.
        const table = this.createInfoTable(displayPersonalData);
        domParent.append(table);

        return table;
    }
    createWesternAstrologyInfoTable(domParentId){
        const displayWesternAstrologyData = {
            sign            : this.person.starSign.sign,
            gloss           : this.person.starSign.gloss,
            symbolicName    : this.person.starSign.symbolicName,
            uniChar         : this.person.starSign.uniChar,
            sunSignDates    : this.person.starSign.sunSignDates,
            house           : this.person.starSign.house,
            polarity        : this.person.starSign.polarity,
            modality        : this.person.starSign.modality,
            triplicity      : this.person.starSign.triplicity,
            hemisphereSeason: this.person.starSign.hemisphereSeason,
            ruler           : this.person.starSign.ruler,
        }

        // find dom element.
        const domParent = document.getElementById(domParentId);
        // check if element is found.
        if(!domParent) return ERROR.ELEMENT_NOT_FOUND;
        // add the table for personal view.
        const table = this.createInfoTable(displayWesternAstrologyData);
        domParent.append(table);

        return table;
    }
    createChineseAstrologyTable(domParentId){
        const displayChineseAstrologyData = {
            season          : this.person.zodiacSign.season,
            trine           : this.person.zodiacSign.trine,
            yingYang        : this.person.zodiacSign.yingYang,
            name            : this.person.zodiacSign.name,
            element         : this.person.zodiacSign.element.name,
            hourRange       : this.person.zodiacSign.hourRange
        }
        // find dom element.
        const domParent = document.getElementById(domParentId);
        // check if element is found.
        if(!domParent) return ERROR.ELEMENT_NOT_FOUND;
        // add the table for personal view.
        const table = this.createInfoTable(displayChineseAstrologyData);
        domParent.append(table);

        return table;
    }
    createElementAstrologyTable(domParentId){
        const displayElementAstrologyData = {
            name            : this.person.zodiacSign.element.name,
            description     : this.person.zodiacSign.element.description,
            personality     : this.person.zodiacSign.element.personality,
            direction       : this.person.zodiacSign.element.direction,
            season          : this.person.zodiacSign.element.season
        }
        // find dom element.
        const domParent = document.getElementById(domParentId);
        // check if element is found.
        if(!domParent) return ERROR.ELEMENT_NOT_FOUND;
        // add the table for personal view.
        const table = this.createInfoTable(displayElementAstrologyData);
        domParent.append(table);

        return table;
    }
    createInfoTable(data, isInnerTable = false){
        const table = document.createElement('table');
        table.classList = isInnerTable ? 'table' : 'table table-hover';
        table.style.width = isInnerTable ? '100%' : '';

        const tableBody = document.createElement('tbody');
        table.append(tableBody);

        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            const currKey = keys[i];

            const row = document.createElement('tr');
            if(isInnerTable) row.classList += 'innerTable';
            
            // display information on what the data means.
            const columnInfo = document.createElement('th');
            columnInfo.classList = isInnerTable ? '' : 'row';
            columnInfo.innerHTML = `${currKey.toLowerCase().capitalize()} :`;
            row.append(columnInfo);

            const columnData = document.createElement('td');
            // display data
            if(data[currKey] instanceof Object) {
                const innertable = this.createInfoTable(data[currKey], true);
                columnData.append(innertable);
            } else {
                columnData.innerHTML = `${data[currKey]}`;
            }
            row.append(columnData);
            
            tableBody.append(row);
        }
        
        return table;
    }
    set person(person){
        this._person = person;
    }
    get person(){
        return this._person;
    }

}