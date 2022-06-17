class Household{
    _headOfHousehold;
    _persons = [];
    _home = new House();
    
    // create getters and setters
    get headOfHousehold(){
        return this._headOfHousehold;
    }
    set headOfHousehold(headOfHousehold){
        this._headOfHousehold = headOfHousehold;
    }
    get persons(){
        return this._persons;
    }
    set persons(persons){
        this._persons = persons;
    }
    get home(){
        return this._home;
    }
    set home(home){
        this._home = home;
    }
}