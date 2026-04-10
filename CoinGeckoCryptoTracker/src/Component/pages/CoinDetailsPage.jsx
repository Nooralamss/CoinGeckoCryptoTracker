import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FetchCoinDetails } from "../../Services/FetchCoinDetails";
import { useEffect } from "react";
import currencyStore from "../../zustand/store";

function CoinDetailsPage(){
 const {coinId}= useParams();
 const {currency}=currencyStore();
 const { isError, isLoading, data:coin } = useQuery({
  queryKey: ["coin", coinId],
  queryFn: () => FetchCoinDetails(coinId),
  cacheTime:1000*60*2,
  staleTime:1000*60*2,
  
});
useEffect(()=>{
  console.log(coin);
},[coin]);
if(isError){
  return <div> Error: Some thing wrong</div>
}
if(isLoading){
  return <div>Loading...</div>
}

return(
  <div className="flex flex-col md:flex-row">
    <div className="md:w-1/3 w-full flex flex-col 
    items-center mt-6 md:mt-0 border-r-2 border-gray-50">
      <img src={coin?.image ?.large} 
      alt={coin ?.name} 
      className="h-52 mb-5"/>
      <h1 className="text-4xl font-bold mb-5">
        {coin ?.name};
      </h1>
      <p className="w-full px-6 py-4 text-justify">
          {coin ?.description ?.en}
      </p>
      <div className="w-full flex flex-col md:flex-row  md: justify-around">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-xl font-bold">
            Rank

          </h2>
           <span className="ml-3 text-xl">
            {coin?.market_cap_rank}
           </span>
        </div>
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-yellow-400">
            Current Price

          </h2>
           <span className="ml-3 text-xl">
            {coin?.market_data.current_price[currency]}
           </span>
        </div>

      </div>
      
    </div>
    <div className="md:2-2/3 w-full p-6">
    Coin Information
      
    </div>
    
  </div>
)
}
export default CoinDetailsPage;