import React from 'react';
import { TextInput, StyleSheet, SafeAreaView, View, Text, FlatList } from 'react-native';
import util from 'util';
import uuid from 'react-native-uuid';
import moment from 'moment';

const ParkingMapScreen = (props) => {
    const parking = props.navigation.state.params.parking;
    console.log(util.inspect(parking, {
        showHidden: false,
        colors: true,
        compact: true,
        depth: null
    }));

    const renderVehicleParkedDetails = (innerProp) => {
        if (innerProp.occupied) {
            return `Vehicle size: ${innerProp.vehicleSize.desc},
                Start date time: ${moment(innerProp.startDateTime).format('MM/DD/YYYY HH:mm:ss A')}`;
        } 

        return '';
    }

    const renderChildText = (innerProp) => {
        if (innerProp !== null) {
            return `Entry point: ${innerProp.entryPoint}, 
                Occupied: ${innerProp.occupied}, 
                Parking size: ${innerProp.parkingSize.desc},
                Distance: ${innerProp.distance},
                Position: row: ${innerProp.position.row} col: ${innerProp.position.col}
                ${renderVehicleParkedDetails(innerProp)}`;
        }

        return '';
    }

    return (
        <SafeAreaView>
            <FlatList 
            keyExtractor={() => uuid.v4()}
            data={parking}
            renderItem={(parkingSlot) => { 
                return parkingSlot.item.map((innerProp) => {
                    return (
                        <Text key={uuid.v4()} keyExtractor={() => uuid.v4()} style={styles.text}>
                            {renderChildText(innerProp)}
                        </Text>
                    );
                });
            }} 
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        paddingLeft: 5,
        paddingBottom: 2,
        fontSize: 14
    },
    view: {
        borderWidth: 0.5,
        borderColor: 'black'
    }
});

export default ParkingMapScreen;