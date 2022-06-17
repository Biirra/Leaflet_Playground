const ERROR = {
    ELEMENT_NOT_FOUND: 'Element not found.'
}


class Person{
    _firstName;
    _birthName;
    _lastName;
    marriedLastName; // TODO
    _prefix;
    _honorific;

    head = HEAD.DEFAULT; // TODO
    body = BODY.DEFAULT; // TODO

    _inventory = new Inventory(); // TODO
    _equipment = []; // TODO: new Equipment();
    _property = new PropertyController(); // TODO
    residense = new Location(); // TODO

    geneticHaritache; // TODO
    _species = SPECIES.HUMAN;
    _gender = GENDER.MALE;
    _sexualPreference = GENDER.FEMALE;
    _birthDay = new Date();
    _alive = true;
    _iq = 100;
    _height = 0;
    _weight = 0;
    personality; // TODO
    _pregnant;

    mbtiType; // https://www.wikihow.com/Determine-Your-Myers-Briggs-Personality-Type

    biologicalFamilyTree; // TODO
    currentFamilyTree; // TODO
    adopted = false; // TODO
    _partner;
    _bioFather;
    _bioMother;
    //role = HOUSEHOLD_ROLE.DEFAULT;
    children = []; // WORKING ON IT
    marriedStatus; // TODO

    profession; // TODO
    alignment; // TODO

    _view;
    constructor(){
        this._view = new PersonView(this);
    }

    /**
     * @param {Object} credentials
     */
    createOffspring(name){
        if(!name) return;
        let result = new Person();

        result.firstName = name;
        // baby gets fathers family name.
        result.prefix = this.gender === GENDER.MALE ? this.prefix : this.partner.prefix;
        result.lastName = this.gender === GENDER.MALE ? this.lastName : this.partner.lastName;

        // set parents of baby
        if(this.gender === GENDER.MALE) result.bioFather = this;
        if(this.gender === GENDER.FEMALE) result.bioMother = this;
        if(this.partner?.gender === GENDER.MALE) result.bioFather = this.partner;
        if(this.partner?.gender === GENDER.FEMALE) result.bioMother = this.partner;
        
        // decide gender of baby
        const genderDecider = Math.random();
        result.gender = genderDecider > 0.001 ? GENDER.NONE : genderDecider > 0.002 ? GENDER.BOTH : genderDecider > 0.501 ? GENDER.MALE : GENDER.FEMALE;

        result.birthDay = new Date();
        return result;
    }
    // make property your own.
    claimProperty(property){
        this.property.push(property)
    }
    /**
     * @param {String} name
     */
    set firstName(name) { this._firstName = name; }
    get firstName() { return this._firstName; }
    /**
     * @param {string} name
     */
    set birthName(name) { this._birthName = name; }
    get birthName() { return this._birthName; }
    /**
     * @param {String} name
     */
    set lastName(name) { this._lastName = name; }
    get lastName() { return this._lastName; }
    /**
     * @param {String} name
     */
    set prefix(name) { this._prefix = name; }
    get prefix() { return this._prefix; }
    /**
     * @param {HONORIFIC:Object} name
     */
    set honorific(hnrfc) { this._honorific = hnrfc; }
    get honorific() { return this._honorific; }
    get fullName() {
        let result = '';
        if(this.firstName) result += this.firstName;
        if(this.prefix) result += ` ${this.prefix}`;
        if(this.lastName) result += ` ${this.lastName}`;
        return result;
    }
    get fullBirthName() {
        let result = '';
        if(this.birthName) result += this.birthName;
        if(this.prefix) result += ` ${this.prefix}`;
        if(this.lastName) result += ` ${this.lastName}`;
        return result;
    }
    get initials() {
        const regex = /\b(\w)/g; // find first letter and letters after spaces
        const found = this.firstName.match(regex);
        let result = '';
        for(let i = 0; i < found.length; i ++){
            result += `${found[i]}.`;
        }
        return result;
    }
    get honorificName() {
        let result = '';
        if(this.honorific) result += this.honorific;
        if(this.prefix) result += ` ${this.prefix}`;
        if(this.lastName) result += ` ${this.lastName}`;
        return result;
    }

