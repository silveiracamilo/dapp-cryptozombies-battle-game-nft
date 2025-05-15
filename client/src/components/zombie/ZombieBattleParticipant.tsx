import { motion } from 'framer-motion';
import { useMemo } from 'react';
import useSound from 'use-sound';
import attackSound from '/sounds/zombie-attack-6419.mp3';
import deathSound from '/sounds/dragon-death-102428.mp3';
import * as S from './style';
import { zombieGenesMapper } from 'src/store/mapper/zombie/ZombieMapper';

export function ZombieBattleParticipant({
  dna,
  isLeft = true,
  isAttacking = false,
  isDead = false,
  isWinner = false,
}: {
  dna: string;
  isLeft?: boolean;
  isAttacking?: boolean;
  isDead?: boolean;
  isWinner?: boolean;
}) {
  const genes = useMemo(() => zombieGenesMapper(dna), [dna]);

  const [playAttack] = useSound(attackSound);
  const [playDeath] = useSound(deathSound);

  const direction = isLeft ? 1 : -1;
  const attackOffset = direction * 20;
  const deathRotate = direction * 90;

  // Aciona sons quando a luta acontece
  // if (isAttacking && !isDead) playAttack();
  // if (isDead) playDeath();

  return (
    <motion.div
      initial={{ scale: isLeft ? 1 : -1 }}
      animate={{ scale: isDead ? 0.6 : 1 }}
      style={{
        position: 'relative',
        width: 120,
        height: 160,
        transform: isLeft ? 'none' : 'scaleX(-1)', // Inverte o zumbi se não for o lado esquerdo
      }}
    >
      {/* Animação geral do zumbi */}
      <motion.div
        animate={{
          x: isAttacking ? attackOffset : 0,
          rotate: isDead ? deathRotate : 0,
          opacity: isDead ? 0.5 : 1,
        }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', bottom: 0 }}
      >
        <S.ZombieContainer>
          {/* Cabeça e Corpo */}
          <motion.div
            animate={{
              y: isDead ? 80 : 0,
              rotate: isDead ? 45 : 0,
              opacity: isDead ? 0 : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            <S.Head data-img={genes.head} data-color={genes.skinColor} />
          </motion.div>

          <S.Torso data-color={genes.clothesColor} />

          {/* Braços */}
          <motion.div
            animate={{
              rotate: isAttacking ? -30 : 0,
              originX: 0.5,
              originY: 0.5,
            }}
            transition={{ duration: 0.3 }}
          >
            <S.RightUpperArm data-color={genes.skinColor} />
          </motion.div>

          <S.LeftUpperArm data-color={genes.skinColor} />

          <S.LeftFeet data-color={genes.clothesColor} />
          <S.RightFeet data-color={genes.clothesColor} />

          <S.LeftLeg data-color={genes.clothesColor} />
          <S.RightLeg data-color={genes.clothesColor} />

          <S.LeftThigh data-color={genes.clothesColor} />
          <S.RightThigh data-color={genes.clothesColor} />
        </S.ZombieContainer>
      </motion.div>

      {/* Texto de vencedor */}
      {isWinner && !isDead && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'absolute',
            top: -20,
            width: '100%',
            textAlign: 'center',
            color: '#0f0',
            fontWeight: 'bold',
          }}
        >
          VENCEDOR!
        </motion.div>
      )}

      {/* Splash de sangue */}
      {isDead && (
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
      )}
    </motion.div>
  );
}
