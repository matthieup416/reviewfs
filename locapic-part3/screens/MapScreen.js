import { useEffect, useState } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { addPlace } from '../reducers/user'
//
import * as Location from 'expo-location'

export default function MapScreen() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)

  const [currentPosition, setCurrentPosition] = useState(null)
  const [tempCoordinates, setTempCoordinates] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [newPlace, setNewPlace] = useState('')
  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      console.log('status', status)
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords)
        })
      }
    })()
  }, [])

  const handleLongPress = (e) => {
    setTempCoordinates(e.nativeEvent.coordinate)
    setModalVisible(true)
  }

  const handleNewPlace = () => {
    dispatch(
      addPlace({
        name: newPlace,
        latitude: tempCoordinates.latitude,
        longitude: tempCoordinates.longitude,
      })
    )
    setModalVisible(false)
    setNewPlace('')
  }

  const handleClose = () => {
    setModalVisible(false)
    setNewPlace('')
  }

  const markersDisplay = user.places.map((e, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: e.latitude, longitude: e.longitude }}
      ></Marker>
    )
  })

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={modalVisible} animationType='fade' transparent>
        <View style={styles.centeredView}>
          <View>
            <TextInput
              placeholder='New place'
              onChangeText={(value) => setNewPlace(value)}
              value={newPlace}
            />
            <TouchableOpacity
              onPress={() => handleNewPlace()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClose()} activeOpacity={0.8}>
              <Text style={styles.textButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <MapView
        mapType='hybrid'
        style={{ flex: 1 }}
        onLongPress={(e) => handleLongPress(e)}
      >
        {currentPosition && (
          <Marker
            coordinate={currentPosition}
            title='My position'
            pinColor='#fecb2d'
          />
        )}

        {markersDisplay}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    backgroundColor: 'white',
    width: '80%',
  },
})
