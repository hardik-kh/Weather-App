import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Search from '../screens/Search';
import Day from '../screens/Day';

const screens ={
    Search :{
        screen: Search,
        navigationOptions:{
            headerShown : false

        }
        
    },
    Weather:{
        screen: Day,
        navigationOptions:{
            headerShown: false

        }
    }

}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);