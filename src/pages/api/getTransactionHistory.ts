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
}

export interface Result {
  data: {
    accounts: Account[];
    transfers: Transfer[];
  };
}

const GET_TRANSACTION_HISTORY = gql`
{
  accounts(first: 25) {
    id
    balance
  }
  transfers(first: 100) {
    id
    from {
      id
    }
    to {
      id
    }
    value
  }
}
`;

export default async function getTransactionHistory(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result: Result = await request(process.env.NEXT_PUBLIC_SUBGRAPH_URL ?? '', GET_TRANSACTION_HISTORY);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    res.status(500).json({ error: 'Failed to parse response' });
  }
}