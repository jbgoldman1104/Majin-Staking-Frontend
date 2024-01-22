import PrimaryButton from "../components/buttons/PrimaryButton";
import { useEffect, useRef, useState } from "react";
import { Reveal } from 'react-awesome-reveal';
import { fadeInUp } from "../utils/constants";


export default function Stake({ className }) {
  const [depositeAmount, setDepositeAmount] = useState("");
  

  const formatNumber = (v) => {
    return v < 10 ? "0" + v : v;
  }

  const formatBlanace = (v, digits = 4) => {
    return Math.floor(v * (10 ** digits) + 1e-2) / (10 ** digits);
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
                <div className="w-4/6 flex flex-col">
                  <div className="w-full rounded-[20px] border-2 border-highlight flex items-center justify-end px-[20px] py-[18px] mt-[40px]">
                    <input
                        className="text-[24px] font-[500] bg-transparent outline-none flex-auto text-right pr-[10px] text-primary"
                        size="10"
                        placeholder="0"
                        value={depositeAmount}
                        onChange={(e) => setDepositeAmount(e.target.value)}
                      ></input>
                    <span className="text-primary font-[500] text-[24px]">MAJIN</span>
                  </div>

                  <PrimaryButton
                    className="font-[700] text-[24px] mt-[24px]"
                    label="STAKE & EARN MAJIN"
                    onClick={() => {
                      
                    }}
                  />

                  <div className="flex flex-row justify-between items-center w-full mt-[32px]">
                    <span className="text-primary font-[400] text-[16px]">YOUR REWARDS</span>
                    <span className="text-primary font-[400] text-[16px]">150000 MAJIN</span>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full mt-[32px]">
                    <PrimaryButton
                      className="w-[45%] text-[16px] py-[8px]"
                      label="UNSTAKE"
                      onClick={() => {
                        
                      }}
                    />
                    <PrimaryButton
                      className="w-[45%] text-[16px] py-[8px]"
                      label="CLAIM REWARDS"
                      onClick={() => {
                        
                      }}
                    />
                  </div>

                  
                </div>
              </div>


              <div className="rounded-[20px] border-2 border-highlight flex flex-col items-center justify-center px-[45px] py-[70px] mt-[60px]">
                <span className="text-highlight font-[700] text-[32px]">OVERALL METRICS</span>
                <div className="w-4/6 flex flex-col">
                  
                  <div className="flex flex-row justify-between items-center w-full mt-[32px]">
                    <span className="text-primary font-[400] text-[24px]">DAILY RETURN</span>
                    <span className="text-primary font-[400] text-[24px]">5%</span>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full mt-[32px]">
                    <span className="text-primary font-[400] text-[24px]">APR</span>
                    <span className="text-primary font-[400] text-[24px]">2225%</span>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full mt-[32px]">
                    <span className="text-primary font-[400] text-[24px]">PROTOCOL FEE</span>
                    <span className="text-primary font-[400] text-[24px]">1%</span>
                  </div>
                  
                </div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>

    </div>
  );
}
