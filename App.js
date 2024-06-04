import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StaticEvolution from './src/Evolution/StaticEvolution'
import "./styles.css"

export default function App() {
  return (
    <div className='parent'>
         <StaticEvolution /> 
    </div>

  );
}
