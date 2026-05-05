// Aqui é onde importaremos todas os componentes nescessários utilizados nas aulas
import { ScrollView } from 'react-native';
import Aula02 from './components/Aula02.js';
import Aula03 from './components/Aula03.js';
// todo componente utilizado em React Native precisa ser importado
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <ScrollView>
      <Aula02/>
      <Aula03/>
    </ScrollView>
  );
}

// Para fazer uma estilização utilizamos um objeto e o componente StyleSheet
// Esse objeto é igual fizemos em React
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});