
import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';

import AppNavigator from "./src/AppNavigator";
import { StrictMode } from 'react';
import MyProvider from "./src/Context/ContextApp";
import { initDatabase } from "./src/databases/databaseServices";



const App = () => {

  //inicializo la base aqui
  const [dbExists, setDbExists] = useState(false)

  const initDB = async () => {
    const res = await initDatabase();
    //si devuelve false es porque no existia y si tru es porquesi

    setDbExists(res);
  }


  useEffect(() => {
    initDB();

   
  }, [])

  return (
    <MyProvider>
      <AppNavigator dbExist={dbExists}/>
    </MyProvider>


  );
}

export default App;



