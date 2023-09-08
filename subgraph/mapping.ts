// import { Transfer as ERC20Transfer } from "./generated/ERC20/ERC20"
// import { Transfer, Account } from "./generated/schema"

// export function handleTransfer(event: ERC20Transfer): void {
//   let transfer = new Transfer(event.transaction.hash.toHex())
//   let fromAccount = Account.load(event.params.from.toHex())
//   let toAccount = Account.load(event.params.to.toHex())

//   if (fromAccount == null) {
//     fromAccount = new Account(event.params.from.toHex())
//     fromAccount.balance = event.params.amount
//   } else {
//     fromAccount.balance = fromAccount.balance.minus(event.params.amount)
//   }

//   if (toAccount == null) {
//     toAccount = new Account(event.params.to.toHex())
//     toAccount.balance = event.params.amount
//   } else {
//     toAccount.balance = toAccount.balance.plus(event.params.amount)
//   }

//   transfer.from = fromAccount.id
//   transfer.to = toAccount.id
//   transfer.value = event.params.amount

//   fromAccount.save()1
//   toAccount.save()
//   transfer.save()
// }