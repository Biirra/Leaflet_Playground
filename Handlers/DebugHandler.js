class DebugHandler{
    static log(message, ...args){
        if(DEBUG_MODE) console.log(message, ...args);
    }
    static warn(message, ...args){
        if(DEBUG_MODE) console.warn(message, ...args);
    }
    static error(message, ...args){
        if(DEBUG_MODE) console.error(message, ...args);
    }
}