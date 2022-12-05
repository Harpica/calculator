import { isOutput } from './Controller';
import { Data } from './Data';

export enum Error {
  DIVISION_BY_ZERO,
  WRONG_OPERATOR,
}

export type Output = {
  currentNumber: number;
  previousNumber: number;
  operator: string;
};

export type Result = Output | Error;

// Model
export class Calculator {
  private _data: Data;
  private _isContunuingNumber: boolean;
  constructor(data: Data) {
    this._data = data;
    this._isContunuingNumber = false;
  }
  private _add(a: number, b: number): number {
    return a + b;
  }

  private _substract(a: number, b: number): number {
    return a - b;
  }

  private _multiply(a: number, b: number): number {
    return a * b;
  }

  private _divide(a: number, b: number): number {
    return a / b;
  }

  operate(operator: string, a: number, b: number): Result {
    let answer: number;
    switch (operator) {
      case '+':
        answer = this._add(a, b);
        return { currentNumber: answer, previousNumber: answer, operator: '+' };
      case '-':
        answer = this._substract(a, b);
        return { currentNumber: answer, previousNumber: answer, operator: '-' };
      case '*':
        answer = this._multiply(a, b);
        return { currentNumber: answer, previousNumber: answer, operator: '*' };
      case '/':
        if (b === 0) return Error.DIVISION_BY_ZERO;
        else {
          answer = this._divide(a, b);
          return {
            currentNumber: answer,
            previousNumber: answer,
            operator: '/',
          };
        }
      default:
        return Error.WRONG_OPERATOR;
    }
  }
  handleNumber(value: string): Result {
    if (!this._isContunuingNumber) {
      this._isContunuingNumber = true;
      this._data.currentValue = parseInt(value);
    } else {
      this._data.currentValue = parseInt(
        this._data.currentValue.toString() + value
      );
    }
    return this._getResult();
  }
  handleOperator(value: string): Result {
    this._isContunuingNumber = false;

    if (this._data.operator === '') {
      this._data.operator = value;
      this._data.previousValue = this._data.currentValue;
      return this._getResult();
    }

    const result = this.operate(
      this._data.operator,
      this._data.previousValue,
      this._data.currentValue
    );
    if (isOutput(result)) {
      this._data.currentValue = result.currentNumber;
      this._data.previousValue = this._data.currentValue;
      this._data.operator = value;
      console.log(this._data);
    } else {
      this._data.reset();
    }
    return result;
  }
  _getResult(): Result {
    return {
      currentNumber: this._data.currentValue,
      previousNumber: this._data.previousValue,
      operator: this._data.operator,
    };
  }
}
