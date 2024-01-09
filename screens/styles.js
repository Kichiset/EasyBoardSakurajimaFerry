import { StyleSheet } from 'react-native';
import axios from 'axios';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
 },
 container: {
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1D1D1D',
},
container2: {
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#DFAF89',
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  DepartPortTitle: {
    fontSize: 30,
    color:'#DFAF89',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  currentTime: {
    fontSize: 30,
    color:'#DFAF89',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  current4DepartureTime: {
    fontSize: 30,
    color:'#DFAF89',
    marginTop: 0,
    marginBottom: 10,
    fontWeight: 'bold',
    alignItems: 'center',
  },
    portTitle: {
    fontSize: 30,
    color:'#1D1D1D',
    marginTop: 0,
    marginBottom: 15,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  kagoFrame:{
    marginTop: 10,
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    borderColor: '#5F3770',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    margin: 'auto',
    width: 250,
  },
  sakuraFrame:{
    marginTop: 10,
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    margin: 'auto',
    width: 250,
  },
  nextDeparture: {
    fontSize: 30,
    color:"#1D1D1D",
    fontWeight: 'bold',
    alignItems: 'center',
  },
  headLineNews:{
    marginTop: 30,
    marginBottom: 0,
    borderWidth: 1,
    textColor: '#1D1D1D',
    backgroundColor: '#EBEBEB',
    margin: 'auto',
    width: 350,
    height: 30,
    borderRadius: 255,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareLink:{
    marginTop: 30,
    marginBottom: 0,
    borderWidth: 1,
    textColor: '#1D1D1D',
    backgroundColor: '#EBEBEB',
    margin: 'auto',
    width: 200,
    height: 30,
    borderRadius: 255,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerColumn: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bottomColumn: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
    buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#EBEBEB', //白藍
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  mainButton: {
    backgroundColor: '#EBEBEB', //白藍
    borderWidth: 1,
    marginTop: 20,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row', // ボタンを横並びに配置
    backgroundColor: '#EBEBEB', //白藍
    
    marginTop: 20,
    alignItems: 'center',
    margin: 'auto',
  },
  sakuraButton: {
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    textColor:'white',
    marginTop: 25,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
  kagoButton: {
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    marginTop: 25,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
  buttonText: {
    color: '#1C1C1C',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  linkButtonText: {
    backgroundColor: '#EBEBEB',
    padding: 20,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },  
  linkButtonTop: {
    marginTop: 30,
    padding: 10,
  },
  linkButton: {
    marginTop: 10,
    padding: 10,
  },
  linkButtonImage: {
    width: 200,
    height: 60,
    borderRadius: 5,
  },
  seletTopButton: {
    backgroundColor: '#EBEBEB', //白藍
    borderWidth: 1,
    marginTop: 0,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
    seletButton: {
    backgroundColor: '#EBEBEB', //白藍
    borderWidth: 1,
    marginTop: 5,
    alignItems: 'center',
    margin: 'auto',
    width: 200,
  },
    adBanner: {
    marginTop: 20,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  bannerImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  bannerDescription:{
      color:'#DFAF89'
  }
});