import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ParkingMapScreen from "./src/screens/ParkingMapScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    ParkingMap: ParkingMapScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
