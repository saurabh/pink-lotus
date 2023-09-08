import type { NextPage } from "next";
// import { ConnectButton } from "@rainbow-me/rainbowkit"
import Tooltip from "../components/tooltip";
import { CustomConnect } from '../components/CustomConnectButton';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const Home: NextPage = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  
  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <div className="flex justify-end p-4">
        {isConnected && <CustomConnect />}
      </div>
      <div className="flex flex-col items-start flex-1 p-4 ml-60 mt-20">
        <div className="text-black text-6xl font-inter">
          Welcome to the Pink Lotus DAO
        </div>
        <div className="w-[20rem] mt-10 flex flex-col items-start">
          <p className="text-2xl font-inter mb-4">Amount of LOTUS to buy</p>
          <span className="relative w-11/12">
            <input 
              style={{ appearance: 'none', MozAppearance: 'textfield' }} 
              className="border rounded border-black p-3 mb-4 w-full h-8 text-lg" 
              type="number" 
              placeholder="0.0" 
            />
            <img 
              style={{ top: 'calc(50% - 7px)', transform: 'translateY(-50%)' }}
              className="absolute right-[-10px] w-10 h-9" 
              src="/pinkLotus.png" 
              alt="Pink Lotus" 
            />
          </span>
          {
            !isConnected ? (
              <CustomConnect />
            ) : (
              <button className="bg-pink border-2 border-deeppink text-black rounded-md w-full p-4 text-xl">
                Buy
              </button>
            )
          }
          <div className="flex items-center">
            <p className="text-xl font-inter mr-2">Cost: 1.12 ETH</p>
            <Tooltip message="The price of 1 token is based on the keccak256 of the total supply modulus 0.1 ether" />
          </div>
        </div>
      </div>
      <div className="p-4">
        {/* Footer or other content */}
      </div>
    </div>
  );
};

export default Home;
