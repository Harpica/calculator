// Model
export class Data {
  previousValue: number;
  currentValue: number;
  operator: string;
  constructor() {
    this.previousValue = 0;
    this.currentValue = 0;
    this.operator = '';
  }
  reset() {
    this.previousValue = 0;
    this.currentValue = 0;
    this.operator = '';
  }
}
