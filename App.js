import 'react-native-gesture-handler'
import React from 'react';

import Inicio from "./views/Inicio";
import NuevoCliente from "./views/NuevoCliente";
import DetallesCliente from "./views/DetallesCliente";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

//Definir tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          >
            <Stack.Screen
              name="Inicio"
              component={Inicio}
              options={({ navigation, route }) => ({
                headerTitleAlign: 'center',
                /* headerLeft: (props) =>
                  <BarraSuperior
                    {...props}
                    navigation={navigation}
                    route={route} /> */
              })}
            />

            <Stack.Screen
              name="NuevoCliente"
              component={NuevoCliente}
              options={{
                headerTitleAlign: 'center',
                title: "Guardar Cliente"
              }}
            />

            <Stack.Screen
              name="DetallesCliente"
              component={DetallesCliente}
              options={{
                title: "Detalles Cliente"
              }}
            />


          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
