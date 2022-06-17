class Animal{
    _age;
    _species;
    _icon;
}

class Dog extends Animal{
    _breed;
    constructor(age){
        super();
        this._age = age;
        this._species = 'Dog';
    }
}

class Cat extends Animal{
    constructor(age){
        super();
        this._age = age;
        this._species = 'Cat';
    }
}

class Pet extends Animal{
    _name;
    _owner;
    get owner(){
        return this._owner;
    }
    set owner(owner){
        this._owner = owner;
    }
}