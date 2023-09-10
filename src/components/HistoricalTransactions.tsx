import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { formatUnits } from 'viem';
import { Account, Transfer } from '../pages/api/getTransactionHistory';

interface ApiResponse {
  accounts: Account[];
  transfers: Transfer[];
}

const formatDateSuffix = (day: number) => {
  let suffix = 'th';

  if (day % 10 === 1 && day !== 11) {
    suffix = 'st';
  } else if (day % 10 === 2 && day !== 12) {
    suffix = 'nd';
  } else if (day % 10 === 3 && day !== 13) {
    suffix = 'rd';
  }

  return `${day}${suffix}`;
};

export const HistoricalTransactions = ({ shouldRefresh }: { shouldRefresh: boolean }) => {
  const { address } = useAccount();
  const [data, setData] = useState<{accounts: Account[], transfers: Transfer[]}>({accounts: [], transfers: []});
  const [displayCount, setDisplayCount] = useState(5);

  useEffect(() => {
    if (address) {
      fetch('/api/getTransactionHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAddress: address.toLowerCase() }),
      })
        .then((response) => response.json() as Promise<ApiResponse>)
        .then((data) => {
          // Sort the transfers by timestamp latest to oldest
          data.transfers.sort((a, b) => b.timestamp - a.timestamp);
          setData(data)
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [address, shouldRefresh]);

  const handleNext = () => {
    setDisplayCount(displayCount + 5);
  };

  const handlePrev = () => {
    if (displayCount > 5) {
      setDisplayCount(displayCount - 5);
    }
  };
  return (
    <>
      {data.transfers.length > 0 ? data.transfers.slice(displayCount - 5, displayCount).map((transfer, index) => {
        // Convert the timestamp to a Date object
        const date = new Date(transfer.timestamp * 1000);

        // Format the Date object to a human-readable string
        const formattedDate = `${formatDateSuffix(date.getDate())} ${date.toLocaleString('default', { month: 'long' })} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;        
        return (
          <div key={index} className="w-[20rem] bg-black rounded h-8 p-3 my-1 flex items-center justify-center">
            <div 
              className="text-white text-lg font-light break-words text-center"
            >
              {`${formatUnits(BigInt(transfer.value), 18)} LOTUS on ${formattedDate}`}
            </div>
          </div>
        );
      }) : (
        <p className='text-black text-md font-inter'>Your transactions will show up here.</p>
      )}
      {data.transfers.length > 5 && (
        <div className="w-full flex justify-center mt-2">
          <button 
            onClick={handlePrev} 
            className="bg-transparent text-blue-500" 
            disabled={displayCount <= 5}
          >
            &lt;
          </button>
          <button 
            onClick={handleNext} 
            className="bg-transparent text-blue-500" 
            disabled={data.transfers.length <= displayCount}
          >
            &gt;
          </button>
        </div>
      )}
    </>
  )
}