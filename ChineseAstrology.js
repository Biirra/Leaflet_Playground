class ChineseAstrology{
    
    constructor() {

    }
    static getZodiacSign(birthYear) {
        let result = null;
        let year = STARTCOUNT_CHINESECALENDER_YEAR;
        let zodiacSignKeys = Object.keys(ZODIAC_SIGN);
        // every Number years it loops.
        let count = 0;
        let correctKey;
        while(year <= birthYear){

            correctKey = zodiacSignKeys[count];

            year++;
            count++;
            if(count === YEARS_AFTER_ZODIAC_SIGNS_LOOP) {
                count = 0;
            }
        }
        result = ZODIAC_SIGN[correctKey]
        return result;
    }
}

const STARTCOUNT_CHINESECALENDER_YEAR = 1900;
const YEARS_AFTER_ZODIAC_SIGNS_LOOP = 12;
const ELEMENTS = {
    WOOD: {
        name: 'Wood',
        description: '',

        personality: 'The wood person has high morals, is self-confident, expansive and co-operative, with wide and varied interests and idealistic goals.',
        direction: 'The direction associated with Wood is East',
        season: 'Spring',
        //Yang wood years end in four (e.g. 1974).
        //Yin wood years end in five (e.g. 1975).
    },
    FIRE: {
        name: 'Fire',
        description: '',
        
        personality: 'The fire person has leadership qualities, dynamic passion, and is decisive, self-confident, positive, and assertive.',
        direction: 'The direction associated with Fire is South',
        season: 'Summer',
        //Yang Fire years end in 6 (e.g. 1976). (Yang years end in an even number.)
        //Yin Fire years end in 7 (e.g. 1977). (Yin years end in an odd number.)
    },
    EARTH: {
        name: 'Earth',
        description: '',
        
        personality: 'The earth person is serious, logical and methodical, intelligent, objective and good at planning.',
        direction: 'Center',
        season: 'The season for Earth is the changeover point of the four seasons',
        //Yang earth years end in 8 (e.g. 1998), 
        //while Yin earth years end in 9 (e.g. 1999)
    },
    METAL: {
        name: 'Metal',
        description: '',
        
        personality: 'The metal person is sincere, has fixed values and opinions, is strong of will, and has eloquence of speech.',
        direction: 'The direction associated with Metal is West.',
        season: 'Autumn',
        //Yang metal years end in 0 (e.g. 1980), 
        //while Yin years end in 1 (e.g. 1981)
    },
    WATER: {
        name: 'Water',
        description: '',
        
        personality: 'The water person is persuasive, intuitive, and empathetic. The water person is objective and often sought out for their counsel.',
        direction: 'The direction associated with water is North.',
        season: 'Winter',
        //Yang water years end in 2 (e.g., 1992), 
        //while yin water years end in 3 (e.g., 1993)
    }
}
const ZODIAC_SIGN = {
    RAT: {
        id: '1',
        season: 'Mid-Winter',
        element: ELEMENTS.WATER,// corresponding element
        trine: '1st Trine', // dunno what this means
        yingYang: 'Yang',
        name: 'Rat',
        hourRange: '11pm - 1am', // peak hours
    },
    OX: {
        id: '2',
        season: 'Late Winter',
        element: ELEMENTS.EARTH,//'Fixed Element Earth',
        trine: '2nd Trine',
        yingYang: 'Yin',
        name: 'Ox',
        hourRange: '1am - 3am',
    },
    TIGER: {
        id: '3',
        season: 'Early Spring',
        element: ELEMENTS.WOOD,//'Fixed Element Wood',
        trine: '3rd Trine',
        yingYang: 'Yang',
        name: 'Tiger',
        hourRange: '3am - 5am',
    },
    RABBIT: {
        id: '4',
        season: 'Mid-Spring',
        element: ELEMENTS.WOOD,//'Fixed Element Wood',
        trine: '4th Trine',
        yingYang: 'Yin',
        name: 'Rabbit',
        hourRange: '5am - 7am',
    },
    DRAGON: {
        id: '5',
        season: 'Late Spring',
        element: ELEMENTS.EARTH,// 'Fixed Element Earth',
        trine: '1st Trine',
        yingYang: 'Yang',
        name: 'Dragon',
        hourRange: '7am - 9am',
    },
    SNAKE: {
        id: '6',
        season: 'Early Summer',
        element: ELEMENTS.FIRE,//'Fixed Element Fire',
        trine: '2nd Trine',
        yingYang: 'Yin',
        name: 'Snake',
        hourRange: '9am - 11am',
    },
    HORSE: {
        id: '7',
        season: 'Mid-Summer',
        element: ELEMENTS.FIRE,//'Fixed Element Fire',
        trine: '3rd Trine',
        yingYang: 'Yang',
        name: 'Horse',
        hourRange: '11am - 1pm',
    },
    GOAT: {
        id: '8',
        season: 'Late Summer',
        element: ELEMENTS.EARTH,//'Fixed Element Earth',
        trine: '4th Trine',
        yingYang: 'Yin',
        name: 'Goat',
        hourRange: '1pm - 3pm',
    },
    MONKEY: {
        id: '9',
        season: 'Early Autumn',
        element: ELEMENTS.METAL,//'Fixed Element Metal',
        trine: '1st Trine',
        yingYang: 'Yang',
        name: 'Monkey',
        hourRange: '3pm - 5pm',
    },
    ROOSTER: {
        id: '10',
        season: 'Mid-Autumn',
        element: ELEMENTS.METAL,//'Fixed Element Metal',
        trine: '2nd Trine',
        yingYang: 'Yin',
        name: 'Rooster',
        hourRange: '5pm - 7pm',
    },
    DOG: {
        id: '11',
        season: 'Late Autumn',
        element: ELEMENTS.EARTH,//'Fixed Element Earth',
        trine: '3rd Trine',
        yingYang: 'Yang',
        name: 'Dog',
        hourRange: '7pm - 9pm',
    },
    PIG: {
        id: '12',
        season: 'Early Winter',
        element: ELEMENTS.WATER,//'Fixed Element Water',
        trine: '4th Trine',
        yingYang: 'Yin',
        name: 'Pig',
        hourRange: '9pm - 11pm',
    }
}

