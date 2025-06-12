import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LotteryHistoryTable, LotteryRound } from '../LotteryHistoryTable';

describe('LotteryHistoryTable', () => {
  const mockRounds: LotteryRound[] = [
    {
      roundNumber: 1,
      timestamp: new Date('2023-01-01'),
      potSize: 1000,
      winner: '0x123456789',
      participants: ['0x111', '0x222', '0x333']
    },
    {
      roundNumber: 2,
      timestamp: new Date('2023-02-01'),
      potSize: 2000,
      winner: '0x987654321',
      participants: ['0x444', '0x555']
    }
  ];

  it('renders the table with correct number of rows', () => {
    render(<LotteryHistoryTable rounds={mockRounds} />);
    
    const table = screen.getByTestId('lottery-history-table');
    const tableRows = screen.getAllByTestId(/round-\d+/);
    
    expect(table).toBeTruthy();
    expect(tableRows.length).toBe(2);
  });

  it('displays empty state when no rounds', () => {
    render(<LotteryHistoryTable rounds={[]} />);
    
    const emptyState = screen.getByTestId('empty-history');
    expect(emptyState.textContent).toBe('No lottery history available');
  });

  it('renders correct round details', () => {
    render(<LotteryHistoryTable rounds={mockRounds} />);
    
    const firstRoundRow = screen.getByTestId('round-1');
    expect(firstRoundRow.textContent).toContain('1');
    expect(firstRoundRow.textContent).toContain('1/1/2023');
    expect(firstRoundRow.textContent).toContain('$1,000');
    expect(firstRoundRow.textContent).toContain('0x123456789');
    expect(firstRoundRow.textContent).toContain('3');
  });
});