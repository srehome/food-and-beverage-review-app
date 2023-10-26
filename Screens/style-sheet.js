import {StyleSheet} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    input:{
      height: 40,
      margin:12,
      borderWidth:1, 
      padding:10,
    },
    title: {
      fontSize: 30,
      color: '#44ccb4',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderWidth: 4,
      borderColor: '#545f71',
      borderRadius: 6,
      backgroundColor: '#f3fafb',
      textAlign: 'center',
      fontWeight: 'bold',
      position: 'absolute',
      top: '4%',
      right: '2%',
      left: '30%',
    },
    itemTitle: {
      fontSize: 25,
      color: '#44ccb4',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderWidth: 3,
      borderColor: '#545f71',
      borderRadius: 6,
      backgroundColor: 'aliceblue',
      textAlign: 'center',
      fontWeight: 'bold',
      position: 'absolute',
      top: '10%',
      right: '30%',
      left: '30%',
    },
    logostyle: {
      height: 100,
      width: '25%',
      position: 'absolute',
      top: '4%',
      left: '2%',
    },
    buttonContainer: {
      height: 100,
      marginHorizontal: '2%',
      backgroundColor: '#545f71',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical:20,
    },
    /*buttonContainer2: {
      height: 100,
      marginHorizontal: '2%',
      backgroundColor: '#545f71',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      position: 'absolute',
      bottom: '3%',
      width: '96%',
    },*/
    // Add Item Button elements
    buttonText:{
      textTransform: 'uppercase',
      color: '#fff',
      fontSize: 22,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f0fbfa',
    },
    temp: {
      marginTop: 150
    },
    listView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '4%',
      paddingRight: '3%',
      paddingTop: '2%',
    },
    listText: {
      fontSize: 20,
    }
  });

  export default styles;