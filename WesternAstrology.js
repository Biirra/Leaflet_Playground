class WesternAstrology{
    static getStarSign(birthDay) {
        const date = new Date(birthDay);
        date.setFullYear(2001);

        const keys = Object.keys(STARSIGN);
        for(let i = 0; i < keys.length; i++) {
            let currentSign = STARSIGN[keys[i]];
            
            const startDate = new Date(currentSign.sunSignDates.start);
            const endDate = new Date(currentSign.sunSignDates.end);

            if(date <= endDate && date >= startDate)
                return currentSign;
        }
        return null; 
    }
}


    //Sign          Gloss                   Symbol      Unicode Character       Approximate Sun Sign Dates  House       Polarity    Modality    Triplicity        Northern Hemisphere Season	Southern Hemisphere Season	    Ruler

    //Aries         The Ram	                Aries 	    ♈︎                      March 21 - April 19	        1	        Positive	Cardinal	Fire	            Spring	                    Autumn                          Mars
    //Taurus        The Bull	            Taurus 	    ♉︎                      April 20 – May 20	        2	        Negative	Fixed	    Earth	            Spring	                    Autumn                          Venus
    //Gemini        The Twins	            Gemini      ♊︎                      May 21 – June 21	        3	        Positive	Mutable	    Air	                 Spring	                    Autumn	                        Mercury
    //Cancer        The Crab	            Cancer 	    ♋︎                      June 22 – July 22	        4	        Negative	Cardinal	Water	            Summer	                    Winter	                        Moon
    //Leo           The Lion	            Leo         ♌︎                      July 23 – August 22	        5	        Positive	Fixed	    Fire	            Summer	                    Winter	                        Sun
    //Virgo         The Maiden	            Virgo       ♍︎                      August 23 – September 22	6	        Negative	Mutable	    Earth	            Summer	                    Winter	                        Mercury
    //Libra         The Scales	            Libra       ♎︎                      September 23 – October 22	7	        Positive	Cardinal	Air	                Autumn	                    Spring	                        Venus
    //Scorpio       The Scorpion	        Scorpius    ♏︎                      October 23 – November 22	8	        Negative	Fixed	    Water	            Autumn	                    Spring	                        Pluto (or)	Mars
    //Sagittarius   The Archer (Centaur)	Sagittarius ♐︎                      November 23 – December 21   9	        Positive	Mutable	    Fire	            Autumn	                    Spring	                        Jupiter
    //Capricorn     The Goat	            Capricornus ♑︎                      December 22 – January 19    10	        Negative	Cardinal	Earth	            Winter	                    Summer	                        Saturn
    //Aquarius      The Water-bearer	    Aquarius    ♒︎                      January 20 – February 18	11      	Positive	Fixed	    Air	                Winter	                    Summer	                        Uranus(or)	Saturn
    //Pisces        The Fish	            Pisces      ♓︎                      February 19 – March 20	     12	        Negative	Mutable	    Water	            Winter	                    Summer	                        Neptune	Jupiter
