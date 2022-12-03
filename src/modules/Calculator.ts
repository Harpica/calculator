import { Data } from "./Data";

export class Calculator {
  private _data: Data;
  constructor(data: Data) {
    this._data = data;
  }
  private _add(a: number, b: number) {
    return a + b
  }

  private _substract(a: number, b: number) {
    return a - b
  }

  private _multiply(a: number, b: number) {
    return a * b
  }

  private _divide(a: number, b: number) {
    return a / b
  }

  operate(operator: string, a: number, b: number) {
    switch (operator) {
      case '+':
        return this._add(a, b)
      case '-':
        return this._substract(a, b)
      case '*':
        return this._multiply(a, b)
      case '/':
        if (b === 0) return null
        else return this._divide(a, b)
      default:
        return null
    }
  }
  handleNumber(value: string): void {
    if (this._data.currentValue === 0 && this._data.previousValues === null)
    this._data.currentValue = parseInt(value);
    else {
    this._data.previousValues.push(this._data.currentValue);
    this._data.currentValue = parseInt(value);
    }
  }
  handleOperator(value: string): void {
    if (this._data.operator === '') {
      this._data.operator = value;
    } else {
      // Добавить получение результата
      this.operate(this._data.operator, this._data.previousValues[0], this._data.currentValue)
      this._data.operator = value;
    }
  }
}
