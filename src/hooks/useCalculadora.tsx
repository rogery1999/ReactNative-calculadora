import { useRef, useState } from 'react';

interface IOperatorRef {
  lastOperator: string;
  actualOperator: string;
  canChangeOperator: boolean;
  lastValue: string;
}

const useCalculadora = () => {
  const [result, setResult] = useState('');
  const [baseNumber, setBaseNumber] = useState('0');
  const clearAll = useRef(false);
  const operatorRef = useRef<IOperatorRef>({
    actualOperator: '',
    lastOperator: '',
    lastValue: '',
    canChangeOperator: false,
  });
  // * Buttons Functions
  const modifyBaseNumber = (digit: string) => {
    clearAll.current = false;
    disableChangeOperator();
    setBaseNumber(baseNumber === '0' ? digit : `${baseNumber}${digit}`);
  };
  const deleteLastDigit = () => {
    clearAll.current = false;
    disableChangeOperator();
    if (baseNumber.includes('-') && baseNumber.length === 2) {
      setBaseNumber('0');
    } else {
      setBaseNumber(baseNumber.length === 1 ? '0' : baseNumber.slice(0, -1));
    }
  };
  const dot = () => {
    clearAll.current = false;
    disableChangeOperator();
    setBaseNumber(baseNumber.includes('.') ? baseNumber : `${baseNumber}.`);
  };
  const clear = () => {
    disableChangeOperator();
    setBaseNumber('0');
    if (clearAll.current) {
      setResult('');
      clearAll.current = false;
    } else {
      clearAll.current = true;
    }
  };
  const absoluteValue = () => {
    disableChangeOperator();
    clearAll.current = false;
    setBaseNumber(
      baseNumber === '0'
        ? '0'
        : baseNumber.includes('-')
        ? baseNumber.slice(1)
        : `-${baseNumber}`
    );
  };
  const makeOperation = (operator: string) => {
    if (result === '' && operator !== '=') {
      if (baseNumber === '0') {
        setResult('0');
      } else if (baseNumber.endsWith('.')) {
        setResult(baseNumber.slice(0, -1));
      } else {
        setResult(baseNumber);
      }
      operatorRef.current = {
        lastOperator: '',
        lastValue: '',
        actualOperator: operator,
        canChangeOperator: true,
      };
      setBaseNumber('0');
    } else if (result.length > 0) {
      if (operator === '=') {
        if (operatorRef.current.actualOperator === '=') {
          setResult(
            calculate(
              operatorRef.current.lastOperator,
              operatorRef.current.lastValue
            )
          );
        } else {
          setResult(calculate(operatorRef.current.actualOperator, baseNumber));
          const newOperatorRef: IOperatorRef = {
            lastOperator: operatorRef.current.actualOperator,
            actualOperator: operator,
            lastValue: baseNumber,
            canChangeOperator: true,
          };
          operatorRef.current = { ...newOperatorRef };
          setBaseNumber('0');
        }
      } else {
        if (operatorRef.current.canChangeOperator) {
          const newOperatorRef: IOperatorRef = {
            lastOperator: operatorRef.current.actualOperator,
            actualOperator: operator,
            lastValue: '',
            canChangeOperator: true,
          };
          operatorRef.current = { ...newOperatorRef };
        } else {
          setResult(calculate(operatorRef.current.actualOperator, baseNumber));
          const newOperatorRef: IOperatorRef = {
            lastOperator: operatorRef.current.actualOperator,
            actualOperator: operator,
            lastValue: baseNumber,
            canChangeOperator: true,
          };
          operatorRef.current = { ...newOperatorRef };
          setBaseNumber('0');
        }
      }
    }
    console.log('result.length', result.length);
  };
  const calculate = (operator: string, value: string): string => {
    let operationResult: string;
    switch (operator) {
      case '÷':
        operationResult = (parseFloat(result) / parseFloat(value)).toString();
        break;
      case 'x':
        operationResult = (parseFloat(result) * parseFloat(value)).toString();
        break;
      case '-':
        operationResult = (parseFloat(result) - parseFloat(value)).toString();
        break;
      case '+':
        operationResult = (parseFloat(result) + parseFloat(value)).toString();
        break;
      default:
        operationResult = 'Error';
        break;
    }
    return operationResult;
  };
  const disableChangeOperator = () => {
    if (operatorRef.current.actualOperator === '=') {
      setResult('');
      setBaseNumber('0');
      clearAll.current = false;
      operatorRef.current = {
        actualOperator: '',
        lastOperator: '',
        lastValue: '',
        canChangeOperator: false,
      };
    } else {
      operatorRef.current = {
        ...operatorRef.current,
        canChangeOperator: false,
      };
    }
  };
  return {
    baseNumber,
    result,
    modifyBaseNumber,
    deleteLastDigit,
    dot,
    clear,
    absoluteValue,
    makeOperation,
  };
};

export default useCalculadora;
