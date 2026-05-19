import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

// Importando as telas do projeto
import Home from "./Home";
import Cadastro from "./Cadastro";
import Relatorio from "./Relatorio";
import Grafico from "./Grafico";
import Aula02 from '../../components/Aula02';
import Aula03 from "../../components/Aula03";
import Aula04 from "../../components/Aula04";
import Aula05 from "../../components/Aula05";
import Aula06 from "../../components/Aula06";

// Criando uma constante que cria o estilo de navegação em Stack
const drawer = createDrawerNavigator();

const NavDrawer = () => {
  return (
    // <NavigationContainer>
      <drawer.Navigator 
        screenOptions={{
            drawerStyle: {backgroundColor: 'rgb(106, 255, 116)', width: 340},
            drawerLabelStyle: { fontSize: 18 },
            drawerActiveBackgroundColor: '#b9ff8a',
            drawerActiveTintColor: '#000000',
        }}
      >
        {/* Em name colocamos o nome da tela que outras telas chamarão */}
        {/* Em Component Colocamos o componente que queremos renderizar */}

        {/* Tela Principal */}
        <drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: "Tela Principal",
            animation: "fade_from_bottom",
            animationDuration: 300,
            headerStyle: { backgroundColor: "#7fff62" },
            headerTitleAlign: "center",
            headerTintColor: "#000000",
            drawerIcon: ({size, color}) => <AntDesign name="home" size={size} color={color} />
          }}
        />

        {/* Tela de Cadastro */}
        <drawer.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            title: "Tela de Cadastro",
            animation: "fade_from_bottom",
            animationDuration: 300,
            headerStyle: { backgroundColor: "#ff9494" },
            headerTitleAlign: "center",
            headerTintColor: "#000000",
            drawerIcon: ({size, color}) => <AntDesign name="login" size={size} color={color} />
          }}
        />

        {/* Tela de Relatório */}
        <drawer.Screen
          name="Relatorio"
          component={Relatorio}
          options={{
            title: "Tela de Relatório",
            animation: "fade_from_bottom",
            animationDuration: 300,
            headerStyle: { backgroundColor: "#ffd484" },
            headerTitleAlign: "center",
            headerTintColor: "#000000",
            drawerIcon: ({ size, color }) => <Entypo name="text-document" size={size} color={color} />
          }}
        />

        {/* Tela de Gráfico */}
        <drawer.Screen
          name="Grafico"
          component={Grafico}
          options={{
            title: "Tela de Gráfico",
            // headerShown: false,
            headerStyle: { backgroundColor: "#bbff77" },
            headerTintColor: "#108900",
            headerTitleAlign: "center",
            animationDuration: 300,
            animation: "fade_from_bottom",
            drawerIcon: ({ size, color }) => <Entypo name="bar-graph" size={size} color={color} />
          }}
        />

        <drawer.Screen
          name="Aula02"
          component={Aula02}
          options={{
            title: "Aula02",
            // headerShown: false,
            headerStyle: { backgroundColor: "#e6ff77" },
            headerTintColor: "#628900",
            headerTitleAlign: "center",
            animationDuration: 300,
            animation: "fade_from_bottom",
            drawerIcon: ({ size, color }) => <Entypo name="graduation-cap" size={size} color={color} />
          }}
        />

        <drawer.Screen
          name="Aula03"
          component={Aula03}
          options={{
            title: "Aula03",
            // headerShown: false,
            headerStyle: { backgroundColor: "rgb(255, 224, 122)" },
            headerTintColor: "#a5a842",
            headerTitleAlign: "center",
            animationDuration: 300,
            animation: "fade_from_bottom",
            drawerIcon: ({ size, color }) => <Entypo name="graduation-cap" size={size} color={color} />
          }}
        />

        <drawer.Screen
          name="Aula04"
          component={Aula04}
          options={{
            title: "Aula04",
            // headerShown: false,
            headerStyle: { backgroundColor: "#77ffcd" },
            headerTintColor: "#4291b3",
            headerTitleAlign: "center",
            animationDuration: 300,
            animation: "fade_from_bottom",
            drawerIcon: ({ size, color }) => <Entypo name="graduation-cap" size={size} color={color} />
          }}
        />

        <drawer.Screen
          name="Aula05"
          component={Aula05}
          options={{
            title: "Aula05",
            // headerShown: false,
            headerStyle: { backgroundColor: "#eb77ff" },
            headerTintColor: "#a949d8",
            headerTitleAlign: "center",
            animationDuration: 300,
            animation: "fade_from_bottom",
            drawerIcon: ({ size, color }) => <Entypo name="graduation-cap" size={size} color={color} />
          }}
        />

        <drawer.Screen
          name="Aula06"
          component={Aula06}
          options={{
            title: "Aula06",
            // headerShown: false,
            headerStyle: { backgroundColor: "rgb(97, 248, 55)" },
            headerTintColor: "#3db247",
            headerTitleAlign: "center",
            animationDuration: 300,
            animation: "fade_from_bottom",
            drawerIcon: ({ size, color }) => <Entypo name="graduation-cap" size={size} color={color} />
          }}
        />
      </drawer.Navigator>
    // </NavigationContainer>
  );
};

export default NavDrawer;
