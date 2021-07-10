import React, { useState } from 'react';
import UpVote from '../../../icons/UpVote';

const Vote = ({ voteNo = 0 }) => {
  const [action, setAction] = useState('');

  let localVoteNo = voteNo;
  switch (action) {
    case 'upvote':
      localVoteNo += 1;
      break;
    case 'down_vote':
      localVoteNo -= 1;
      break;
  }

  return (
    <div className="flex items-center h-8 b-1 border border-color1 rounded-2xl w-max mr-3">
      <div
        className="p-2"
        onClick={() => setAction((prev) => (prev === 'upvote' ? '' : 'upvote'))}
      >
        <UpVote
          className={`color2 h-4 w-4 cursor-pointer ${
            action === 'upvote' ? 'color3' : ''
          }`}
        />
      </div>
      <span className="text-xs color2">{localVoteNo}</span>
      <div
        className="p-2"
        onClick={() =>
          setAction((prev) => (prev === 'down_vote' ? '' : 'down_vote'))
        }
      >
        <UpVote
          className={`transform rotate-180 color2 h-4 w-4 cursor-pointer ${
            action === 'down_vote' ? 'color3' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default Vote;
