import { FC } from "react";

export interface MultiplierProps {
  number: number;
  selected: boolean;
  level:number;
}

interface MultiplierCompProps {
  multiplier: MultiplierProps;
  setMultipliers: Function;
  multipliers: MultiplierProps[];
}

const MultiplierComp: FC<MultiplierCompProps> = ({
  multiplier,
  setMultipliers,
  multipliers,
}) => {
  function handleSelectMultiplier(ev: any) {
    try {
      const multiplierIndex = multipliers.findIndex(
        (mlt) => mlt.number === multiplier.number
      );
      if (multiplierIndex === -1) throw new Error("Couldnt find multiplier");

      const mltTemp = [...multipliers];
      mltTemp[multiplierIndex].selected = !mltTemp[multiplierIndex].selected;
      setMultipliers(mltTemp);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={multiplier.selected?"multiplier multiplier--selected":"multiplier"} onClick={handleSelectMultiplier}>
      {multiplier.number}
    </div>
  );
};

export default MultiplierComp;
