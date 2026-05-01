import { Props } from "./component/Props";
import { Windows } from "./component/Windows";
import { Welcome } from "./component/Welcome";
import { Header } from "./component/Header";  

import { Count } from "./component/Count";

import { Counter } from "./component/Counter";

import { Parent } from "./component/Parent";

import { ClickButton } from "./component/ClickButton";

import { ClassClickButton } from "./component/ClassClickButton";
import { Counts } from "./component/Counts";
import { SyntheticEvent } from "./component/SyntheticEvent";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Condition } from "./component/Condition";
import { SwitchCondition } from "./component/SwitchCondition";
// import { LogicalCondition } from "./component/LogicalCondition";
import { Fruits } from "./component/Fruits";
// import { Form2 } from "./component/Form2";
import { Forms } from "./component/Forms";
import { Fetchdata } from "./component/Fetchdata";
// import { Ref } from "./component/Ref";
// import { userefConcept2 } from "./component/Refconcept";
import { UserefConcept2 } from "./component/UserefConcept2";

import { CartContext } from "./component/CartContext";
import { Cart } from "./component/Cart";
import { Count2 } from "./component/Count2";
import { BuyNow } from "./component/BuyNow";
// import { ThemeButton } from "./component/ThemeButton";
// import { ThemeContext } from "./component/ThemeContext";
// import { CounterButton } from "./component/UseReducer";
import { StateTwo} from "./component/StateTwo";
import { UseMemo } from "./component/UseMemo";
import { FilterMemo } from "./component/FilterMemo";
import { MyPortfolio } from "./component/MyPortfolio";
import { ClickButtonThree } from "./component/ClickButtonThree";
import { EventBindindThree } from "./component/EventBindindThree";
import { LoginTwo } from "./component/LoginTwo";
import { FetchDataTwo } from "./component/FetchDataTwo";
// import { UseRefTwo } from "./component/UseRefTwo";
import { ThemeProvider } from "./component/ThemeProvider";
import { ThemeButton } from "./component/ThemeButton";
import BiasDetector from "./component/BiasDetector";
// import BiasDetector from "./component/Ref";


function App() {
  return (
    <div className="App">
      {/* <ThemeContext> */}
      <CartContext>
        {/* <ThemeProvider> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header name="krishxd coachimg"/>} />
         <Route path="/props" element={ <Props name="shashank" />} />
          <Route path="/windows" element={ <Windows />} />
           <Route path="/welcome" element={ <Welcome /> } />
            <Route path="/count" element={ <Count />} />
             <Route path="/counter" element={ <Counter />} />
              <Route path="/parent" element={ <Parent />
} />
               <Route path="/clickbutton" element={ <><Counter />   <ClickButton /> </> } />
                <Route path="/classclickbutton" element={  <ClassClickButton />} />
                 <Route path="/counts" element={ <Counts/>} />
                  <Route path="/syntheticevent" element={ <SyntheticEvent />} />
                  <Route path="/login" element={ <Condition />} />
                  <Route path="/switch" element={ <SwitchCondition status="success"/>} />
                  <Route path="/cart" element={ <Cart/>} />
                  <Route path="/form" element={ <Forms/>} />
                  {/* <Route path="/forms" element={ <Form2/>} /> */}
                  <Route path="/fruit" element={ <Fruits/>} />
                  <Route path="/fetch" element={ <Fetchdata/>} />
                  {/* <Route path="/ref" element={ <Ref/>} /> */}
                  <Route path="/refconcept2" element={ <UserefConcept2/>} />
                  <Route path="/countss" element={ <Count2/>} />
                  <Route path="/buy" element={ <BuyNow/>} />
                  {/* <Route path="/reducer" element={ <CounterButton/>} /> */}
                  {/* <Route path="/theme" element={<ThemeButton/>}/>/ */}
                   <Route path="/statest" element={<StateTwo/>}/>
                   <Route path="/usememo" element={<UseMemo/>}/>
                   <Route path="/filter" element={<FilterMemo/>}/>
                   <Route path="/portfolio" element={<MyPortfolio/>}/>
                   <Route path="/button" element={<ClickButtonThree/>}/>
                   <Route path="/buttonthree" element={<EventBindindThree/>}/>
                   <Route path="/loginfalse" element={<LoginTwo/>}/>
                   <Route path="/bias" element={<BiasDetector/>}/>
                   
                  
                   
                   <Route path="/fetchtwo" element={ <FetchDataTwo/>}/>
                   {/* <Route path="/reftwo" element={<UseRefTwo/>}/> */}

                   

                   
                 
                  
     {/* <h1>hello react</h1>
     
     <Props name="shashank" />
     <Windows />
     <Welcome /> 

     <Count />

    <Counter />

    <Parent />

    <ClickButton />

    <ClassClickButton />
    <Counts/>


    <SyntheticEvent /> */}
    </Routes>
    </BrowserRouter>
    {/* </ThemeProvider> */}

    </CartContext>
    {/* </ThemeContext> */}

    </div>
  );
}

export default App;

    