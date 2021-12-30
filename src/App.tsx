import React from 'react';
import {Text} from './Text';
import "./App.css";
const App: React.FC = () => {
  return (
    <div className="App">
      <Text text="Hello World"  id={1}/>
    </div>
  );
}

export default App;
