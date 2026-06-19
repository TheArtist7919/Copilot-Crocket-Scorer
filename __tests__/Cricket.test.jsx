import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CricketScorer from '../Cricket';

describe('Hertfordshire Junior B rule flows', () => {
  test('Wide: adds +2 and consumes a ball', async () => {
    render(<CricketScorer />);

    const wideBtn = screen.getByText('Wide');
    fireEvent.click(wideBtn);

    // Score should be 2
    expect(await screen.findByText('2')).toBeInTheDocument();

    // Overs should have advanced from 0.0 to 0.1
    expect(screen.getByText(/0\.1/)).toBeInTheDocument();

    // Ball history should show the wide label with +2
    expect(screen.getByText(/Wide \+2/)).toBeInTheDocument();
  });

  test('No-ball: adds +2 and consumes a ball', async () => {
    render(<CricketScorer />);

    const noBallBtn = screen.getByText('No-ball');
    fireEvent.click(noBallBtn);

    // Score should be 2
    expect(await screen.findByText('2')).toBeInTheDocument();

    // Overs should have advanced to 0.1
    expect(screen.getByText(/0\.1/)).toBeInTheDocument();

    // Ball history should show the no-ball label with +2
    expect(screen.getByText(/No-ball \+2/)).toBeInTheDocument();
  });

  test('Wicket: increments wickets, subtracts 5 runs, and consumes a ball', async () => {
    render(<CricketScorer />);

    const wicketBtn = screen.getByText('Wicket');
    fireEvent.click(wicketBtn);

    // Wickets should increment to 1
    expect(await screen.findByText(/Wkts: 1/)).toBeInTheDocument();

    // Score should be -5 after the wicket penalty
    expect(screen.getByText(/-5/)).toBeInTheDocument();

    // Overs should have advanced to 0.1
    expect(screen.getByText(/0\.1/)).toBeInTheDocument();

    // Ball history should show the wicket label with -5
    expect(screen.getByText(/Wicket -5/)).toBeInTheDocument();
  });
});
