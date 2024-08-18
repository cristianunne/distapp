import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import CardsDefault from '../../components/CardDefault'
import ItemPedidos from '../../components/pedidos/ItemPedidos';

const PedidosBox = ({pedidos, setIsLoading, setReload, reload}) => {

    const [result, setResult] = useState([]);
    const result_ = [];

    const [dataPedidos, setDataPedidos] = useState([])


    const createItems = (pedidos) => {

        //console.log(pedidos);
        let i = 0;
        for (item of pedidos) {

            result_.push(<ItemPedidos key={i} number={item.number} id_pedido={item.idpedidos}
                fecha={item.created} status={item.status_val} cliente={item.nombre + ' ' + item.apellido + ' (' + 
                item.shop_name + ')'} 
                localidad={item.localidad} 
                setIsLoading={setIsLoading} setReload={setReload} 
                reload={reload} idcliente={item.clientes_idclientes}/>);

                i++;
            
        }

        /*for (let i = 0; i < pedidos.length; i++)
        {
             let pedido = pedidos[i];
             //console.log(compras_stock.rows.item(i));
            console.log('pedidoss');
             console.log(pedido);

          
            result_.push(<ItemPedidos key={i} number={pedido.number} id_pedido={pedido.idpedidos}
                    fecha={pedido.created} status={pedido.status_val} cliente={pedido.nombre + ' ' + pedido.apellido + ' (' + pedido.shop_name + ')'} 
                    localidad={pedido.localidad} 
                    setIsLoading={setIsLoading} setReload={setReload} 
                    reload={reload} idcliente={pedido.clientes_idclientes}/>);
        

        }

        setResult(result_);*/
        setResult(result_);

    }


    useEffect(() => {

        //console.log(pedidos);
        createItems(pedidos);
    }, [pedidos])

    return (
       <>

        <CardsDefault title={'Pedidos'} size={0.8}>
            {result}
        </CardsDefault>

       </>
    )
}

export default PedidosBox