/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} = React;

var AwesomeProject = React.createClass({
  // Set the initial state
  getInitialState: function() {
    return {
      source: null
    };
  },

  launchPicker: function(){
    var options = {
      title: 'Select Avatar', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      customButtons: {
        'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
      },
      maxWidth: 100,
      maxHeight: 100,
      quality: 0.2,
      allowsEditing: false, // Built in iOS functionality to resize/reposition the image
      noData: false, // Disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }
    };

    UIImagePickerManager.showImagePicker(this.options, (didCancel, response) => {
      if (didCancel) {
        console.log('User cancelled image picker');
      }

      else {
        // Get the source and set the state
        console.log("Got the response", response);
        this.setState({
          source: {uri: response.uri ,isStatic: true}
        });
      }
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={this.state.source} />
        <TouchableHighlight onPress={this.launchPicker}>
          <Text>Select an image...</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  image: {
    height: 100,
    width: 100
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
