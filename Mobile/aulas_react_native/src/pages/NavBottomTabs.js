import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import Home from './Home';
import Cadastro from './Cadastro';
import Relatorio from "./Relatorio";
import Grafico from './Grafico';
import Login from './Login';
import NavDrawer from './NavDrawer';

const Tab = createBottomTabNavigator();

const NavBottomTab = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Login">

                <Tab.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        title: 'Tela Principal',
                        headerStyle: { backgroundColor: '#7fff62' },
                        headerTitleAlign: 'center',
                        headerTintColor: '#000000',
                        tabBarIcon: ({size, color}) => <AntDesign name="home" size={size} color={color} />
                    }}
                />

                <Tab.Screen 
                    name="Login" 
                    component={Login}
                    options={{
                        title: 'Login',
                        headerStyle: { backgroundColor: '#7fff62' },
                        headerTitleAlign: 'center',
                        headerTintColor: '#000000',
                        tabBarIcon: ({size, color}) => <AntDesign name="login" size={size} color={color} />
                    }}
                />

                <Tab.Screen 
                    name="MenuPrincipal" 
                    component={NavDrawer}
                    options={{
                        title: 'Menu Principal',
                        headerShown: false,
                        tabBarIcon: ({size, color}) => <AntDesign name="home" size={size} color={color} />
                    }}
                />

                <Tab.Screen 
                    name="Cadastro" 
                    component={Cadastro}
                    options={{
                        title: 'Tela de Cadastro',
                        headerStyle: { backgroundColor: '#ff9494' },
                        headerTitleAlign: 'center',
                        headerTintColor: '#000000',
                        tabBarIcon: ({size, color}) => <AntDesign name="login" size={size} color={color} />
                    }}
                />

                <Tab.Screen 
                    name="Relatorio" 
                    component={Relatorio}
                    options={{
                        title: 'Tela de Relatório',
                        headerStyle: { backgroundColor: '#ffd484' },
                        headerTitleAlign: 'center',
                        headerTintColor: '#000000',
                        tabBarIcon: ({ size, color }) => <Entypo name="text-document" size={size} color={color} />
                    }}
                />

                <Tab.Screen 
                    name="Grafico" 
                    component={Grafico}
                    options={{
                        title: 'Tela de Gráfico',
                        headerStyle: { backgroundColor: '#bbff77' },
                        headerTintColor: '#108900',
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ size, color }) => <Entypo name="bar-graph" size={size} color={color} />
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default NavBottomTab;