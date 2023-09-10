

import type { NextPage } from "next";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { keccak256, formatUnits, parseUnits, AbiCoder } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import { CustomConnect } from "~/components/CustomConnect";
import { HistoricalTransactions } from "~/components/HistoricalTransactions";
import { InsufficientFundsError, PINKAddress, PriceTooltip } from '../constants';
import abi from '../../pink-lotus-dao.abi.json';
import Tooltip from "~/components/tooltip";
import { BuyButton } from "~/components/BuyButton";

interface ErrorCause {
  shortMessage: string;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState<string>('');
  const [purchaseCost, setPurchaseCost] = useState<bigint | undefined>(undefined);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [insufficientFundsError, setInsufficientFundsError] = useState(false);
  const debouncedAmount = useDebounce(amount, 500)
  // console.log('debouncedAmount', debouncedAmount)

  // const { data: tokenData } = useToken({ address: PINKAddress }); // totalSupply = 8.1 vs 10.1 actual ???
  // console.log(tokenData?.totalSupply.formatted)

  const { data: totalSupply } = useContractRead({
    address: PINKAddress,
    abi,
    functionName: 'totalSupply',
  });

  const { error: buyConfigError, config: buyConfig } = usePrepareContractWrite({
    address: PINKAddress,
    abi,
    functionName: 'buy',
    args: [parseUnits(amount ? amount.toString() : "0", 18)],
    value: purchaseCost ?? BigInt(0)
  });
  const { error: buyError, status: buyStatus, data: buyData, write: buy } = useContractWrite(buyConfig);
  const { data: buyTxData, isError: buyTxError, isLoading: buyTxLoading } = useWaitForTransaction({ hash: buyData?.hash })

  useEffect(() => {
    if (buyError) {
      if (buyError.name === 'TransactionExecutionError') {
        toast.error('User rejected the transaction.', { toastId: buyError.name });
      }
    }  
  }, [buyError]);

  useEffect(() => {
    if (buyConfigError) {
      const cause = buyConfigError.cause as ErrorCause;
      if (cause.shortMessage === InsufficientFundsError) {
        toast.error('Insufficient funds for the transaction.', { toastId: buyConfigError.name });
      }
    }
  }, [buyConfigError]);

  useEffect(() => {
    if (buyTxData) {
      setAmount('');
      setPurchaseCost(undefined);
      setShouldRefresh(!shouldRefresh);
    }
  }, [buyTxData]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setAmount('');
      setPurchaseCost(BigInt(0));
    } else {
      setAmount(value);
      const parsedValue = parseFloat(value);
  
      if (typeof totalSupply === 'bigint' && !isNaN(parsedValue)) {
        const amountBigInt: bigint = parseUnits(parsedValue.toString(), 18);
        const abiCoder = AbiCoder.defaultAbiCoder();
        const encodedData = abiCoder.encode(['uint256'], [totalSupply]); // encode the totalSupply
        const hash = keccak256(encodedData); // hash the encoded totalSupply
        const price: bigint = BigInt(hash) % BigInt(10 ** 17); // price = hash % 0.1 ether
        const purchaseCost: bigint = (price * amountBigInt) / BigInt(10 ** 18); // cost = price * amount / 1e18
        setPurchaseCost(purchaseCost); 
      }
    }
  };
  

  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Head>
        <title>Pink Lotus DAO</title>
        <meta name="Take home task for Baton Finance"/>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className="flex justify-end p-4">
        {isConnected ? <CustomConnect /> : null}
      </div>
      <div className="flex flex-col items-start flex-1 p-4 ml-60 responsive-margin mt-20">
        <div className="text-black text-6xl font-inter mb-10 z-20">
          Welcome to the Pink Lotus DAO
        </div>
        <div className="sm:flex sm:flex-col md:flex-row lg:flex-row">
          <div className="flex flex-col items-start w-[20rem] mt-10">
            <p className="text-2xl font-inter mb-4">Amount of LOTUS to buy</p>
            <span className="relative w-11/12">
              <input 
                style={{ appearance: 'none', MozAppearance: 'textfield' }} 
                className="border rounded border-black p-3 mb-4 w-full h-8 text-lg" 
                type="number" 
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.0" 
              />
              <img 
                style={{ top: 'calc(50% - 7px)', transform: 'translateY(-50%)' }}
                className="absolute right-[-10px] w-10 h-9" 
                src="/pinkLotus.png" 
                alt="Pink Lotus" 
              />
            </span>
            {!isConnected ? 
              <CustomConnect /> : 
              <BuyButton 
                buy={buy} 
                buyTxLoading={buyTxLoading} 
                buyTxError={buyTxError} 
                buyTxStatus={buyTxData ? buyTxData?.status : ''} 
                buyStatus={buyStatus} 
              /> 
            }
            <div className="flex items-center">
              <p className="text-xl font-inter mr-2">
                Cost: {purchaseCost ? parseFloat(formatUnits(purchaseCost.toString())).toFixed(8) : '0'} SEP
              </p>
              <Tooltip message={PriceTooltip} />
            </div>
          </div>
          {address && <div className="flex flex-col items-start lg:ml-40 lg:mt-16 md:ml-40 md:mt-16 sm:ml-0 sm:mt-10">
            <div className="text-black text-2xl font-inter mb-3 ">
              Past purchases
            </div>
            <HistoricalTransactions 
              shouldRefresh={shouldRefresh}
            />
          </div>}
        </div>
      </div>
      <div className="hidden lg:absolute lg:block lg:top-[174px] lg:right-0 lg:w-[712px] lg:h-[670px] overflow-hidden">
        <img
          className="absolute object-cover w-full h-full md:w-[475px] md:h-[450px] lg:w-[712px] lg:h-[640px] md:left-1/4 lg:left-1/2"
          alt="Pink Lotus"
          src="/pinkLotus.png"
        />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Home;
