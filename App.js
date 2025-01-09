import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StaticEvolution from './src/Evolution/StaticEvolution'
import MixedIntitativeEvolution from './src/Evolution/MixedIntitativeEvolution';
import DisplayStatBlock from './src/CommonComponents/DisplayStatBlock';
import SearchManual from './src/CommonComponents/SearchManual';
import CreateCreature from './src/CommonComponents/CreateCreature';
import "./styles.css"

export default function App() {
  let [mode, setMode] = useState("create")

  if (mode == "static"){
    content = <StaticEvolution /> 
  }else if (mode == "mixed"){
    content = <MixedIntitativeEvolution/> 
  }else if (mode == "search"){
    content =  <SearchManual/>
  }else {
    content = <CreateCreature /> 
  }
  return (
    <div className='parent'>
        <div>
          <button onClick={() => setMode("static")}>Static</button>
          <button onClick={() => setMode("mixed")}>Mixed Initiative</button>
          <button onClick={() => setMode("search")}>Search Manual</button>
          <button onClick={() => setMode("create")}>Create Creature</button>
        </div>

        {content}
          
    </div>

  );
}
