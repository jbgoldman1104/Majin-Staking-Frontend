import PrimaryButton from "../components/buttons/PrimaryButton";
import { useEffect, useRef, useState } from "react";
import { Reveal } from 'react-awesome-reveal';
import { BTN_HEIGHT_IN_MAIN_AREA, BTN_WIDTH_IN_MAIN_AREA, fadeInRight, fadeInUp } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Status from "../components/Status";
import Loading from "../components/Loading";


export default function Presale({ className, onUpdateRound }) {
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
          className="overflow-hidden w-full md:w-[520px] flex flex-col justify-between "
        >
          <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
            <div className="flex flex-col gap-3"> 
              <div className="flex">
                <span className="text-2xl font-bold text-left">Count down</span>
              </div>
              { roundId <= 2 &&
              <div className="bg-white rounded-xl border-none flex flex-col gap-3 items-center justify-center px-4 py-5">
                <div className="flex gap-3 items-center justify-center">
                  <div className="border-[1px] rounded-xl border-eloline w-[60px] py-2 flex flex-col">
                    <span className="text-2xl font-black">{getTimeUnit('d')}</span>
                    <span className="text-xs text-elogray">Days</span>
                  </div>
                  <div className="border-[1px] rounded-xl border-eloline w-[60px] py-2 flex flex-col">
                    <span className="text-2xl font-black">{getTimeUnit('h')}</span>
                    <span className="text-xs text-elogray">Hours</span>
                  </div>
                  <div className="border-[1px] rounded-xl border-eloline w-[60px] py-2 flex flex-col">
                    <span className="text-2xl font-black">{getTimeUnit('m')}</span>
                    <span className="text-xs text-elogray">Mins</span>
                  </div>
                  <div className="border-[1px] rounded-xl border-eloline w-[60px] py-2 flex flex-col">
                    <span className="text-2xl font-black">{getTimeUnit('s')}</span>
                    <span className="text-xs text-elogray">Secs</span>
                  </div>
                </div>
              </div>
              }

              { roundId < 3 && 
                <div className="bg-white rounded-xl border-none flex flex-col gap-4 py-5 px-4">
                  <div className="flex justify-between items-center w-full px-2">
                    <span className="text-lg font-bold text-elogray">Ethereum raised</span>
                    {/* <span className="text-lg font-bold text-elogray">You deposited</span> */}
                  </div>
                  <div className="flex justify-between items-center w-full px-2">
                    <span className="text-xl font-bold text-eloblack">{formatBlanace(roundInfo.totalRaisedEth)} ETH / {formatBlanace(roundInfo.totalEth)} ETH</span>
                    {/* <span className="text-xl font-bold text-elogreen">&nbsp;{formatBlanace(deposited)} ETH</span> */}
                  </div>
                  
                  <div class="flex flex-start bg-[#f4f7f9] overflow-hidden font-sans rounded-full text-xs font-medium h-4 mx-2">
                    <div class="flex justify-center items-center h-full overflow-hidden break-all rounded-full bg-elogreen text-white" 
                      style={{width: Math.round(roundInfo.totalRaisedEth * 100 / roundInfo.totalEth) + "%"}}/>
                  </div>
                  <hr className="bg-elogray mx-2 mt-2 mb-1"/>
                  <div className="flex justify-between items-center w-full px-2">
                    <span className="text-lg font-bold text-elogray">Round {roundId}</span>
                    <span className="text-lg font-bold text-elogray">Price</span>
                  </div>
                  <div className="flex justify-between items-center w-full px-2">
                    <span className="text-xl font-bold text-eloblack"> 333 ELO</span>
                    <span className="text-xl font-bold text-elogreen">&nbsp;${formatBlanace(2200 * roundInfo.eloPerEth, 6)}</span>
                  </div>
                  { !claimInfo.deposited && 
                    <div className="rounded-xl border-none flex flex-col gap-5 p-5 bg-[#e6f4ee]">
                      <div className="rounded-xl border-[0.5px] border-eloline flex flex-row p-2 items-center gap-2">
                        <img src="/logo-eth.png" className="w-[30px] h-[30px]" alt=""/>
                        <input
                            className="text-base font-normal bg-transparent outline-none flex-auto"
                            size="10"
                            placeholder="Enter amount"
                            value={depositeAmount}
                            onChange={(e) => setDepositeAmount(e.target.value)}
                          ></input>
                        <PrimaryButton
                          className={"bg-[#bfe4d3] text-sm py-1 text-elogreen font-bold"}
                          label={"MAX"}
                          onClick={() => {
                            
                          }}
                        />
                      </div>
                      {/* <span className="text-sm text-red-300">Amount should be between 0.1ETH and 0.3ETH</span> */}
                      <div className="rounded-xl border-[0.5px] border-eloline flex flex-row p-2 items-center gap-2">
                        <img src="/logo-elo.png" className="w-[30px] h-[30px]" alt=""/>
                        <div className={`text-base font-normal bg-transparent outline-none flex-auto text-left ${!buyAmount && "text-gray-600"}`} >
                          {buyAmount ? buyAmount : "Receive"}
                        </div>
                        {/* <input
                            className="text-base font-normal bg-transparent outline-none flex-auto"
                            size="10"
                            placeholder="Receive"
                            value={buyAmount}
                            onChange={(e) => setBuyAmount(e.target.value)}
                          ></input> */}
                      </div>
                      <PrimaryButton
                          label={
                          <>
                            Purchase
                            {purchaseRunning && <Loading className={"w-4 h-4 ml-2"}/>}
                          </>}
                          onClick={() => {  
                          }}
                        />

                    </div>
                  }
                </div>
              }

              {
                (claimInfo.deposited > 0 || roundId > 2) &&
                <div className="bg-white rounded-xl border-none flex flex-col gap-4 py-5 px-4">
                  { (claimInfo.deposited > 0 || !claimInfo.claim) ? 
                  <>
                    <div className="flex justify-between items-center w-full px-2">
                      <span className="text-sm md:text-lg font-bold text-elogray">You deposited</span>
                      <span className="text-lg font-bold text-eloblack">{formatBlanace(claimInfo.deposited)} ETH</span>
                    </div>
                    <div className="flex justify-between items-center w-full px-2">
                      <span className="text-sm md:text-lg font-bold text-elogray">You will receive</span>
                      <span className="text-lg font-bold text-elogreen">{commafy(formatBlanace(claimInfo.claim))} ELO</span>
                    </div>
                  </>
                  :
                  <div className="flex justify-between items-center w-full px-2">
                      <span className="text-sm md:text-lg font-bold text-elogray">You received</span>
                      <span className="text-lg font-bold text-elogreen">{commafy(formatBlanace(claimInfo.claim))} ELO</span>
                    </div>
                  }
                  { (claimInfo.enable && claimInfo.deposited) ? 
                    <PrimaryButton
                      label={
                        <>
                          Claim
                          {claimRunning && <Loading className={"w-4 h-4 ml-2"}/>}
                        </>}
                      onClick={() => { 
                        if ( claimRunning ) {
                          return;
                        }
                        setClaimRunning(true); 
                      }}
                    />
                    :
                    <></>
                  }
                  
                  { (!claimInfo.enable && claimInfo.deposited) ?
                    <span className="text-sm md:text-lg font-bold text-blue-500">Waiting for a moment. You can claim soon.</span>
                    :
                    <></>
                  }
                </div>
                
              }

              { roundId === 1 && 
              <>
                <span className="text-2xl font-bold text-left">Whitelist Checker</span>

                <div className="bg-white rounded-xl border-none flex flex-col gap-4 py-5 px-6">
                  <span className="text-xl font-bold text-eloblack text-left ">Search by your address</span>
                  
                  <input
                    className="text-base font-normal bg-transparent outline-none flex-auto"
                    size="10"
                    placeholder="0x0000000000000000000000000000000000000000"
                    value={checkingWallet}
                    onChange={(e) => setCheckingWallet(e.target.value)}
                  ></input>
                  <PrimaryButton
                      label={
                        <>
                          Search
                          {searchRunning && <Loading className={"w-4 h-4 ml-2"}/>}
                        </>}
                      onClick={() => { setSearchRunning(true);}}
                    />
                </div>
              </>
              }

            </div>
          </Reveal>
        </div>

      </div>

    </div>
  );
}
