import './index.css';
import { Calculator } from './modules/Calculator';
import { Controller } from './modules/Controller';
import { Data } from './modules/Data';
import { CalcInterface } from './modules/Interface';

const data = new Data();
const calcInterface = new CalcInterface('.content', '.button__number', '.button__operator', '.button__dot', '.button__clear', '.button__delete', '.button__result', '.content__expression', '.content__current');
const calculator = new Calculator (data);
const controller = new Controller (calcInterface, calculator);
