import React,{useState,useEffect} from 'react';
import { ImageBackground, StyleSheet, Text, useWindowDimensions, View,ScrollView,Image,StatusBar, } from 'react-native';
import axios from 'axios';




export default function Day({navigation}){

  
  const city = navigation.getParam('city');
  const state = navigation.getParam('country');
  const temp = navigation.getParam('temprature');
  const time = navigation.getParam('Time');
  var timeperiod='';
  var bgimg;
  const period = parseInt(time.split(':')[0]);
  if(period<12){
    timeperiod = 'AM';
  }
  else{
    timeperiod = 'PM';

  }

  const maxtemp = navigation.getParam('max');
  const mintemp = navigation.getParam('min');
  var wind = navigation.getParam('windspd');
  var windspd=parseFloat(wind);
  windspd = Math.round(windspd * 100) / 100;
  wind= windspd.toString();
  const rain = navigation.getParam('rain');
  const sunrise = navigation.getParam('sunrise');
  const sunset = navigation.getParam('sunset');
  const d1max_temp = navigation.getParam('d1max_temp');
  const d1min_temp = navigation.getParam('d1min_temp');
  const d2max_temp = navigation.getParam('d2max_temp');
  const d2min_temp = navigation.getParam('d2min_temp');
  const d3max_temp = navigation.getParam('d3max_temp');
  const d3min_temp = navigation.getParam('d3min_temp');
  const d4max_temp = navigation.getParam('d4max_temp');
  const d4min_temp = navigation.getParam('d4min_temp');
  const day1 = navigation.getParam('day1');
  const day2 = navigation.getParam('day2');
  const day3 = navigation.getParam('day3');
  const day4 = navigation.getParam('day4');
  const pop1 = parseInt(navigation.getParam('pop1'));
  const pop2 = parseInt(navigation.getParam('pop2'));
  const pop3 = parseInt(navigation.getParam('pop3'));
  const pop4 = parseInt(navigation.getParam('pop4'));
  const cloud = parseInt(navigation.getParam('cloud'));
  const cloud1 = parseInt(navigation.getParam('cloud1'));
  const cloud2 = parseInt(navigation.getParam('cloud2'));
  const cloud3 = parseInt(navigation.getParam('cloud3'));
  const cloud4 = parseInt(navigation.getParam('cloud4'));

  if(rain>=30){
    bgimg=require('../assets/rain.jpg');
    img = require('../assets/rain.png');
  }
  else if(period<5 || period>19){
    bgimg=require('../assets/nighttime.jpg');
    img = require('../assets/moon.png');

  }
  else if(cloud>20){
    bgimg=require('../assets/cloudy.jpg');
    img = require('../assets/cloudy.png');
  }
  else{
    bgimg=require('../assets/daytime.jpg');
    img = require('../assets/sunny.png');
  }

  if(rain>=30){
    var report = 'Showers';
    var d1img=require("../assets/rainy.png");
  }
  else if(cloud>30){
    var report = 'Cloudy';
    var d1img=require("../assets/cloud.png");
  }
  else{
    var report = 'Sunny';
    var d1img=require("../assets/cloudy-sun.png");

  }


  if(pop1>=30){
    var report1 = 'Showers';
    var d2img=require("../assets/rainy.png");
  }
  else if(cloud1>30){
    var report1 = 'Cloudy';
    var d2img=require("../assets/cloud.png");
  }
  else{
    var report1 = 'Sunny';
    var d2img=require("../assets/cloudy-sun.png");
  }

  if(pop2>=30){
    var report2 = 'Showers';
    var d3img=require("../assets/rainy.png");
  }
  else if(cloud2>30){
    var report2 = 'Cloudy';
    var d3img=require("../assets/cloud.png");
  }
  else{
    var report2 = 'Sunny';
    var d3img=require("../assets/cloudy-sun.png");

  }

  if(pop3>=30){
    var report3 = 'Showers';
    var d4img=require("../assets/rainy.png");
  }
  else if(cloud3>30){
    var report3 = 'Cloudy';
    var d4img=require("../assets/cloud.png");
  }
  else{
    var report3 = 'Sunny';
    var d4img=require("../assets/cloudy-sun.png");

  }

  if(pop4>=30){
    var report4 = 'Showers';
    var d5img=require("../assets/rainy.png");
  }
  else if(cloud4>30){
    var report4 = 'Cloudy';
    var d5img=require("../assets/cloud.png");
  }
  else{
    var report4 = 'Sunny';
    var d5img=require("../assets/cloudy-sun.png");

  }





    const {width:windowWidth, height:windowHeight} = useWindowDimensions();



    return(    
      

          <View style={{flex:1}}>
            <StatusBar barStyle='light-content'/>
          <ImageBackground source={bgimg}
        style={{width:windowWidth,height:windowHeight,alignItems:'center'}}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor:'rgba(0,0,0,0.2)'}}>
            <Image source={img} style={{height:100,width:100,alignSelf:'center',marginTop:'20%'}}  />
          <View style={{justifyContent:'center',alignItems:'center',marginBottom:50,marginTop:'20%',padding:10}}>
            <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{temp}° C</Text>
            <Text style={{color:'white',fontSize:22,marginTop:'3%',fontWeight:'200'}}>{city} , {state}</Text>
            <Text style={{color:'white',fontSize:15}}>{time} {timeperiod}</Text>
          </View>
          <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}> 
            <View style={{flexDirection:'row'}}>
              <View style={{width:130}}>
              <Image source={d1img} style={styles.forcast_img}  />
              <Text style={styles.forcastdays}>Today</Text>
              <Text style={styles.forcast_desc}>{report}</Text>
              <Text style={styles.forcast_desc}>{maxtemp}°C  {mintemp}°C</Text>

              </View>
              <View style={{width:130}}>
              <Image source={d2img} style={styles.forcast_img}  />
              <Text style={styles.forcastdays}>{day1}</Text>
              <Text style={styles.forcast_desc}>{report1}</Text>
              <Text style={styles.forcast_desc}>{d1max_temp}°C  {d1min_temp}°C</Text>
              </View>
              <View style={{width:130}}>
              <Image source={d3img} style={styles.forcast_img}  />
              <Text style={styles.forcastdays}>{day2}</Text>
              <Text style={styles.forcast_desc}>{report2}</Text>
              <Text style={styles.forcast_desc}>{d2max_temp}°C  {d2min_temp}°C</Text>
              </View>
              <View style={{width:130}}>
              <Image source={d4img} style={styles.forcast_img}  />
              <Text style={styles.forcastdays}>{day3}</Text>
              <Text style={styles.forcast_desc}>{report3}</Text>
              <Text style={styles.forcast_desc}>{d3max_temp}°C  {d3min_temp}°C</Text>
              </View>
              <View style={{width:130}}>
              <Image source={d5img} style={styles.forcast_img}  />
              <Text style={styles.forcastdays}>{day4}</Text>
              <Text style={styles.forcast_desc}>{report4}</Text>
              <Text style={styles.forcast_desc}>{d4max_temp}°C  {d4min_temp}°C</Text>
              </View>
            
            

            </View>
          
          </ScrollView>
          <View style={{marginBottom:'20%'}}>

          <View style={{flexDirection:'row',marginTop:'30%',padding:10,marginLeft:'5%'}}>
            <View>
            <Image source={require("../assets/maxtemp-icon.png")} style={{height:30,width:30,marginRight:10,marginBottom:10}}  />
            <Image source={require("../assets/mintemp-icon.png")} style={{height:30,width:30,marginRight:10,marginBottom:10}}  />
            <Image source={require("../assets/wind-icon.png")} style={{height:30,width:30,marginRight:10,marginBottom:10}}  />
            <Image source={require("../assets/sunrise-icon.png")} style={{height:30,width:30,marginRight:10,marginBottom:10}}  />
            <Image source={require("../assets/sunset-icon.png")} style={{height:30,width:30,marginRight:10,marginBottom:10}}  />
            <Image source={require("../assets/rain-icon.png")} style={{height:30,width:30,marginRight:10,marginBottom:10}}  />
            </View>

            <View style={{marginRight:'20%'}}>
            <Text style={styles.text1}>Max Temp</Text>
            <Text style={styles.text1}>Min Temp</Text>
            <Text style={styles.text1}>Wind Speed</Text>
            <Text style={styles.text1}>Sunrise</Text>
            <Text style={styles.text1}>Sunset</Text>
            <Text style={styles.text1}>Chances of Rain</Text>
            </View>

            <View>
            <Text style={styles.text2}>{maxtemp} C</Text>
            <Text style={styles.text2}>{mintemp} C</Text>
            <Text style={styles.text2}>{wind} Km/hr</Text>
            <Text style={styles.text2}>{sunrise} AM</Text>
            <Text style={styles.text2}>{sunset} PM</Text>
            <Text style={styles.text2}>{rain} %</Text>
            </View>
            

            </View>
          
    
          
          </View>

          </ScrollView>
          
          
          
          </ImageBackground>
          </View>
          
        

    )

}

const styles = StyleSheet.create({
  text1:{
    color:'white',
    fontSize:18,
    fontWeight:'bold',
    marginBottom:16,

  },
  text2:{
    color:'white',
    fontSize:18,
    fontWeight:'bold',
    marginBottom:16
  },
  forcastdays:{
    fontSize:18,
    color:'white',
    textAlign:'center',
    fontWeight:'bold',
    marginRight:'5%',
    marginLeft:'5%'

  },
  description:{
    padding:'2%',
    marginLeft:'5%',
    marginRight:'5%'

  },
  forcast_img:{
    width:80,
    height:80,
    marginRight:30,
    marginLeft:25

  },
  forcast_desc:{
    fontSize:16,
    color:'white',
    textAlign:'center',
    marginLeft:'10%',
    marginRight:'10%'

  }
})