const STARSIGN = {
    ARIES:{
        id:0,
        sign:'Aries',
        gloss:'The Ram',
        symbolicName: 'Aries',
        uniChar: '♈︎',
        sunSignDates:{
            start: 'March 21',
            end: 'April 19'
        },
        house: 1,
        polarity:'Positive',
        modality:'Cardinal',
        triplicity:'Fire',
        hemisphereSeason: {
            north: 'Spring',
            south: 'Autumn'
        },
        ruler: 'Mars'
    },
    TAURUS:{
        id:1,
        sign:'Taurus',
        gloss:'The Bull',
        symbolicName: 'Taurus',
        uniChar: '♉︎',
        sunSignDates:{
            start: 'April 20',
            end: 'May 20'
        },
        house: 2,
        polarity:'Negative',
        modality:'Fixed',
        triplicity:'Earth',
        hemisphereSeason: {
            north: 'Spring',
            south: 'Autumn'
        },
        ruler: 'Venus'
    },
    GEMINI:{
        id:2,
        sign:'Gemini',
        gloss:'The Twins',
        symbolicName: 'Gemini',
        uniChar: '♊︎',
        sunSignDates:{
            start: 'May 21',
            end: 'June 21'
        },
        house: 3,
        polarity:'Positive',
        modality:'Mutable',
        triplicity:'Air',
        hemisphereSeason: {
            north: 'Spring',
            south: 'Autumn'
        },
        ruler: 'Mercury'
    },
    CANCER:{
        id:0,
        sign:'Cancer',
        gloss:'The Crab',
        symbolicName: 'Cancer',
        uniChar: '♋︎',
        sunSignDates:{
            start: 'June 22',
            end: 'July 22'
        },
        house: 4,
        polarity:'Negative',
        modality:'Cardinal',
        triplicity:'Water',
        hemisphereSeason: {
            north: 'Summer',
            south: 'Winter'
        },
        ruler: 'Moon'
    },
    LEO:{
        id:0,
        sign:'Leo',
        gloss:'The Lion',
        symbolicName: 'Leo',
        uniChar: '♌︎',
        sunSignDates:{
            start: 'July 23',
            end: 'August 22'
        },
        house: 5,
        polarity:'Positive',
        modality:'Fixed',
        triplicity:'Fire',
        hemisphereSeason: {
            north: 'Summer',
            south: 'Winter'
        },
        ruler: 'Sun'
    },
    VIRGO:{
        id:0,
        sign:'Virgo',
        gloss:'The Maiden',
        symbolicName: 'Virgo',
        uniChar: '♍︎',
        sunSignDates:{
            start: 'August 23',
            end: 'September 22'
        },
        house: 6,
        polarity:'Negative',
        modality:'Mutable',
        triplicity:'Earth',
        hemisphereSeason: {
            north: 'Summer',
            south: 'Winter'
        },
        ruler: 'Mercury'
    },
    LIBRA:{
        id:0,
        sign:'Libra',
        gloss:'The Scales',
        symbolicName: 'Libra',
        uniChar: '♎︎',
        sunSignDates:{
            start: 'September 23',
            end: 'October 22'
        },
        house: 7,
        polarity:'Positive',
        modality:'Cardinal',
        triplicity:'Air',
        hemisphereSeason: {
            north: 'Autumn',
            south: 'Spring'
        },
        ruler: 'Venus'
    },
    SCORPIO:{
        id:0,
        sign:'Scorpio',
        gloss:'The Scorpion',
        symbolicName: 'Scorpius',
        uniChar: '♏︎',
        sunSignDates:{
            start: 'October 23',
            end: 'November 22'
        },
        house: 8,
        polarity:'Negative',
        modality:'Fixed',
        triplicity:'Water',
        hemisphereSeason: {
            north: 'Autumn',
            south: 'Spring'
        },
        ruler: 'Pluto (or) Mars'
    },
    SAGITTARIUS:{
        id:0,
        sign:'Sagittarius',
        gloss:'The Archer (Centaur)',
        symbolicName: 'Sagittarius',
        uniChar: '♐︎',
        sunSignDates:{
            start: 'November 23',
            end: 'December 21'
        },
        house: 9,
        polarity:'Positive',
        modality:'Mutable',
        triplicity:'Fire',
        hemisphereSeason: {
            north: 'Autumn',
            south: 'Spring'
        },
        ruler: 'Jupiter'
    },
    CAPRICORN:{
        id:0,
        sign:'Capricorn',
        gloss:'The Goat',
        symbolicName: 'Capricornus',
        uniChar: '♑︎',
        sunSignDates:{
            start: 'December 22',
            end: 'January 19'
        },
        house: 10,
        polarity:'Negative',
        modality:'Cardinal',
        triplicity:'Earth',
        hemisphereSeason: {
            north: 'Winter',
            south: 'Summer'
        },
        ruler: 'Saturn'
    },
    AQUARIUS:{
        id:0,
        sign:'Aquarius',
        gloss:'The Water-bearer',
        symbolicName: 'Aquarius',
        uniChar: '♒︎',
        sunSignDates:{
            start: 'January 20',
            end: 'February 18'
        },
        house: 11,
        polarity:'Positive',
        modality:'Fixed',
        triplicity:'Air',
        hemisphereSeason: {
            north: 'Winter',
            south: 'Summer'
        },
        ruler: 'Uranus (or) Saturn'
    },
    PISCES:{
        id:0,
        sign:'Pisces',
        gloss:'The Fish',
        symbolicName: 'Pisces',
        uniChar: '♓︎',
        sunSignDates:{
            start: 'February 19',
            end: 'March 20'
        },
        house: 12,
        polarity:'Negative',
        modality:'Mutable',
        triplicity:'Water',
        hemisphereSeason: {
            north: 'Winter',
            south: 'Summer'
        },
        ruler: 'Neptune (or) Jupiter'
    }
}
