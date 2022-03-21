
const DOM_IDS = {
    CALC_MODAL_ID: 'calc-modal',
    CALC_ANSWER_ID: 'calcAnswer',
    CALC_EQUETION_ID: 'calcEquetion',
}

class CalculatorView{
    _calculator;
    
    constructor(calculator){
        this._calculator = calculator;
    }
    createNumberBtns(){
        const result = document.createElement('div');
        result.classList.add('calc-number-btns')
        for (let i = 1; i < 10; i++) {
            const currButton = document.createElement('div');
            currButton.id = `calc-num-${i}`;
            currButton.classList.add('calc-number-btn');
            
            const number = document.createElement('h3');
            number.innerHTML = `${i}`;
            currButton.append(number);

            result.append(currButton);
        }

        const zeroButton = document.createElement('div');
        zeroButton.id = `calc-num-0`;
        zeroButton.classList.add('calc-number-btn');
        
        const zero = document.createElement('h3');
        zero.innerHTML = `0`;
        zeroButton.append(zero);

        result.append(zeroButton);

        return result;
    }
    createMathBtns() {
        
        const multBtn = document.createElement('div');
        multBtn.id = `calc-num-10`;
        multBtn.classList.add('calc-math-btn');
        multBtn.innerHTML = '*';

        const divBtn = document.createElement('div');
        divBtn.id = `calc-num-11`;
        divBtn.classList.add('calc-math-btn');
        divBtn.innerHTML = '/';

        const addBtn = document.createElement('div');
        addBtn.id = `calc-num-12`;
        addBtn.classList.add('calc-math-btn');
        addBtn.innerHTML = '+';

        const minBtn = document.createElement('div');
        minBtn.id = `calc-num-13`;
        minBtn.classList.add('calc-math-btn');
        minBtn.innerHTML = '-';
        
        const result = document.createElement('div');
        result.classList.add('calc-math-btns');
        result.append(multBtn);
        result.append(divBtn);
        result.append(addBtn);
        result.append(minBtn);
        
        return result;
    }
    createOtherBtns(){
        const clearEquationBtn = document.createElement('div');
        clearEquationBtn.id = `calc-num-14`;
        clearEquationBtn.classList.add('calc-other-btn')
        clearEquationBtn.innerHTML = 'CE';

        const clearAnswerBtn = document.createElement('div');
        clearAnswerBtn.id = `calc-num-15`;
        clearAnswerBtn.classList.add('calc-other-btn')
        clearAnswerBtn.innerHTML = 'CA';

        const clearAllBtn = document.createElement('div');
        clearAllBtn.id = `calc-num-16`;
        clearAllBtn.classList.add('calc-other-btn')
        clearAllBtn.innerHTML = 'C';

        const equalsBtn = document.createElement('div');
        equalsBtn.id = `calc-num-17`;
        equalsBtn.classList.add('calc-other-btn');
        equalsBtn.innerHTML = '=';

        const result = document.createElement('div');
        result.classList.add('calc-other-btns');
        result.append(clearEquationBtn);
        result.append(clearAnswerBtn);
        result.append(clearAllBtn);
        result.append(equalsBtn);

        return result;
    }
    createAnswerHTML(){
        const result = document.createElement('div');
        result.id = DOM_IDS.CALC_ANSWER_ID;
        result.innerHTML = 'READY';
        return result;
    }
    updateAnwer(answer){
        const answerDom = document.getElementById(DOM_IDS.CALC_ANSWER_ID);
        answerDom.innerHTML = answer.toString();
    }
    createEquetionHTML(){
        const result = document.createElement('div');
        result.id = DOM_IDS.CALC_EQUETION_ID;
        result.innerHTML = 'READY';
        return result;
    }
    updateEquetion(equetion){
        const equetionDom = document.getElementById(DOM_IDS.CALC_EQUETION_ID);
        equetionDom.innerHTML = equetion.toString();
    }
    toggleCalculator() {
        const modal = document.getElementById(DOM_IDS.CALC_MODAL_ID);
        if(!modal.classList.contains('modal-open')) modal.classList.add('modal-open');
        else modal.classList.remove('modal-open');
    }
    /**
     * TODO: Id should be given by user. How to inform user the container should exist in 
     */
    createCalculatorView(){
        
        const equetionHTML = this.createEquetionHTML();
        const answerHTML = this.createAnswerHTML();

        const headerData = document.createElement('div');
        headerData.append(equetionHTML);
        headerData.append(answerHTML);

        const numberBtnsHTML = this.createNumberBtns();
        const mathBtnsHTML = this.createMathBtns();
        const otherBtnsHTML = this.createOtherBtns();
        
        const bodyData = document.createElement('div');
        bodyData.classList.add(`${DOM_IDS.CALC_MODAL_ID}-body`)
        bodyData.append(numberBtnsHTML);
        bodyData.append(mathBtnsHTML);
        bodyData.append(otherBtnsHTML);

        const modal = new ModalView(DOM_IDS.CALC_MODAL_ID, headerData, bodyData);

        const modalContainer = document.getElementById(`${DOM_IDS.CALC_MODAL_ID}-holder`);
        modalContainer.append(modal.modalView);
    }

    set calculator(calculator){
        this._calculator = calculator;
    }
    get calculator(){
        return this._calculator;
    }
}