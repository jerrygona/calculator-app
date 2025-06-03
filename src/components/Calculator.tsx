import React, { useState } from 'react';
import { Button, Card, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('');

  const handleNumberClick = (num: string) => {
    setDisplay(prev => prev + num);
  };

  const handleOperatorClick = (operator: string) => {
    setDisplay(prev => prev + operator);
  };

  const handleClear = () => {
    setDisplay('');
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const calculatedResult = eval(display);
      setDisplay(calculatedResult.toString());
    } catch (error) {
      setDisplay('错误');
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '50px auto' }}>
      <Card title="计算器" bordered={false}>
        <Input.Group compact>
          <Input
            style={{ width: '100%', marginBottom: 16 }}
            value={display}
            placeholder="0"
            readOnly
          />
        </Input.Group>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          <Button onClick={() => handleNumberClick('7')}>7</Button>
          <Button onClick={() => handleNumberClick('8')}>8</Button>
          <Button onClick={() => handleNumberClick('9')}>9</Button>
          <Button type="primary" onClick={() => handleOperatorClick('/')}>/</Button>
          
          <Button onClick={() => handleNumberClick('4')}>4</Button>
          <Button onClick={() => handleNumberClick('5')}>5</Button>
          <Button onClick={() => handleNumberClick('6')}>6</Button>
          <Button type="primary" onClick={() => handleOperatorClick('*')}>×</Button>
          
          <Button onClick={() => handleNumberClick('1')}>1</Button>
          <Button onClick={() => handleNumberClick('2')}>2</Button>
          <Button onClick={() => handleNumberClick('3')}>3</Button>
          <Button type="primary" onClick={() => handleOperatorClick('-')}>-</Button>
          
          <Button onClick={() => handleNumberClick('0')}>0</Button>
          <Button onClick={() => handleNumberClick('.')}>.</Button>
          <Button type="primary" onClick={handleCalculate}>=</Button>
          <Button type="primary" onClick={() => handleOperatorClick('+')}>+</Button>
          
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleClear}
            style={{ gridColumn: 'span 4' }}
          >
            清除
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Calculator;
