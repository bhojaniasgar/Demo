import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import ProductCatalog from './src/screens/ProductCatalog';
import Cart from './src/screens/Cart';
import store, { persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const screenOptions={
    headerShown: false,
    gestureEnabled: true,
    cardStyleInterpolator: ({ current, layouts }: { current: any; layouts: any }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
        <PaperProvider>
          <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />
          <Stack.Navigator initialRouteName={RouteConst.PRODUCT_CATALOG_SCREEN} screenOptions={screenOptions}>
            <Stack.Screen name={RouteConst.PRODUCT_CATALOG_SCREEN} component={ProductCatalog} />
            <Stack.Screen name={RouteConst.CART_SCREEN} component={Cart} />
          </Stack.Navigator>
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;


export const RouteConst = {
  PRODUCT_CATALOG_SCREEN: 'ProductCatalog',
  CART_SCREEN: 'Cart',
};