    /**
     * @param {Person} partner
     */
    set partner(partner) { this._partner = partner; }
    get partner() { return this._partner; }
    /**
     * @param {Person} mother
     */
    set bioMother(mother) { this._bioMother = mother; }
    get bioMother() { this._bioMother; }
    /**
     * @param {Person} father
     */
    set bioFather(father) { this._bioFather = father; }
    get bioFather() { return this._bioFather; }
    
    /**
     * @param {Boolean} bool
     */
    set pregnant(bool) {
        if(!this.gender || this.gender === GENDER.MALE || this.gender === GENDER.NONE) return; // people without FEMALE organs cant get pregnant.
        this._pregnant = bool;
    }
    get pregnant() {
        if(!this.gender || this.gender === GENDER.MALE || this.gender === GENDER.NONE) return false; // people without FEMALE organs cant get pregnant.
        return this._pregnant;
    }

    /**
     * @param {SPECIES:Object} species
     */
    set species(species) { this._species = species; }
    get species() { return this._species; }
    /**
     * @param {String} date
     */
    set birthDay(date){ this._birthDay = new Date(date); }
    get birthDay() { return this._birthDay; }
    /**
     * @param {Number} iq
     */
    set iq(iq) { this._iq = iq; }
    get iq() { return this._iq; }
    /**
     * @param {Number} height
     */
    set height(height) { 
        if(height < 3) { // No human is longer than 3 meters
            this._height = height; 
            return;
        }
        this._height = height / 100;
    }
    get height() { return this._height; }
    /**
     * @param {Number} weight
     */
    set weight(weight) { this._weight = weight; }
    get weight() { return this._weight; }

    /**
     * @param {gender:Object} gender
     */
    set gender(gender) { this._gender = gender; }
    get gender() { return this._gender; }
    /**
     * @param {gender:Object} gender
     */
    set sexualPreference(gender) { this._sexualPreference = gender; }
    get sexualPreference() { return this._sexualPreference; }

    get age() { return new Date().getFullYear() - this.birthDay.getFullYear(); }
    get alive() {
        // also consider health, SPECIES and age.
        return this._alive; 
    }
    get bmi() { return this.weight / Math.pow(this.height,2) || 0; }
    get health () {
        const bmi = this.bmi;
        if(bmi < 16.0) return 'Underweight (Severe thinness)';
        if(bmi >= 16.0 && bmi <= 16.9) return 'Underweight (Moderate thinness)';
        if(bmi >= 17.0 && bmi <= 18.4) return 'Underweight (Mild thinness)';
        if(bmi >= 18.5 && bmi <= 24.9) return 'Normal range';
        if(bmi >= 25.0 && bmi <= 29.9) return 'Overweight (Pre-obese)';
        if(bmi >= 30.0 && bmi <= 34.9) return 'Obese (Class I)';
        if(bmi >= 35.0 && bmi <= 39.9) return 'Obese (Class II)';
        if(bmi > 40.0) return 'Obese (Class III)';
    }

    get property() {
        return this._property;
    }
    
    get personalityNumber() {
        // https://seventhlifepath.com/how-to-calculate-personality-number/

        let name = this.fullBirthName.replace(/[aeiouAEIOU]/g, ''); // remove vowels
        name = name.split(" ");
        const positions = [] // contains the alphabet index of all the letters in the name.
        for(let i = 0; i < name.length; i++){
            positions[i] = String.getCharacterPositionsInAlphabet(name[i]); // get positions in alphabet.
        }

        let sum = [];
        for (let i = 0; i < positions.length; i++) {
            for(let j = positions[i].length-1; j >= 0 ; j--) {
                const currentDigit = positions[i][j];
                // we dont need 0's
                if(currentDigit === 0){
                    positions[i].splice(j,1); 
                    continue;
                }
                positions[i][j] = Math.colapseNumber(currentDigit);
            }
            sum[i] = positions[i].reduce((partialSum, a) => partialSum + a, 0);
        }
        sum = sum.reduce((partialSum, a) => partialSum + a, 0);
        return Math.colapseNumber(sum) || 0;
    }
    get personalityNumberMeaning() {
        return NUMERIC_PERSONALITY_MEANING[this.personalityNumber];
    }
    get starSign() {
        // https://en.wikipedia.org/wiki/Astrological_sign
        return WesternAstrology.getStarSign(this.birthDay);
    }
    get zodiacSign() {
        return ChineseAstrology.getZodiacSign(this.birthDay.getFullYear());
    }

