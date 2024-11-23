import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import Header from "../components/Header";

const Stack = createNativeStackNavigator()

const ProfileNavigator = ()=>(
    <Stack.Navigator 
    screenOptions={{
        header: ({ route }) => (<Header title="Erick's Store" subtitle={route.name} />)
    }}>
        <Stack.Screen name="Your Profile" component={ProfileScreen} />
    </Stack.Navigator>
)

export default ProfileNavigator
