import { useEffect, useState } from "react";
import { FetchCoinData } from "../../Services/FetchCoinData";
import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";
// import { CurrencyContext } from "../comtext/CurrencyContext";
import CurrencyStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import PageLoader from "../PageLoarder/PageLoader";
function CoinTable(){
//   const {currency}= useContext(CurrencyContext)
const {currency}=CurrencyStore();
 const [page,setPage]=useState(1);
 const navigate=useNavigate();
 const { data, isLoading, isError, error } = useQuery({
  queryKey: ['coins', page,currency],
  queryFn: () => FetchCoinData(page, currency),
  retry: false,
  retryDelay: 1000 * 30,
  cacheTime: 1000 * 60 * 2,
  staleTime: 1000 * 30,
});

 function handleCoinRedirect(id){
   navigate(`/details/${id}`);
 }
 if(isLoading){
   return <PageLoader/>
 }
 
 if(isError){
    return <div>Error:{error.message}</div>;
 }
    return(
        <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
         <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold item-center 
         justify-center ">
            <div className="basis-[35%]">
               Coin

            </div>
            <div className="basis-[25%]">
               Price

            </div>
            <div className="basis-[20%]">
               24h change

            </div>
            <div className="basis-[20%]">
               Market Cap
            </div>


         </div>
         <div className="flex flex-col w-[80vw] mx-auto">
           
            {data?.map((coin)=>{
              return (
               <div onClick={()=>handleCoinRedirect(coin.id)} key={coin.id} className="w-full bg-transparent text-white flex py-4 px-2 
               font-semibold  items-center justify-between cursor-pointer">
                  <div className="flex item-center justify-start gap-3 basis-[30%]">
                     <div className="w-[ 3rem] h-[ 3rem] ">
                        <img src={coin.image} className="w-full h-full" />

                     </div>
                     <div className="flex flex-col">
                        <div className="text-3xl text-black "> {coin.name}</div>
                        <div className="text-xl text-black"> {coin.symbol}</div>
                     </div>

                  </div>
                  <div className="basis-[25%] text-black">
                       {coin.current_price}
                  </div>
                  <div className="basis-[20%] text-black">
                     {coin.price_change_24h}

                  </div>
                  <div className="basis-[20%] text-black">
                     {coin.market_cap}

                  </div>
               </div>
              );
            })}

            

         </div>
        

        </div>
    )

}
export default CoinTable