    /**
     * @param {Array} property
     */
    set property(property){
        this._property = property;
    }
    get property() {
        return this._property;
    }
    /**
     * @param {Array} inventory
     */
    set inventory(inventory){
        this._inventory = inventory;
    }
    get inventory() {
        return this._inventory;
    }
    /**
     * @param {Array} equipment
     */
    set equipment(equipment){
        this._equipment = equipment;
    }
    get equipment() {
        return this._equipment;
    }

    get view(){
        return this._view;
    }
}
/**
 * collapses a number. 
 * For example: 
 * 24 = 2 + 4 = 6 
 * // return 6
 * @param {Number} number 
 * @returns Number
 */
Math.colapseNumber = function(number){
    let tens = 0;
    while(number > 9){
        number -= 10;
        tens++;
    }
    let result = tens + number;
    if(result > 9){
        result = this.colapseNumber(result);
    }
    return result;
}
/**
 * Returns a array of positions from the letters in the alphabet.
 * NOTE: Returns 0 if character is not found in given alphabet. 
 * @param {String} input
 * @param {String} alphabet - optional
 * @returns Array[ Number, ... ]
 */
 String.getCharacterPositionsInAlphabet = function(input, alphabet = 'abcdefghijklmnopqrstuvwxyz'){
    const result = [];  // contains the alphabet index of all the letters in the name.
    for(let i = 0; i < input.length; i++) { // for each letter in the name
        const lowercaseLetter = input[i].toLowerCase(); // get lowercase letter
        const charIndex = alphabet.indexOf(lowercaseLetter) + 1; // get index of letter in alphabet
        result.push(charIndex); // add index to result
    }
    return result;
}

// Mr, Mrs, Miss, Ms, Mx, Sir, Dr, Cllr, Lady or Lord
const HONORIFIC = {
    NONE: "",
    MR: "Mr.",
    MRS: "Mrs.",
    MISS: "Miss",
    MS: 'Ms.',
    MX: 'Mx.',
    SIR: 'Sir',
    DR: 'Dr',
    CLLR: 'Cllr.',
    LADY: 'Lady',
    LORD: 'Lord',
    MASTER: 'Master',
    MISSUS: 'Missus'
}

/**
 * Head visuals
 */
const HAIR = {
    DEFAULT: {
        color: null,//new Color(0,0,0,0),
        style: null,

    }
}
const EYES = {
    DEFAULT: {
        color: null,
        eyeLashes: null
    }
}
const EARS = {
    DEFAULT: {
        size: null
    }
}
const NOSE = {
    DEFAULT: {
        size: null
    }
}
const MOUTH = {
    DEFAULT: {

    }
}
const HEAD = {
    DEFAULT: {
        hair: HAIR.DEFAULT,
        eyes: EYES.DEFAULT,
        ears: EARS.DEFAULT,
        nose: NOSE.DEFAULT,
        mouth: MOUTH.DEFAULT
    }
}

/**
 * Body visuals
 */
const ARM = {
    DEFAULT: {

    }
}
const LEG = {
    DEFAULT: {

    }
}
const TORSO = {
    DEFAULT: {

    }
}
const GROIN = {
    DEFAULT: {

    }
}
const BUTTOCKS = {
    DEFAULT: {

    }
}
const BODY = {
    DEFAULT: {
        leftArm: ARM.DEFAULT,
        rightArm: ARM.DEFAULT,
        leftLeg: LEG.DEFAULT,
        rightLeg: LEG.DEFAULT,
        torso: TORSO.DEFAULT,
        groin: GROIN.DEFAULT,
        buttocks: BUTTOCKS.DEFAULT
    }
}

 const SPECIES = {
    HUMAN: {
        name: 'Human'
    },
    ORC: {

    },
    ELF: {

    },
    DWARF: {

    },
    UNDEAD: {

    }
}
const GENDER = {
    MALE: {
        name: 'Male'
    },
    FEMALE: {
        name: 'Female'
    },
    NONE: {
        name: 'Neither'
    },
    BOTH: {
        name: 'Hermaphrodite'
    }
}

