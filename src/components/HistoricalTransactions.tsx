// import { Account, Transfer } from '../pages/api/getTransactionHistory';
  
  // useEffect(() => {
  //   fetch('/api/getTransactionHistory', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     // body: JSON.stringify({
  //     //   address: '0x200D913Ba74f3f7B9D9F13745B3Cd3692BA77E3A',
  //     // }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const userAddress = '0x200D913Ba74f3f7B9D9F13745B3Cd3692BA77E3A';

  //       const filteredAccounts = data.accounts.filter((account: Account) => account.id === userAddress.toLowerCase());
  //       const filteredTransfers = data.transfers.filter((transfer: Transfer) => transfer.to.id === userAddress.toLowerCase());
      
  //       const filteredData = {
  //         accounts: filteredAccounts,
  //         transfers: filteredTransfers
  //       };
      
  //       console.log(filteredData);
  //     })
  //     .catch((error) => console.error('Error:', error));
  // }
  // , []);