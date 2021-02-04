import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import Home from './Home';

describe('Home', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  const fetchMockData = {
    id: "0eb7acfd6fa3449676947c9521311cfce618bf9129ac5ac07ba30c76843e0f65fddb",
    provider: {
      title: "Monzo",
      account_number: "12345678",
      sort_code: "12-34-56",
      description: "Current Account"
    },
    balance: {
      amount: 1250.32,
      currency_iso: "GBP"
    },
    transactions: [
      {
        id: "13acb877dc4d8030c5dacbde33d3496a2ae3asdc000db4c793bda9c3228baca1a28",
        date: "2018-06-30",
        description: "Tesco",
        category_title: "Groceries",
        amount: {
          value: -57.21,
          currency_iso: "GBP"
        }
      },
      {
        id: "dbad80ded0d2d3419749a8dd391a61bc1b5970bdfffc27f254568ec86e5c0fa06bcc",
        date: "2018-06-22",
        description: "Max Mustermann",
        category_title: "Income",
        amount: {
          value: 510.55,
          currency_iso: "GBP"
        }
      }
    ]
  };

  it('should display transactions', async () => {
    fetch.mockResponseOnce(JSON.stringify(fetchMockData));
    
    render(<Home />);

    expect(fetch).toHaveBeenCalledWith("http://www.mocky.io/v2/5c62e7c33000004a00019b05", 
      {
        "headers": {"Content-Type": "application/json"},
        "method": "GET",
        "mode": "cors",
        "redirect": "manual",
        "referrerPolicy": "no-referrer"
      }
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'));

    expect(screen.getByText(/Transaction History/i)).toBeInTheDocument();
  });

  it('should show Error on api error', async () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    
    render(<Home />);

    expect(fetch).toHaveBeenCalledWith("http://www.mocky.io/v2/5c62e7c33000004a00019b05", 
      {
        "headers": {"Content-Type": "application/json"},
        "method": "GET",
        "mode": "cors",
        "redirect": "manual",
        "referrerPolicy": "no-referrer"
      }
    );

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'));

    expect(screen.getByText(/Something went wrong. Please try again or try again later/i)).toBeInTheDocument();
  });
});