import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import FileSystem from 'react-native-filesystem';

import Camera from 'react-native-camera';

async function readFile(uri) {
  const fileContents = await FileSystem.readFile(uri);
  console.log(`read from file: ${fileContents}`);
  }

export default class DogCamera extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.viewfinder}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.temp}
        >
          <ActionButton
            onPress={this.takePicture.bind(this)}
            icon='camera'
            style={{
              shutter: styles.shutter
            }}
          />
        </Camera>
      </View>
    );
  }

  takePicture () {
    this.camera.capture()
      .then(photo => {
        this.props.navigate.push('recognized', {
          photo: photo.path,
          breed: 'Big ol pupper'
        });
      })
      .catch(err => console.log(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewfinder: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center'
  },
  shutter: {
  }
});
