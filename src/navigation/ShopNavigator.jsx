import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { CategoriesScreen, ProductsScreen, ProductScreen } from "../screens"
import Header from "../components/Header"


const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
  return (
        <Stack.Navigator
            screenOptions = {{
                header: ({route})=><Header subtitle={route.name}/>
            }}
        >
            <Stack.Screen name="Categories" 
                /*options={{ title: 'Categorías locas' }} */
                component={CategoriesScreen} 
            />
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
        </Stack.Navigator>
  )
}

export default ShopNavigator