const NUMERIC_PERSONALITY_MEANING = {
    1: `Those with Personality Number 1 give off an ambitious and dynamic energy. You appear determined, strong willed, in control, and capable of achieving whatever you set your mind to, and as such others are less likely to see you as a pushover. Be wary of being perceived as egotistical, unreceptive, and intimidating.`,
    2: `Those with Personality Number 2 are often seen as friendly, trustworthy, reliable, warm, and unpretentious. You tend to appear more open and approachable, and as a result people are more likely to be drawn to you and ask you for help or assistance. Be wary of being perceived as indecisive and a pushover by some.`,
    3: `Those with Personality Number 3 are often seen as creative and charming individuals, making them more attractive to the opposite sex. You are likely perceived as witty, extroverted, and optimistic, with an uplifting energy. Be wary of over exaggerating, and appearing superficial to some.`,
    4: `Those with Personality Number 4 are seen as being very reliable, stable, consistent, organized , and efficient by others. As such people are more likely to trust you as a person, as well as your judgment and ability to get things done, especially when it comes to making tough business decisions. Be wary of appearing too frugal, predictable and overly serious.`,
    5: `Those with Personality Number 5 tend to appear more adventurous, stimulating, passionate and witty. Your freedom loving and adventurous personality is often the envy of others and you can be an inspiring influence on those around you. Because you can seem aloof, some may not think of you as a dependable or a reliable person. Be wary of appearing superficial, and try to be more grounded.`,
    6: `Those with Personality Number 6 are often seen as warm, compassionate, caring, self sacrificing and willing to help others. As such people often approach you for a shoulder to cry on, or relate their life's burdens. You are seen as easy going, but because you are also more agreeable and see the good in people, some may try to take advantage of you.`,
    7: `Those with Personality Number 7 tend to appear more secretive, introverted, even mysterious and different. Because you seem so withdrawn, people find it harder to get to know the true you. You have a serious, independent and intelligent aura, and as such others are likely to trust and respect you. Be wary of appearing too opinionated and arrogant.`,
    8: `Those with Personality Number 8 are often seen as strong, ambitious, competitive, competent, and confident. You can project an aura of authority and power, and people tend to see you as being well rounded and grounded, with good decision making abilities and business sense. Be wary of appearing too egocentric and greedy.`,
    9: `Those with Personality Number 9 give off a charismatic and somewhat aristocratic appearance. People see you as being in control, with positive and idealistic opinions and ideas, and as such you can inspire and influence those around you, gaining following and admiration. Be wary of seeming arrogant and above others.`
}


class RPG_Properties {
    _defense = 0;  
    _attack = 0;    

    /**
     * strength and dexterety are what forms the speed in general
     * Luck adds a little speed because for example: having the wind in your back or not walking in soft earth by coincidence
     * Intelligence is subtracted from luck because overthinking things takes more time than just thinking
     * Wisdom counteracts this cause even a fool learns from experience.
     */
    _speed = 0; // strength * dexterity / 2 + (luck / (intelligence - wisdom)) 

    _constitution = 0;      // Constitution is the ability to withstand and resist physical harm.
    _dexterity = 0;         // Dexterity is the ability to avoid attacks and to move around.
    _intelligence = 0;      // Intelligence is the ability to think logically and to reason.
    _luck = 0;              // Luck is the ability to overcome difficulties.
    _strength = 0;          // Strength is the ability to lift and carry heavy things.
    _wisdom = 0;            // Wisdom is the ability to understand the meaning of things.
    _charisma = 0;          // Charisma is the ability to interact with people.

     
    

}