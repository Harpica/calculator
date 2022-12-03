import { Calculator } from "./Calculator";
import { CalcInterface } from "./Interface";

class Controller {
  private _interface: CalcInterface;
  private _calculator: Calculator

  constructor(calcInterface: CalcInterface, calculator: Calculator) {
    this._interface = calcInterface;
    this._calculator = calculator;
  }
  _setEventListeners(): void {
    this._interface.numberButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this._interface.setExpressionValue(button.value);
        this._calculator.handleNumber(button.value);
      })
    } )

  }
}
