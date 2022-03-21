class Calculator extends Item{
    _currentEquetion;
    _currentAnswer;

    _previousEquetions;
    
    _view;
    _controller;

    _name = 'Calculator';
    constructor(){
        super();
        this.view = new CalculatorView(this);
        this.view.createCalculatorView();

        this.controller = new CalculatorController(this)
    }
    use(){
        this.view.toggleCalculator();
    }
    

    static add(x, ...args){
        let result = x;
        for (let i = 0; i < args.length; i++) {
            const num = args[i];
            result += num;
        }
        return result;
    }
    static sub(x, ...args){
        let result = x;
        for (let i = 0; i < args.length; i++) {
            const num = args[i];
            result -= num;
        }
        return result;
    }
    static mult(x, ...args){
        let result = x;
        for (let i = 0; i < args.length; i++) {
            const num = args[i];
            result *= num;
        }
        return result;
    }
    static div(x, ...args){
        let result = x;
        for (let i = 0; i < args.length; i++) {
            const num = args[i];
            if(num === 0) continue; // can't devide with zero
            result /= num;
        }
        return result;
    }
    set view(view) {
        this._view = view;
    }
    get view(){
        return this._view;
    }
    set controller(controller){
        this._controller = controller;
    }
    get controller() {
        return this._controller;
    }
    get name() {
        return this._name;
    }
}