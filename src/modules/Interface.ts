

export class CalcInterface {
  interfaceElement: HTMLElement;
  numberButtons: Array<HTMLButtonElement>;
  operatorButtons: Array<HTMLButtonElement>;
  dotButton: HTMLButtonElement;
  clearButton: HTMLButtonElement;
  deleteButton: HTMLButtonElement;
  resultButton: HTMLButtonElement;
  expression: HTMLElement;
  currentValue: HTMLElement;
  constructor(interfaceSelector: string, numberButtonsSelector: string, operatorButtonsSelector: string, dotButtonSelector: string, clearButtonSelector: string, deleteButtonSelector: string, resultButtonSelector: string, expressionSelector: string, currentViewSelector: string) {
    this.interfaceElement = document.querySelector(interfaceSelector) as HTMLElement;
    this.numberButtons = Array.from(this.interfaceElement.querySelectorAll(numberButtonsSelector));
    this.operatorButtons = Array.from(this.interfaceElement.querySelectorAll(operatorButtonsSelector));
    this.dotButton = this.interfaceElement.querySelector(dotButtonSelector) as HTMLButtonElement;
    this.clearButton = this.interfaceElement.querySelector(clearButtonSelector) as HTMLButtonElement;
    this.deleteButton = this.interfaceElement.querySelector(deleteButtonSelector) as HTMLButtonElement;
    this.resultButton = this.interfaceElement.querySelector(resultButtonSelector) as HTMLButtonElement;
    this.expression = this.interfaceElement.querySelector(expressionSelector) as HTMLElement;
    this.currentValue = this.interfaceElement.querySelector(currentViewSelector) as HTMLElement;
  }
  setCurrentValue(value: string): void {
    this.currentValue.textContent = value;
  }
  setExpressionValue(value: string):void {
    this.expression.textContent = value;
  }

}
