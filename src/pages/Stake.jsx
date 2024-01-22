import PrimaryButton from "../components/buttons/PrimaryButton";
import { useEffect, useRef, useState } from "react";
import { Reveal } from 'react-awesome-reveal';
import { BTN_HEIGHT_IN_MAIN_AREA, BTN_WIDTH_IN_MAIN_AREA, fadeInRight, fadeInUp } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Status from "../components/Status";
import Loading from "../components/Loading";


export default function Stake({ className }) {
  const [depositeAmount, setDepositeAmount] = useState("");
  const [claimInfo, setClaimInfo] = useState({
      deposited: 0,  claim: 0, enable: false
  });
  const [buyAmount, setBuyAmount] = useState("");
  const [roundId, setRoundId] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [purchaseRunning, setPurchaseRunning] = useState(false);
  const [searchRunning, setSearchRunning] = useState(false);
  const [claimRunning, setClaimRunning] = useState(false);

  
  const [roundInfo, setRoundInfo] = useState({
            roundId: 1,
            startTime: 0,
            endTime: 0,
            eloPerEth: 0,
            totalEth: 0,
            maxBuyEth: 0,
            minBuyEth: 0,
            totalRaisedEth: 0,
            totalSoledElo: 0
  })

  const [checkingWallet, setCheckingWallet] = useState("");
  const [estimateGas, setEstimateGas] = useState(0);


  const formatNumber = (v) => {
    return v < 10 ? "0" + v : v;
  }

  const formatBlanace = (v, digits = 4) => {
    return Math.floor(v * (10 ** digits) + 1e-2) / (10 ** digits);
  }

  const getTimeUnit = (unit) => {
    const now = Math.floor(Date.now() / 1000);
    
    if ( roundId > 2 || roundInfo.startTime === 0 ) {
      return "00";
    }

    let value = now < roundInfo.startTime ? roundInfo.startTime - now : roundInfo.endTime - now;

    if ( value < 0 ) {
      return "00";
    }

    if ( unit === 's' ) {
      return formatNumber(value % 60);
    }
    value = Math.floor(value / 60);
    if ( unit === 'm' ) {
      return formatNumber(value % 60);
    }
    value = Math.floor(value / 60);
    if ( unit === 'h' ) {
      return formatNumber(value % 24);
    }
    value = Math.floor(value / 24);
    return formatNumber(value);
  }

  function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  return (
    <div className={`${className} flex flex-col  `}>
      <div className="w-full flex flex-row justify-center">
        <div
          className="overflow-hidden w-full md:w-[850px] flex flex-col justify-between "
        >
          <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
            <div className="flex flex-col"> 
              <div className="rounded-[20px] border-2 border-highlight flex flex-col items-center justify-center px-[45px] py-[70px]">
                <span className="text-highlight font-[700] text-[32px]">MAJIN STAKING</span>
                <div className="flex flex-row justify-between items-center w-full mt-[50px]">
                  <span className="text-primary font-[500] text-[24px]">TOTAL VALUE LOCKED (TVL)</span>
                  <span className="text-primary font-[500] text-[24px]">$ 3,300.0</span>
                </div>
                <div className="flex flex-row justify-between items-center w-full mt-[24px]">
                  <span className="text-primary font-[500] text-[24px]">STAKED</span>
                  <span className="text-primary font-[500] text-[24px]">150000 MAJIN</span>
                </div>
                <div className="flex flex-row justify-between items-center w-full mt-[24px]">
                  <span className="text-primary font-[500] text-[24px]">AVAILABLE</span>
                  <span className="text-primary font-[500] text-[24px]">150000 MAJIN</span>
                </div>
                <div className="w-4/6 rounded-[20px] border-2 border-highlight flex items-center justify-end px-[20px] py-[18px] mt-[32px]">
                  <span className="text-primary font-[500] text-[24px]">MAJIN</span>
                </div>
              </div>

            </div>
          </Reveal>
        </div>

      </div>

    </div>
  );
}
