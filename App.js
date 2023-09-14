
import React from 'react'; 
import {
  StyleSheet, 
  Pressable, 
  Button,
  View,
  Text 
} from 'react-native';


const App = () => {
  const [text, onChangeText] = React.useState('Search');
  return (
    <View   // Roughly where the searchbar will go 
       style={{
       width: 200,
       height: 200,
       padding: 40,
      }}>
       <Text>HomeScreen</Text>

       <View style={styles.buttonContainer}>
      <Button
          
          color='pink'
          title="Brands"
          
      />
      </View>

    

    </View>
     
      


  );
};

const styles = StyleSheet.create({
  input:{
    height: 40,
    margin:12,
    borderWidth:1, 
    padding:10,
  },
  buttonContainer: {
    width: 250,
    heigth: 156,
    marginHorizontal: 20, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: 'black'
  },
  button: {
    backgroundColor: 'green', 
    borderColor: 'black',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 18,
    borderColor: 'black'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App; 
 
