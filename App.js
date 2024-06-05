import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StaticEvolution from './src/Evolution/StaticEvolution'
import MixedIntitativeEvolution from './src/Evolution/MixedIntitativeEvolution';
import DisplayStatBlock from './src/CommonComponents/DisplayStatBlock';
import SearchManual from './src/CommonComponents/SearchManual';

import "./styles.css"

export default function App() {
  let [mode, setMode] = useState("static")

  if (mode == "static"){
    content = <StaticEvolution /> 
  }else if (mode == "mixed"){
    content = <MixedIntitativeEvolution/> 
  }else{
    content =  <SearchManual/>
  }
  return (
    <div className='parent'>
        <div>
          <button onClick={() => setMode("static")}>Static</button>
          <button onClick={() => setMode("mixed")}>Mixed Initiative</button>
          <button onClick={() => setMode("search")}>Search Manual</button>
        </div>

        {content}
          
    </div>

  );
}
