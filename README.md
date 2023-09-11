# Development Notes:

This dapp is a nextjs typescript application built with rainbowkit, wagmi hooks, subgraphs for querying LOTUS erc20 token transactions, tailwindcss and gsap and framer-motion for animations.

Wagmi hooks were used to interact with the contract and follow the transaction lifecycle. Some error cases were covered (insufficient funds to purchase LOTUS, user rejected tx).

The Past purchases component is only rendered when the user address is connected. Pagination instead of a load more button.



# Pink lotus DAO

Pink lotus DAO is a DAO for the pink lotus community. Your task is to create a single page dapp that allows users to mint new pink lotus tokens. The dapp should display the current price of the pink lotus token (which is `1 LOTUS = keccak256(totalSupply) % 0.1 ether`) and also show historical purchases.

Links:

* [Figma mockup](https://www.figma.com/file/SddvN6CsVTRHvcEM4RNYaX/Pink-lotus?type=design&node-id=0%3A1&mode=design&t=RKLeqi7gI53NMf8H-1)
* [Sepolia etherscan smart contract](https://sepolia.etherscan.io/address/0xabdd6278e964453c8c675fb0dad201001902cf33#code)

There is also an ABI file attached for interacting with the contract called `pink-lotus-dao.abi.json`.

Try to make the app as performant as possible. If you feel the UI could be improved with micro-animations or other UI/UX improvements, feel free to add them. Performance and any improvements to the UX will make a difference when we evaluate your application.

When complete, please push the application to a private repo, invite @swaptick, deploy it to vercel, and then email s@baton.finance with your solution. If you have any questions or need sepolia ETH please email s@baton.finance.

![preview.png](preview.png)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.