import React, { useState, useEffect } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import Clima from './componentes/Clima';
import Formulario from './componentes/Formulario';

const App = ()  => {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  })
  const {ciudad, pais} = busqueda;
  const [consultar, guardarCosulta] = useState(false);
  const [datos, guardarDatos] = useState(false);

  useEffect(()=>{
    const consultarClima = async () => {
      if(consultar){
        const apiKey = 'c62d1b64c7ff8a5b19a105e5293c498f'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`

        try {
          const respuesta = await fetch(url);
          const data = await respuesta.json();

          if(data.cod === '404'){
            mostrarALerta('No encontrado, prueba con otro Pais y Ciudad');
          }else{
            guardarDatos(data);
            guardarCosulta(false);
          }
        } catch (error) {

        }
      }
    }
    consultarClima();
  }, [consultar])

const mostrarALerta = (msg) =>{
  if (Platform.OS === 'web'){
    alert(msg)
  }else{
    Alert.alert('Error', msg, [{text:'Entendido'}])
  }

  
}

  return (
    <View style={styles.app}>
        <View style={styles.contenido}>
          <Clima resultados={datos}/>
          <Formulario 
          busqueda={busqueda} 
          guardarBusqueda={guardarBusqueda} 
          guardarCosulta={guardarCosulta}
          mostrarALerta={mostrarALerta}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app:{
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center'
  },

  contenido: {
    marginHorizontal: '2.5%'
  }

});

export default App