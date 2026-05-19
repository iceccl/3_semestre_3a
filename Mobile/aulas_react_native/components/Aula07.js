import { View, Text } from "react-native";
import Hr from "./Hr.js";
import * as Animar from 'react-native-animatable'

const Aula07 = () => {

    return (
        <View>
            <Hr />
            <Text>Aula07 - Estilos de navegação Tabs e Animações</Text>
            <Text>Criando navegação por abas e aprendendo sobre Animações</Text>
            <Hr/>
            <Animar.Text animation='fadeInLeft'> Texto Animado</Animar.Text>
            {/* delay sempre em milisegundos */}
            <Animar.Text animation='fadeInUp' delay={2000}> Texto Animado com delay</Animar.Text>
            <Animar.Image source={require ('../assets/icon.png')}
                style = {{ width: 100, height: 100}}
                animation='lightSpeedIn' iterationCount={'infinite'}
            />
        </View>
    )
}

export default Aula07