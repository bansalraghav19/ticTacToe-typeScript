import React from "react";
import { boardOptions } from "../../utilities/staticData";
import CustomSelect from "../customSelect/index";
import "./style.css";

interface Props {
  boardSize: number;
  setBoardSize: React.Dispatch<React.SetStateAction<number>>;
  setIsGameStated: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputComponent: React.FC<Props> = ({
  boardSize,
  setBoardSize,
  setIsGameStated,
}) => {
  const changeHandle = (id: number) => {
    setBoardSize(id);
  };
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGameStated(true);
  };
  return (
    <form className="ic-form mb-30" onSubmit={submitHandler}>
      <div className="ic-form-row">
        <CustomSelect onChange={changeHandle} dataList={boardOptions} />
      </div>
      <button type="submit">Build Board</button>
    </form>
  );
};

export default InputComponent;
