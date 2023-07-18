import React from 'react';
import GlobalStyle from './styles/GlobalStyle'
import Canvas from './components/Canvas';
export default function App() {
  return (
    <>
    <GlobalStyle />
    <div className="App">
      <Canvas/>
    </div>
    </>
  );
}