class Calculator{
    constructor(prevOperanText,currOperanText){
        this.prevOperanText = prevOperanText;
        this.currOperanText = currOperanText;
        this.clear();
    }
    clear(){
        this.prevOperan="";
        this.currOperan="";
        this.operation=undefined;
    }
    delete(){
        this.currOperan = this.currOperan.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number ==='.' && this.currOperan.includes('.')) return;
        this.currOperan += number.toString();
    }
    chooseOperation(operation){
        if(this.currOperan ==="") return;
        if(this.prevOperan !== ""){
            this.compute();
        }
        this.operation = operation;
        this.prevOperan = this.currOperan
        this.currOperan=""; 
    }
    updateDisplay(){
        this.currOperanText.innerText = this.currOperan
       if (this.operation != null){
            this.prevOperanText.innerText = `${this.prevOperan} ${this.operation}`;
       }
       else{
           this.prevOperanText.innerText = '';
       }
    }
    compute(){
        let result;
        const prev = parseFloat(this.prevOperan);
        const curr = parseFloat(this.currOperan);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default : 
            return;
        }
        this.currOperan = result;
        this.operation = undefined;
        this.prevOperan ="";
    }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const clear = document.querySelector('[data-all-clear]');
const equalsBtn = document.querySelector('[data-equals]');
const prevOperanText = document.querySelector('[data-prev-operan]');
const currOperanText = document.querySelector('[data-curr-operan]');
const deleteBtn = document.querySelector('[data-delete]')
const calculator = new Calculator(prevOperanText,currOperanText);
numberBtn.forEach(button =>{
    button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
clear.addEventListener("click",()=>{
    calculator.clear()
    calculator.updateDisplay()
});
operationBtn.forEach(button =>{
    button.addEventListener("click",()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
})
equalsBtn.addEventListener("click",button =>{
    calculator.compute();
    calculator.updateDisplay();
})
deleteBtn.addEventListener("click",button =>{
    calculator.delete();
    calculator.updateDisplay();
})