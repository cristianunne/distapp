import { Troubleshoot, TryOutlined } from "@mui/icons-material";
import React, { useState, useEffect , createContext} from "react";


export const AppContext = createContext();
export const IsDbContext = createContext();

const MyProvider = (props) => {

  
    const [isLogin, setIsLogin] = useState(false);
    const [isDb, setIsDb] = useState(false);
    const [user, setUser] = useState(null);
    const [campaignActive, setCampaignActive] = useState(null);
    const [idcamion, setIdcamion] = useState(null);

    const [clientePedido, setClientePedido] = useState(null);
    const [pedido, setPedido] = useState(null);
    const [isPedido, setIsPedido] = useState(false);


    useState(() => {
        //console.log("esta logueado context " + isLogin);
    }, [isLogin]);


    return(

        <AppContext.Provider value={[isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive, idcamion, setIdcamion, 
        clientePedido, setClientePedido, pedido, setPedido, isPedido, setIsPedido]}>
            <IsDbContext.Provider value={[isDb, setIsDb]}>
                {props.children}
            </IsDbContext.Provider>
            
        </AppContext.Provider>
    );

}

export default MyProvider;
