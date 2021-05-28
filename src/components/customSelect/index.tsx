import React, { useState, useCallback } from "react";
import "./style.css";

interface Props {
  dataList: {
    id: number;
    size: number;
  }[];
  onChange: (id: number) => void;
}

const CustomSelect: React.FC<Props> = ({ dataList, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(3);

  const selectedElementRef = useCallback((node: HTMLLIElement | null) => {
    if (node) {
      node.scrollIntoView({ block: "nearest" });
    }
  }, []);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  const handleOptionChange = (id: number) => {
    setSelectedId(id);
    setIsOpen(false);
    onChange(id);
  };

  const handleKeyChange = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const curIndex = dataList.findIndex((data) => data.id === selectedId);
    switch (event.code) {
      case "Space":
        toggleOpen();
        break;
      case "Enter":
        toggleOpen();
        break;
      case "ArrowDown":
        const nextElement = dataList[curIndex + 1];
        if (nextElement) {
          setSelectedId(nextElement.id);
          onChange(nextElement.id);
        }
        break;
      case "ArrowUp":
        const prevElement = dataList[curIndex - 1];
        if (prevElement) {
          setSelectedId(prevElement.id);
          onChange(prevElement.id);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div
      tabIndex={0}
      className={`select-container${isOpen ? " show" : ""}`}
      onBlur={() => setIsOpen(false)}
      onKeyDown={handleKeyChange}
    >
      <span
        onClick={toggleOpen}
        className="select-label"
      >{`${selectedId} x ${selectedId}`}</span>
      <ul className="select-options-container">
        {dataList.map(({ id, size }) => (
          <li
            key={id}
            ref={id === selectedId ? selectedElementRef : null}
            onClick={() => handleOptionChange(id)}
            className={`select-option${id === selectedId ? " selected" : ""}`}
          >{`${size} x ${size}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
