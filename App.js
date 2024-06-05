import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StaticEvolution from './src/Evolution/StaticEvolution'
import MixedIntitativeEvolution from './src/Evolution/MixedIntitativeEvolution';

import "./styles.css"

export default function App() {
  let [mode, setMode] = useState("static")
  return (
    <div className='parent'>
        <div>
          <button onClick={() => setMode("static")}>Static</button>
          <button onClick={() => setMode("mixed")}>Mixed Initiative</button>
        </div>
        {mode == "static" ?  <StaticEvolution /> : <MixedIntitativeEvolution/>}
          
    </div>

  );
}
