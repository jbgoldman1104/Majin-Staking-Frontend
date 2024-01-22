import "./App.css";

import NavbarWithCTAButton from "./components/Navbar";
import { useRoutes } from "react-router-dom";
import Routes from "./Routes";

import { Spinner } from "@material-tailwind/react";

import { EventBus, minAddress } from "./utils/methods";
import { BTN_HEIGHT_IN_MAIN_AREA, BTN_WIDTH_IN_MAIN_AREA, SET_LOADING } from "./utils/constants";
import { useEffect, useState } from "react";
import PrimaryButton from "./components/buttons/PrimaryButton";
import Stake from "./pages/Stake";

function App() {
  const pages = useRoutes(Routes);
  const [isLoading, setIsLoading] = useState(false);
  const showWalletMenu = false;
  const [roundId, setRoundId] = useState(1);

  const setLoading = (data) => {
    setIsLoading(data);
  };

  useEffect(() => {
    EventBus.on(SET_LOADING, (data) => {
      setLoading(data);
    });

    return () => {
      EventBus.remove(SET_LOADING);
    };
  }, []);

  const onUpdateRound = (roundId) => {
    setRoundId(roundId);
  }

  return (

    <div
      className="App flex flex-col bg-[#f6f6f8] min-h-[100vh] overflow-x-hidden text-eloblack items-center"
    >
      <div className="flex w-[100vw] lg:w-[1000px] justify-between h-max px-6 md:px-10 py-5 md:py-8 items-start ">
        <div className="w-full relative">
          <header className="flex flex-row justify-between items-center w-full">
            <div className="flex">
              <img src="/logo.png" className="w-[88px] h-[100px]" alt=""/>
              <span className=" text-xl md:text-2xl font-black text-left">MAJIN<br/>STAKING</span>
            </div>
            <NavbarWithCTAButton className="flex" />
          </header>
          
          {
            showWalletMenu &&
            <div className="absolute top-50 left-0 w-full flex flex-col gap-6 rounded-3xl  items-center"
            >
              
            </div>
          }
          {
            showWalletMenu !== true &&
            <div className="w-full mt-5">
              <Stake onUpdateRound={onUpdateRound}/>
            </div>
          }
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          zIndex: 999,
          top: 0,
          left: 0,
          display: `${isLoading ? "flex" : "none"}`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner color="blue" className="h-10 w-10" />
      </div>
    </div>
  );
}

export default App;
