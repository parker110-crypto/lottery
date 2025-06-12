import React from 'react';

// Define the shape of a lottery round
export interface LotteryRound {
  roundNumber: number;
  timestamp: Date;
  potSize: number;
  winner: string;
  participants: string[];
}

interface LotteryHistoryTableProps {
  rounds: LotteryRound[];
}

export const LotteryHistoryTable: React.FC<LotteryHistoryTableProps> = ({ rounds }) => {
  // Handle empty state
  if (rounds.length === 0) {
    return <div data-testid="empty-history">No lottery history available</div>;
  }

  return (
    <table data-testid="lottery-history-table">
      <thead>
        <tr>
          <th>Round</th>
          <th>Date</th>
          <th>Pot Size</th>
          <th>Winner</th>
          <th>Participants</th>
        </tr>
      </thead>
      <tbody>
        {rounds.map((round) => (
          <tr key={round.roundNumber} data-testid={`round-${round.roundNumber}`}>
            <td>{round.roundNumber}</td>
            <td>{round.timestamp.toLocaleDateString()}</td>
            <td>${round.potSize.toLocaleString()}</td>
            <td>{round.winner}</td>
            <td>{round.participants.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LotteryHistoryTable;