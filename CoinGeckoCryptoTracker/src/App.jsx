import { useState } from "react"
import Banner from "./Component/Banner/Banner"
import CoinTable from "./Component/CoinTable/CoinTable"
import Navbar from "./Component/Navbar/Navbar"
// import { CurrencyContext } from "./Component/comtext/CurrencyContext"
import Home from "./Component/pages/Home"
import Routing from "./Component/Routing/Routing"


function App(){
  const [currency,setCurrency]=useState('usd')
 return(
  <>
  {/* <CurrencyContext.Provider value={{currency,setCurrency}}> */}
   <Routing/>
  {/* </CurrencyContext.Provider> */}
  </>
)
}
export default App