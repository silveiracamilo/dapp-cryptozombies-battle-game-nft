import React, { useMemo } from 'react'
import * as S from './style'
import { zombieGenesMapper } from 'src/store/mapper/zombie/ZombieMapper'

interface IZombie {
  dna: string
}

export const Zombie: React.FC<IZombie> = ({ dna }) => {
  const genes = useMemo(() => zombieGenesMapper(dna), [dna]);

  return (
    <S.ExternalContainer>
      <S.DnaStyled>DNA: {dna}</S.DnaStyled>
      <S.ZombieContainer>
        {!genes.catMode && (
          <>
            <S.LeftFeet data-color={genes.clothesColor} />
            <S.RightFeet data-color={genes.clothesColor} />

            <S.LeftLeg data-color={genes.clothesColor} />
            <S.RightLeg data-color={genes.clothesColor} />

            <S.LeftThigh data-color={genes.clothesColor} />
            <S.RightThigh data-color={genes.clothesColor} />
          </>
        )}

        <S.RightUpperArm data-color={genes.skinColor} />
        <S.Torso data-color={genes.clothesColor} />

        {genes.catMode && <S.CatLegs data-color={genes.clothesColor} />}

        <S.Shirt data-img={genes.shirt} data-color={genes.clothesColor} />
        <S.LeftUpperArm data-color={genes.skinColor} />

        <S.LeftForearm data-color={genes.skinColor} />
        <S.RightForearm data-color={genes.skinColor} />

        <S.LeftHand data-color={genes.skinColor} />
        <S.RightHand data-color={genes.skinColor} />

        <S.Head data-img={genes.head} data-color={genes.skinColor} />
        <S.Eyes data-img={genes.eye} data-color={genes.eyeColor} />
        <S.Mouth />
      </S.ZombieContainer>
    </S.ExternalContainer>
  )
}