import { api_jup_spot, api_leverage_jup, api_leverage_pump, api_pump_spot, api_search } from "./api"
import { mockTokens } from "./mock";
import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";
const connection = new Connection( import.meta.env.VITE_RPC, 'confirmed');
const getTokens = async (token?:string) =>{
    try{
        return await api_search(token);
    }catch(e)
    {
        console.error(e);
        return mockTokens
    }
}

const spot = async(mint:string,address:string,amount:string) =>
{
    let isVersionlized = false;
    //Try generate Jup Trade
    let tx = await api_jup_spot(mint,address,amount);
    if(tx&&tx?.tx)
    {
        //It's jup transaction
        tx = tx.tx;
        isVersionlized = true
    }else{
        //Try pump txn
        tx = await api_pump_spot(mint,address,amount);
        if(tx?.tx)
        {
            tx=tx.tx
        }else{
            return false;
        }
    }
    let txn ;
    if(isVersionlized)
    {
        txn = VersionedTransaction.deserialize(
            Buffer.from(tx,"base64")
        )
    }else{
        txn = Transaction.from(
            Buffer.from(tx,"base64")
        )
    }
    return txn;
}


const leverage = async(mint:string,address:string,amount:string) =>
{
    let isVersionlized = false;
    //Try generate Jup Trade
    let tx = await api_leverage_jup(mint,address,amount);
    if(tx&&tx?.tx)
    {
        //It's jup transaction
        tx = tx.tx;
        isVersionlized = true
    }else{
        //Try pump txn
        tx = await api_leverage_pump(mint,address,amount);
        if(tx?.tx)
        {
            tx=tx.tx
        }else{
            return false;
        }
    }
    let txn ;
    if(isVersionlized)
    {
        txn = VersionedTransaction.deserialize(
            Buffer.from(tx,"base64")
        )
    }else{
        txn = Transaction.from(
            Buffer.from(tx,"base64")
        )
    }
    return txn;
}

export {
    getTokens,
    spot,
    leverage,
    connection
}