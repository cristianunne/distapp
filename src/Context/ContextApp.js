import { Troubleshoot, TryOutlined } from "@mui/icons-material";
import React, { useState, useEffect , createContext} from "react";


export const AppContext = createContext();
export const IsDbContext = createContext();

const MyProvider = (props) => {

  
    const [isLogin, setIsLogin] = useState(false);
    const [isDb, setIsDb] = useState(false);
    const [user, setUser] = useState(null);


    useState(() => {
        //console.log("esta logueado context " + isLogin);
    }, [isLogin]);


    return(

        <AppContext.Provider value={[isLogin, setIsLogin, user, setUser]}>
            <IsDbContext.Provider value={[isDb, setIsDb]}>
                {props.children}
            </IsDbContext.Provider>
            
        </AppContext.Provider>
    );

}

export default MyProvider;
