import { NextApiRequest, NextApiResponse } from 'next';
import { gql, request } from 'graphql-request';

export interface Account {
  id: string;
  balance: string;
}

export interface Transfer {
  id: string;
  from: { id: string };
  to: { id: string };
  value: string;
  timestamp: number;
}

export interface Response {
  data: {
    accounts: Account[];
    transfers: Transfer[];
  };
}

interface ReqBody {
  userAddress: string;
}

const accountsAndTransfersQuery = gql`
query ($id: String!) {
  accounts(where: { id: $id }) {
    id
    balance
  }
  transfers(where: { to: $id }) {
    id
    from {
      id
    }
    to {
      id
    }
    value
    timestamp
  }
}
`;

export default async function getTransactionHistory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userAddress }: ReqBody = req.body as ReqBody;
    const result: Response = await request(process.env.NEXT_PUBLIC_SUBGRAPH_URL ?? '', accountsAndTransfersQuery, { id: userAddress });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    res.status(500).json({ error: 'Failed to parse response' });
  }
}