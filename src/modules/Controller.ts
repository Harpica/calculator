import { Calculator, Error, Output, Result } from './Calculator';
import { CalcInterface } from './Interface';

export class Controller {
  private _interface: CalcInterface;
  private _calculator: Calculator;
  private _isResultButtonOn: boolean;

  constructor(calcInterface: CalcInterface, calculator: Calculator) {
    this._interface = calcInterface;
    this._calculator = calculator;
    this._isResultButtonOn = false;
    this._setEventListeners();
  }
  _setEventListeners(): void {
    this._interface.numberButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this._displayResult(this._calculator.handleNumber(button.value));
        this._displayExpression(this._calculator.getResult());
      });
    });
    this._interface.dotButton.addEventListener('click', () => {
      this._calculator.handleDot();
      if (this._interface.currentValue.textContent === '') {
        this._interface.setCurrentValue('0.');
      } else {
        this._interface.currentValue.textContent += '.';
      }
    });
    this._interface.operatorButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this._displayResult(this._calculator.handleOperator(button.value));
        this._displayExpression(this._calculator.getResult());
      });
    });
    this._interface.resultButton.addEventListener('click', () => {
      this._isResultButtonOn = true;
      this._displayExpression(this._calculator.getResult());
      this._displayResult(this._calculator.handleEquals());
    });
    this._interface.clearButton.addEventListener('click', () => {
      this._calculator.handleClear();
      this._interface.setCurrentValue('');
      this._interface.setExpressionValue('');
    });
    this._interface.deleteButton.addEventListener('click', () => {
      if (this._interface.currentValue.textContent !== '') {
        if (
          (this._interface.currentValue.textContent as string).includes('.') &&
          (this._interface.currentValue.textContent as string).indexOf('.') ===
            (this._interface.currentValue.textContent as string).length - 2
        ) {
          this._interface.setCurrentValue(
            (this._interface.currentValue.textContent as string).slice(0, -1)
          );
          this._calculator.handleDelete();
          this._calculator.handleDot();
        } else {
          this._calculator.handleDelete();
          this._interface.setCurrentValue(
            (this._calculator.getResult() as Output).currentNumber.toString()
          );
        }
      }
    });
  }
  // Проверка результата и обработка
  _displayResult(result: Result) {
    if (result === Error.DIVISION_BY_ZERO) {
      this._interface.setCurrentValue("Can't devide by zero");
    } else if (result === Error.WRONG_OPERATOR) {
      this._interface.setCurrentValue('Wrong operator');
    } else if (isOutput(result)) {
      this._interface.setCurrentValue(result.currentNumber.toString());
    }
  }
  _displayExpression(result: Result) {
    if (isOutput(result)) {
      if (!(result.operator === '')) {
        if (this._isResultButtonOn) {
          this._isResultButtonOn = false;
          this._interface.setExpressionValue(
            `${result.previousNumber} ${result.operator} ${result.currentNumber} = `
          );
        } else {
          this._interface.setExpressionValue(
            `${result.previousNumber} ${result.operator}`
          );
        }
      }
    }
  }
}

export function isOutput(result: Result): result is Output {
  return (result as Output).currentNumber !== undefined;
}
