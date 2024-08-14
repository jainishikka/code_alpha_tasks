class Calculator{
    constructor (previousoperand, currentoperand){
        this.previousoperand=previousoperand;
        this.currentoperand=currentoperand;
        this.clear();
    }

    clear(){
        this.currentoperand="";
        this.previousoperand="";
        this.operation=undefined;
    }
    delete(){
        // if(this.currentoperand==='') return;
        // var num=this.currentoperand;
        // num=parseInt( num/10);
        // this.currentoperand=num;

        this.currentoperand=this.currentoperand.toString().slice(0,-1);
    }
    appendNum(number){
        if(number === '.' && this.currentoperand.includes('.')) return;
        this.currentoperand=this.currentoperand.toString()+number.toString();
    }
    chooseOperation(operation){
        // this.previousoperand=this.currentoperand;
        // previousOperand.innerText=this.currentoperand.toString()+operation.toString();
        // this.currentoperand=""

        if(this.currentoperand === "") return;
        if(this.previousoperand!==""){
            this.compute();
        }
        this.operation=operation;
        this.previousoperand=this.currentoperand;
        this.currentoperand="";
    }
    compute(){
        let computation
        const prev=parseFloat(this.previousoperand)
        const current=parseFloat(this.currentoperand)
        if(prev===NaN || current===NaN) return
        switch(this.operation){
            case'+':
            computation=prev+current
            break;

            case '-':
                computation=prev-current
                break;

            case '*':
                computation=prev*current
                break;

            case '/':
                computation=prev/current
                break;
            default: return;
        }

        this.currentoperand=computation;
        this.operation=undefined;
        this.previousoperand=""
    }
    updateDisplay(){
        currentOperand.innerText=this.currentoperand;
        if(this.operation!=null){
        previousOperand.innerText=`${this.previousoperand} ${this.operation}`
        }else{
            previousOperand.innerHTML=""
        }
    }
}

const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operation]');
const equalsButton=document.querySelector('[data-equals]');
const deleteButton=document.querySelector('[data-delete]');
const allClearButton=document.querySelector('[data-all-clear]');
const previousOperand=document.querySelector('[previous-operand]');
const currentOperand=document.querySelector('[current-operand]');

const calculator=new Calculator(previousOperand,currentOperand);
numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay()
})
