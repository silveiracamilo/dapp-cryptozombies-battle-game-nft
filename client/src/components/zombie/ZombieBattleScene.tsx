import { useEffect, useState } from 'react';
import { ZombieBattleParticipant } from './ZombieBattleParticipant';

const ZOMBIE_1_DNA = '1234567890';
const ZOMBIE_2_DNA = '9876543210';
let WINNER_ID: number; // 1 ou 2
WINNER_ID = 1;

export default function ZombieBattleScene() {
  const [phase, setPhase] = useState<'idle' | 'attack1' | 'attack2' | 'death1' | 'death2' | 'done'>('idle');

  useEffect(() => {
    const sequence = [
      { phase: 'attack1', delay: 1000 },
      { phase: 'attack2', delay: 1000 },
      { phase: WINNER_ID === 1 ? 'death2' : 'death1', delay: 1000 },
      { phase: 'done', delay: 500 },
    ];

    let i = 0;
    const runSequence = () => {
      if (i >= sequence.length) return;
      const { phase, delay } = sequence[i];
      setTimeout(() => {
        setPhase(phase as any);
        i++;
        runSequence();
      }, delay);
    };

    setPhase('idle');
    setTimeout(runSequence, 1000);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: 40, background: '#111' }}>
      <ZombieBattleParticipant
        dna={ZOMBIE_1_DNA}
        isLeft
        isAttacking={phase === 'attack1'}
        isDead={phase === 'death1'}
        isWinner={phase === 'done' && WINNER_ID === 1}
      />

      <ZombieBattleParticipant
        dna={ZOMBIE_2_DNA}
        isLeft={false}
        isAttacking={phase === 'attack2'}
        isDead={phase === 'death2'}
        isWinner={phase === 'done' && WINNER_ID === 2}
      />
    </div>
  );
}
