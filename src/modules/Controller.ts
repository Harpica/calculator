import { Calculator, Error, Output, Result } from './Calculator';
import { CalcInterface } from './Interface';

export class Controller {
  private _interface: CalcInterface;
  private _calculator: Calculator;

  constructor(calcInterface: CalcInterface, calculator: Calculator) {
    this._interface = calcInterface;
    this._calculator = calculator;
    this._setEventListeners();
  }
  _setEventListeners(): void {
    this._interface.numberButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this._displayResult(this._calculator.handleNumber(button.value));
      });
    });
    this._interface.operatorButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Проверка результата и обработка
        this._displayResult(this._calculator.handleOperator(button.value));
      });
    });
  }
  _displayResult(result: Result) {
    if (result === Error.DIVISION_BY_ZERO) {
      this._interface.setCurrentValue("Can't devide by zero");
    } else if (result === Error.WRONG_OPERATOR) {
      this._interface.setCurrentValue('Wrong operator');
    } else if (isOutput(result)) {
      this._interface.setCurrentValue(result.currentNumber.toString());
      if (!(result.operator === '')) {
        this._interface.setExpressionValue(
          `${result.previousNumber} ${result.operator}`
        );
      }
    }
  }
}

export function isOutput(result: Result): result is Output {
  return (result as Output).currentNumber !== undefined;
}
