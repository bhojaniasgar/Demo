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

/**
 * The App component serves as the root component of the application.
 * It sets up the Redux provider for state management and the persistence gate
 * for Redux persist. It also configures the navigation container for managing
 * navigation between screens and includes a stack navigator with custom screen options.
 * The main screens included are the ProductCatalog and Cart.
 * Additionally, it wraps the application in a PaperProvider for theming support
 * and configures the StatusBar with a transparent background and dark content.
 */
function App(): React.JSX.Element {
  const screenOptions = {
    headerShown: false,
    gestureEnabled: true,
    /**
     * An animation function for the navigation stack that translates the screen
     * from the right edge of the screen to the left edge when navigating between
     * screens. The animation is defined using the interpolate function provided
     * by the react-navigation library.
     * @param {{ current: any; layouts: any }} arg - The current navigation state and the layout of the screen
     * @returns {{ cardStyle: { transform: any[] } }} - The animation style for the current screen
     */
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
  };
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
