class Location{
    _street;
    _houseNumber;
    _houseNumberAddition;
    _postalCode;
    _city;
    _country;
    _provinse;

    _coordinates = new Coordinates();

    /**
     * @param {String} street
     */
    set street(street) {
        this._street = street;
    }
    get street(){
        return this._street;
    }

    /**
     * @param {String} houseNumber
     */
    set houseNumber(houseNumber) {
        this._houseNumber = houseNumber;
    }
    get houseNumber(){
        return this._houseNumber;
    }
    set houseNumberAddition(houseNumberAddition){
        this._houseNumberAddition = houseNumberAddition;
    }
    get houseNumberAddition(){
        return this._houseNumberAddition;
    }

    /**
     * @param {String} postalCode
     */
    set postalCode(postalCode) {
        this._postalCode = postalCode;
    }
    get postalCode(){
        return this._postalCode;
    }

    set provinse(name) {
        this._provinse = new Provinse(name);
    }
    get provinse() {
        return this._provinse;
    }

    /**
     * @param {number[]} coordinates
     */
    set coordinates(coordinates){
        this._coordinates = new Coordinates(coordinates);
    }
    get coordinates() {
        return this._coordinates;
    }

    set country(countryCode) {
        this._country = new Country(countryCode);
    }
    get country(){
        if(this._country) return this._country;
        if(this._provinse?.country?.code) return new Country(this.provinse.country.code);
        return null;
    }
}

class Coordinates{
    _lat;
    _long;
    _alt;
    constructor(latlang = [0,0,0]){
        this.lat = latlang[0];
        this.long = latlang[1];
        this.alt = latlang[2];
    }
    set lat(lat){
        this._lat = lat;
    }
    get lat(){
        return this._lat;
    }

    set long(long) {
        this._long = long;
    }
    get long() {
        return this._long;
    }

    set alt(alt) {
        this._alt = alt;
    }
    get alt(){
        return this._alt;
    }

    get latlng() {
        return [this._lat, this._long];
    }
}