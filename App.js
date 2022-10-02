
import React, { useState } from 'react';

import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
} from 'react-native';

const Slab = (props) => {
  if (props.bmi == null){
    return (<Text></Text>);
  }else if(props.bmi <= 18.5){
    return(<Text style={styles.regularText}>Your are Underweight</Text>);
  }else if(props.bmi > 18.5 && props.bmi <=24.9){
    return(<Text style={styles.regularText}>Your are normal weight</Text>);
  }else if(props.bmi >= 25 && props.bmi<= 29.9){
    return(<Text style={styles.regularText}>You are Overwieght</Text>);
  }else{
    return(<Text style={styles.regularText}>Your are Obese</Text>);
  }
}

const App = () => {

  const [bmi, setBmi] = useState(null);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [imperial, setImperial] = useState(false);
  
  //Calculate the BMI and put them in a textBox
  const onPress = () => {
    
    var new_weight = parseFloat(weight)
    var new_height = parseFloat(height)
    
    //convert imperial to metric  
    if(imperial == true){
      new_weight = new_weight * 0.45359237
      new_height = new_height/3.2808
    }

    let val = new_weight/(new_height*new_height)
    setBmi(val.toFixed(2))
  }

  return (
    <ScrollView>
      <View style={styles.headerParent}>
        <Text style={styles.header}>BMI CALCULATOR</Text>   
      </View>

      <View style= {styles.parentView}>
        <TextInput 
          style={styles.textBox}
          placeholder={(imperial == true)? "Height(ft)": "Height(m)"}
          onChangeText={newText => setHeight(newText)}
        />
        <TextInput 
          style={styles.textBox}
          placeholder={(imperial == true)? "Weight(lbs)": "Weight(kgs)"}
          onChangeText={newText => setWeight(newText)}
        />

        <View style={styles.toggleSpace}>
          <Text style={styles.toggleLabel}>Imperial:</Text>
          <Switch
            style={styles.toggle}
            trackColor={{false: "#767577", true: '#C3B1E1'}}
            thumbColor={imperial ? "#C3B1E1" : "#f4f3f4"}
            onValueChange={ () => {
              imperial == true? setImperial(false):setImperial(true)  
            }}
            value = {imperial}
          />
        </View>

        <TouchableOpacity
          style = {styles.button}
          onPress = {onPress}
        >
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>
      
        {bmi == null? <Text style={styles.regularText}></Text> : <Text style={styles.regularText}>Your BMI is: {bmi}</Text>}
        
        <Slab bmi={bmi}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textBox: {
    height:40,
    borderRadius: 30,
    textAlign: 'center',
    borderColor: "#C3B1E1",
    borderWidth: 2,
    marginLeft:40,
    marginRight:40,
    marginTop:20
  },
  regularText: {
    textAlign: 'center',
    fontSize: 18,
    marginLeft:40,
    marginRight:40,
    marginTop:20,
    marginBottom: 10,
  },

  button: {
    marginTop: 20,
    marginLeft: 100,
    marginRight: 100,
  },

  buttonText: {
    backgroundColor: "#F8C8DC",
    borderRadius: 30,
    height: 40,
    textAlign: "center",
    textAlignVertical: 'center',
    textSize:50,

  },

  parentView: {
    marginTop: 15
  },

  headerParent: {
  },
  
  header: {
    marginLeft: 10,
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 20,
    color: '#C3B1E1'
  },
  toggleSpace: {
    allignItems: 'center',
    marginTop:20
  },

  toggleLabel: {
    textAlign: 'center'
  },

  toggle: {
    marginRight: 180
  }
});

export default App;
