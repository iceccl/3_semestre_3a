import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Importando as telas do projeto
import Home from './Home';
import Cadastro from './Cadastro';
import Relatorio from "./Relatorio";
import Grafico from './Grafico'

// Criando uma constante que cria o estilo de navegação em Stack
const Stack = createNativeStackNavigator();

const NavStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>

                {/* Em name colocamos o nome da tela que outras telas chamarão */}
                {/* Em Component Colocamos o componente que queremos renderizar */}

                {/* Tela Principal */}
                <Stack.Screen name="Home" component={Home}
                    options={{
                        title: 'Tela Principal',
                        animation: 'fade_from_bottom',
                        animationDuration: 300,
                        headerStyle: { backgroundColor: '#7fff62' },
                        headerTitleAlign: 'center',
                        headerTintColor: '#000000',
                    }}
                />

                {/* Tela de Cadastro */}
                <Stack.Screen name="Cadastro" component={Cadastro}
                    options={{
                        title: 'Tela de Cadastro',
                        animation: 'fade_from_bottom',
                        animationDuration: 300,
                        headerStyle: { backgroundColor: '#ff9494' },
                        headerTitleAlign: 'center',
                        headerTintColor: '#000000',
                    }}
                />

                {/* Tela de Relatório */}
                <Stack.Screen name="Relatorio" component={Relatorio}
                    options={{
                        title: 'Tela de Relatório',
                        animation: 'fade_from_bottom',
                        animationDuration: 300,
                        headerStyle: { backgroundColor: '#ffd484' },
                        headerTitleAlign: 'center',
                        headerTintColor: '#000000',
                    }}
                />

                {/* Tela de Gráfico */}
                <Stack.Screen name="Grafico" component={Grafico}
                    options={{
                        title: 'Tela de Gráfico',
                        // headerShown: false,
                        headerStyle: { backgroundColor: '#bbff77' },
                        headerTintColor: '#108900',
                        headerTitleAlign: 'center',
                        animationDuration: 300,
                        animation: 'fade_from_bottom',
                        
                    }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavStack