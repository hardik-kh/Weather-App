import React,{useState,useEffect} from 'react';
import { StyleSheet, View,TextInput,FlatList,Text,TouchableOpacity, Alert,Button,Platform,StatusBar,PermissionsAndroid,AppState,ImageBackground,useWindowDimensions } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import {countries} from 'country-data'


export default function Search({navigation}){
    const [city,setCity] = useState('');
    const [cities,setCities] = useState([]);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const days=['Sun','Mon','Tues','Wed','Thus','Fri','Sat','Sun','Mon','Tues','Wed','Thus','Fri','Sat'];
    var bg;


    handleAppStateChange = nextAppState => {
      state={
        appState:AppState.currentState
      };
      if (
        this.state.appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        this._getLocationAsync();
      }
      this.setState({ appState: nextAppState });
    };
  
  
    useEffect(() => {
        (async () => {
          if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
              'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
          }
          try{
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
    
          }
          catch{
            Alert.alert('Alert!','You will need to open your location to get weather of your area',[
              {text:'OK',onPress:()=> console.log('Error')}
            ]);
          }
    
        })();
      }, []);

    const clickHandler= ()=> {
  
        if (location) {
          console.log(JSON.stringify(location.coords.latitude));
          console.log(JSON.stringify(location.coords.longitude));
          const latitude = JSON.stringify(location.coords.latitude);
          const longitude=JSON.stringify(location.coords.longitude);
          axios.get("https://api.weatherbit.io/v2.0/forecast/daily?&lat="+latitude+"&lon="+longitude+"&key=c8a42097ee0148de82b6fe4c5e85b6b5")
          .then(info =>{
            const city = info.data.city_name;
          const check = info.data.timezone;
          const country=countries[info.data.country_code].name;
          axios.get("http://worldtimeapi.org/api/timezone/"+check+".json")
          .then(time=>{
              var sunrisets=parseInt(info.data.data[0].sunrise_ts)-parseInt(info.data.data[0].ts);
              sunrisets = sunrisets-(5.5*60*60);
              var sunsetts=parseInt(info.data.data[0].sunset_ts)-parseInt(info.data.data[0].ts);
              sunsetts = sunsetts-(5.5*60*60);
              const dateobj1 = new Date(sunrisets*1000);
              const dateobj2 = new Date(sunsetts*1000);
              const sr =dateobj1.toLocaleString().slice(11,16);
              const ss =dateobj2.toLocaleString().slice(11,16);
              const temprature=info.data.data[0].temp;
              const samay=time.data.datetime.slice(11,16);
              const max_temp=info.data.data[0].max_temp;
              const min_temp=info.data.data[0].min_temp;
              const d1max_temp=info.data.data[1].max_temp;
            const d1min_temp=info.data.data[1].min_temp;
            const d2max_temp=info.data.data[2].max_temp;
            const d2min_temp=info.data.data[2].min_temp;
            const d3max_temp=info.data.data[3].max_temp;
            const d3min_temp=info.data.data[3].min_temp;
            const d4max_temp=info.data.data[4].max_temp;
            const d4min_temp=info.data.data[4].min_temp;
             const wind=info.data.data[0].wind_spd;
             const pop=info.data.data[0].pop;
             const pop1=info.data.data[1].pop;
           const pop2=info.data.data[2].pop;
           const pop3=info.data.data[3].pop;
           const pop4=info.data.data[4].pop;
           const cloud = info.data.data[0].clouds;
           const cloud1 = info.data.data[1].clouds;
           const cloud2 = info.data.data[2].clouds;
           const cloud3 = info.data.data[3].clouds;
           const cloud4 = info.data.data[4].clouds;
             const Sunrise=sr;
             const Sunset=ss;
             const date = parseInt(new Date().getDay());
            const day1 = days[date+1];
            const day2 = days[date+2];
            const day3 = days[date+3];
            const day4 = days[date+4];
            setCity('');
            setCities('');
             navigation.navigate('Weather',{city:city,country:country,temprature:temprature,Time:samay,
                max:max_temp,min:min_temp,windspd:wind,rain:pop,pop1:pop1,pop2:pop2,pop3:pop3,pop4:pop4,
                cloud:cloud,cloud1:cloud1,cloud2:cloud2,cloud3:cloud3,cloud4:cloud4,
                sunrise:Sunrise,sunset:Sunset,
                d1max_temp:d1max_temp,d1min_temp:d1min_temp,d2max_temp:d2max_temp,d2min_temp:d2min_temp,
                d3max_temp:d3max_temp,d3min_temp:d3min_temp,d4max_temp:d4max_temp,d4min_temp:d4min_temp,
                day1:day1,day2:day2,day3:day3,day4:day4});
          })
          
          
          
      })
          
        }
        else{
          const granted = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Alert!",
              message:
                "Please allow this app to use your Location", 
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          AppState.addEventListener('change',this.handleAppStateChange)

        }
        
      }



    

    const fetchCities = (val) => {
        setCity(val);
        if(val.length==0){
            val=val;
        }
        else{
            axios.get("https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query="+val+"&locationType=city&format=json")
            .then(data=>{
                setCities(data.data.location.address.slice(0,7))
                })
            .catch(error=>{
                setCity('');
                setCities('');
                Alert.alert('OOPS!','Something Went Wrong',[
                    {text:'OK',onPress:()=> console.log('error')}
                ])
            })

        }

            

        

        

        

    }

    const pressHandler = (item)=>{
        const length =item.split(',').length;
        const city = item.split(',')[0];
        const state = item.split(',')[length-1];
        axios.get("https://api.weatherbit.io/v2.0/forecast/daily?city="+city+","+state+"&key=c8a42097ee0148de82b6fe4c5e85b6b5")
        .then(info =>{
        const check = info.data.timezone;
        axios.get("http://worldtimeapi.org/api/timezone/"+check+".json")
        .then(time=>{

            var sunrisets=parseInt(info.data.data[0].sunrise_ts)-parseInt(info.data.data[0].ts);
            sunrisets = sunrisets-(5.5*60*60);
            var sunsetts=parseInt(info.data.data[0].sunset_ts)-parseInt(info.data.data[0].ts);
            const ts =new Date(parseInt(info.data.data[0].sunrise_ts)*1000);

            sunsetts = sunsetts-(5.5*60*60);
            const dateobj1 = new Date(sunrisets*1000);
            const dateobj2 = new Date(sunsetts*1000);
            const sr =dateobj1.toLocaleString().slice(11,16);
            const ss =dateobj2.toLocaleString().slice(11,16);
            const temprature=info.data.data[0].temp;
            const samay=time.data.datetime.slice(11,16);
            const max_temp=info.data.data[0].max_temp;
            const min_temp=info.data.data[0].min_temp;
            const d1max_temp=info.data.data[1].max_temp;
            const d1min_temp=info.data.data[1].min_temp;
            const d2max_temp=info.data.data[2].max_temp;
            const d2min_temp=info.data.data[2].min_temp;
            const d3max_temp=info.data.data[3].max_temp;
            const d3min_temp=info.data.data[3].min_temp;
            const d4max_temp=info.data.data[4].max_temp;
            const d4min_temp=info.data.data[4].min_temp;
           const wind=info.data.data[0].wind_spd;
           const pop=info.data.data[0].pop;
           const pop1=info.data.data[1].pop;
           const pop2=info.data.data[2].pop;
           const pop3=info.data.data[3].pop;
           const pop4=info.data.data[4].pop;
           const cloud = info.data.data[0].clouds;
           const cloud1 = info.data.data[1].clouds;
           const cloud2 = info.data.data[2].clouds;
           const cloud3 = info.data.data[3].clouds;
           const cloud4 = info.data.data[4].clouds;
           const Sunrise=sr;
           const Sunset=ss;
           const date = parseInt(new Date().getDay());
           const day1 = days[date+1];
           const day2 = days[date+2];
           const day3 = days[date+3];
           const day4 = days[date+4];
           
           setCity('');
           setCities('');
           navigation.navigate('Weather',{city:city,country:state,temprature:temprature,Time:samay,
            max:max_temp,min:min_temp,windspd:wind,rain:pop,pop1:pop1,pop2:pop2,pop3:pop3,pop4:pop4,
            cloud:cloud,cloud1:cloud1,cloud2:cloud2,cloud3:cloud3,cloud4:cloud4,
            sunrise:Sunrise,sunset:Sunset,
            d1max_temp:d1max_temp,d1min_temp:d1min_temp,d2max_temp:d2max_temp,d2min_temp:d2min_temp,
            d3max_temp:d3max_temp,d3min_temp:d3min_temp,d4max_temp:d4max_temp,d4min_temp:d4min_temp,
            day1:day1,day2:day2,day3:day3,day4:day4});
            
        })
        .catch(error=>{
            setCity('');
            setCities('');
            Alert.alert('OOPS!','We dont have weather for this location',[
                {text:'OK',onPress:()=> console.log('error')}
            ])
        })   
        
    })
    .catch(error=>{
        setCity('');
        setCities('');
        Alert.alert('OOPS!','We dont have weather for this location',[
            {text:'OK',onPress:()=> console.log('error')}
        ])
    })
}

