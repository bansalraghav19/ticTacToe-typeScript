import React from "react";
import { boardOptions } from "../../utilities/staticData";
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
  const changeHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBoardSize(parseInt(event.target.value));
  };
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGameStated(true);
  };
  return (
    <form className="ic-form mb-30" onSubmit={submitHandler}>
      <div className="ic-form-row">
        <div className="icSelect">
          <select value={boardSize} onChange={changeHandle}>
            {boardOptions.map((option) => (
              <option
                value={option.size}
                key={option.id}
              >{`${option.size}x${option.size}`}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit">Build Board</button>
    </form>
  );
};

export default InputComponent;
