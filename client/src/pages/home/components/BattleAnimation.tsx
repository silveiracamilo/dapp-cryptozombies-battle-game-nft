import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Particles from 'react-particles';
import useSound from 'use-sound';
import attackSound from '/sounds/zombie-attack-6419.mp3';
import deathSound from '/sounds/dragon-death-102428.mp3';

export default function BattleAnimation({ winner = 3 }) {
  const [isFinalHit, setIsFinalHit] = useState(false);
  const [isDead, setIsDead] = useState(false);

  const [playAttack] = useSound(attackSound);
  const [playDeath] = useSound(deathSound);
  
  useEffect(() => {
    if (isFinalHit) playAttack();
    if (isDead) playDeath();
  }, [isFinalHit, isDead]);

  useEffect(() => {
    const finalHitTimer = setTimeout(() => setIsFinalHit(true), 4000);
    const deathTimer = setTimeout(() => setIsDead(true), 5000);
    return () => {
      clearTimeout(finalHitTimer);
      clearTimeout(deathTimer);
    };
  }, []);

  const zombie1 = {
    id: 1,
    src: 'https://api.cryptozombiesbattle.com/zombie/image/3159355705162381.png',
    isWinner: winner === 1,
  };

  const zombie3 = {
    id: 3,
    src: 'https://api.cryptozombiesbattle.com/zombie/image/3152355905162381.png',
    isWinner: winner === 3,
  };

  const zombies = [zombie1, zombie3];

  return (
    <>
    <div className="battlefield" style={{ position: 'relative', height: 300, background: '#222', overflow: 'hidden' }}>
      {zombies.map((z, index) => {
        const isLoser = isFinalHit && !z.isWinner;

        return (
          <AnimatePresence key={z.id}>
            {!isDead || z.isWinner ? (
                <>
                <div style={{ position: 'absolute', bottom: 160, left: z.id === 1 ? 40 : 240 }}>
                  <HealthBar hp={z.isWinner ? 100 : (isFinalHit ? 0 : 60)} />
                </div>
                <motion.img
                    src={z.src}
                    alt={`Zombie ${z.id}`}
                    initial={{ x: z.id === 1 ? 0 : 300 }}
                    animate={{
                        x: isFinalHit ? (z.isWinner ? (z.id === 1 ? 180 : 120) : (z.id === 1 ? 100 : 200)) : (z.id === 1 ? 100 : 200),
                        rotate: isLoser ? 90 : 0,
                        opacity: isLoser && isDead ? 0.5 : 1,
                    }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        height: 150,
                    }}
                />
                </>
              
            ) : null}
          </AnimatePresence>
        );
      })}
    </div>
    {isDead && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            top: 20,
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          {`Zumbi ${winner} venceu!`}
        </motion.div>
    )}
    {isFinalHit && (
        <>
    <motion.img
        src="/images/Blood-Splatter-PNG-HD-Quality.png"
        alt="Blood"
        initial={{ scale: 0 }}
        animate={{ scale: 1, opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
        position: 'absolute',
        left: '50%',
        bottom: 100,
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        height: 100,
        }}
    />
    <Particles
    options={{
        particles: {
        number: { value: 20 },
        color: { value: "#ff0000" },
        shape: { type: "circle" },
        size: { value: 4 },
        move: { speed: 5 },
        },
    }}
    style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    }}
    />
    </>
    )}
    </>
  );
}

function HealthBar({ hp = 0 }) {
    return (
      <div style={{ width: 120, height: 10, background: '#555', borderRadius: 5, marginBottom: 5 }}>
        <motion.div
          style={{ height: '100%', background: '#0f0', borderRadius: 5 }}
          animate={{ width: `${hp}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    );
  }

  