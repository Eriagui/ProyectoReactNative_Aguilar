import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPlacesScreen from "../screens/MyPlacesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Header from "../components/Header";

const Stack = createNativeStackNavigator()

const MyPlacesNavigator = ()=>(
    <Stack.Navigator 
    screenOptions={{
        header: ({ route }) => (<Header title="Erick's Store" subtitle={route.name} />)
    }}>
        <Stack.Screen name="My Addresses" component={MyPlacesScreen} />
    </Stack.Navigator>
)

export default MyPlacesNavigator