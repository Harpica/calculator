export class Data {
  previousValues: Array<number>;
  currentValue: number;
  operator: string;
  constructor() {
    this.previousValues = [];
    this.currentValue = 0;
    this.operator = '';
  }
  getCurrentValueString(): string {
    return this.currentValue.toString();
  }
  getExpression(): string {
   return `${this.previousValues[0]} ${this.operator}`;
  }
  getExpressionForResult(): string {
    return `${this.previousValues[0]} ${this.operator} ${this.previousValues[1]} = `;
  }
}