const {width:windowWidth, height:windowHeight} = useWindowDimensions();

var hours = new Date().getHours();
if(hours<=5 || hours>=19){
  bg=require('../assets/nighttime.jpg');
}
else{
  bg=require('../assets/daytime.jpg');
}

    
    return(
      <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.2)'}}>
                    <StatusBar barStyle='light-content'/>
                        <ImageBackground source={bg}
        style={{width:windowWidth,height:windowHeight}}>
          <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.2)'}}>

                    <View style={{marginTop:'8%',alignItems:'center'}}>
  
                

            <TextInput
                style={styles.input}
                placeholder='Enter Location'
                value={city}
                onChangeText={(val)=> fetchCities(val)} />

            <TouchableOpacity onPress={() => clickHandler()}>
              <View style={styles.button}>
              <Text style={styles.text}>Use my Location</Text>

            </View>

        </TouchableOpacity>
            
            <FlatList
            data={cities}
            renderItem={({item})=>{
                return(
                    <TouchableOpacity onPress={() => pressHandler(item)}>
                    <Card 
                    style={{margin:2,padding:12,justifyContent:'center',alignItems: 'center',width:300,borderWidth:3,borderColor:'green'}}>
                        
                            <Text style={{fontWeight:'bold'}}>{item}</Text>
                        
                        
                    </Card>
                    </TouchableOpacity>

                )
            }}
            keyExtractor={item=>item}
        />

        
            
        
            
                
            
        </View>
        </View>
        </ImageBackground>

      </View>


        

    );
}

const styles = StyleSheet.create({

    input:{
        marginTop: '30%',
        marginBottom:'2%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding:10,
        borderWidth:3,
        borderColor:'black',
        width:300,
        color:'black',
        backgroundColor:'white',
        textShadowColor:'black'
    },
    button:{
        marginTop:'2%',
        marginBottom:'2%',
        borderRadius:8,
        backgroundColor:'deepskyblue',
        paddingVertical:12,
        paddingHorizontal:16
    },
    text:{
      color:'white',
      fontWeight:'bold',
      fontSize:16,
      textTransform:'uppercase'
    }
});
