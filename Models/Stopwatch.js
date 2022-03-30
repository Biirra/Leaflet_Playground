class Stopwatch{
    _seconds = 0;
    _minutes = 0;
    _hours = 0;

    _paused = false;
    
    start(){
        this.paused = false;
        this.counter = setInterval(this.addSecond.bind(this), 1000);
    }
    pause(){
        this.paused = true;
        clearInterval(this.counter);
    }  
    stop(){
        this.pause();
        this.reset();
    }
    reset(){
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
    addSecond(){
        this.seconds += 1;

        if(this.seconds === 60){
            this.minutes += 1;
            this.seconds = 0;
        }
        if(this.minutes === 60){
            this.hours += 1;
            this.minutes = 0;
        }
    }

    get seconds(){
        return this._seconds;
    }
    set seconds(seconds){
        this._seconds = seconds;
    }
    
    get minutes(){
        return this._minutes;
    }
    set minutes(minutes){
        this._minutes = minutes;
    }

    get hours(){
        return this._hours;
    }
    set hours(hours){
        this._hours = hours;
    }

    get paused(){
        return this._paused;
    }
    set paused(paused){
        this._paused = paused;
    }

    get time(){
        return `${this.hours}:${this.minutes}:${this.seconds}`;
    }
}