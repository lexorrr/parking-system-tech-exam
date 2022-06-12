import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, SafeAreaView, Button, View } from 'react-native';
import Parking from './Parking';
const parking = new Parking();

const HomeScreen = ({ navigation }) => {
  
  const [entryPoints, setText] = useState('');
  const [check, setCheck] = useState(true);

  const [park, setPark] = useState(false);
  const [parkButton, setParkButton] = useState(true);
  const [unPark, setUnPark] = useState(true);
  const [entryPointText, setEntryPointText] = useState('');
  const [vehicleSize, setvehicleSizeText] = useState('');

  const [row, setRow] = useState('');
  const [col, setCol] = useState('');

  const [totalPayable, setTotalPayable] = useState('0');

  const validateEntryPoints = (entryPoints) => {
    if (entryPoints !== '') {
      parking.initParkingMap(entryPoints);
      setCheck(!parking.parkingMap);
      setPark(true);
      setParkButton(false);
      parking.viewParkingMap();
    } else {
      console.log('Entry points must not be blank!');
    }
  }

  const validateUnparkFields = (row, col) => {
    if (row === '' || col === '') {
      console.log('Unpark fields are required!');
      return;
    }

    setTotalPayable(parking.unpark(row, col));
  }

  return (
    <SafeAreaView>
      <Text style={styles.headerText}>Parking System</Text>
      <View style={styles.space}></View>
      <Text style={styles.subHeaderText}>Enter parking entry points</Text>
      <TextInput
        placeholder='Minimum of 3'
        style={styles.input}
        onChangeText={newText => setText(newText)}
      />
      
      <Button 
        title='Initialize parking space'
        onPress={() => {
          setTotalPayable('');
          validateEntryPoints(entryPoints);
        }}
      />
      <View style={styles.space}></View>
      <Button 
        disabled={check}
        title='View Map'
        onPress={() => {
          setTotalPayable('');
          navigation.navigate('ParkingMap', {parking: parking.parkingMap});
        }}
      />
      <View style={styles.space}></View>
      <Text style={styles.subHeaderText}>Park vehicle</Text>
      <TextInput
        editable={park}
        placeholder='Vehicle Size (0 - S, 1 - M, 2 - L)'
        selectTextOnFocus={park}
        style={styles.parkInput}
        onChangeText={newText => setvehicleSizeText(newText)}
      /><TextInput
        editable={park}
        selectTextOnFocus={park}
        placeholder='Entry Point (A, B, C...)'
        style={styles.parkInput}
        onChangeText={newText => setEntryPointText(newText)}
      />
    <Button 
      disabled={parkButton}
      title='Submit parking details'
      onPress={() => {
        setTotalPayable('');
        parking.park(entryPointText, vehicleSize);
      }}
    />
      <View style={styles.space}></View>
      <Text style={styles.subHeaderText}>Unpark vehicle (enter position: row, col)</Text>
      <TextInput
        editable={park}
        placeholder='row'
        selectTextOnFocus={park}
        style={styles.parkInput}
        onChangeText={newText => setRow(newText)}
      /><TextInput
        editable={park}
        selectTextOnFocus={park}
        placeholder='col'
        style={styles.parkInput}
        onChangeText={newText => setCol(newText)}
      />
    <Button 
      disabled={parkButton}
      title='Unpark vehicle'
      onPress={() => {
        validateUnparkFields(row, col);
      }}
    />
    <Text style={styles.subHeaderText}>Total payable: {totalPayable}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  parkInput: {
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    fontSize: 25,
    textAlign: 'center'
  },
  subHeaderText: {
    fontSize: 15,
    paddingLeft: 10
  },
  space: {
    height: 5
  }
});

export default HomeScreen;
