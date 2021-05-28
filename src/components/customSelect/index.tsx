import React, { useState, useCallback, useEffect, useRef } from "react";
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
  const listConatinerRef = useRef<HTMLUListElement | null>(null);
  const activeOptionRef = useRef<HTMLLIElement | null>(null);

  const selectedElementRef = useCallback((node: HTMLLIElement | null) => {
    if (node) {
      activeOptionRef.current = node;
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

  useEffect(() => {
    const svgElement = document.querySelector(".svg-container") as HTMLElement;
    svgElement.style.setProperty("--w", `${svgElement.clientWidth}px`);
    svgElement.style.setProperty("--h", `${svgElement.clientHeight}px`);
  }, []);

  useEffect(() => {
    if (isOpen && activeOptionRef.current) {
      listConatinerRef.current?.scrollTo(0, activeOptionRef.current.offsetTop);
    }
  }, [isOpen]);

  return (
    <div
      tabIndex={0}
      className={`select-container${isOpen ? " show" : ""}`}
      onBlur={() => setIsOpen(false)}
      onKeyDown={handleKeyChange}
    >
      <span onClick={toggleOpen} className="select-label">
        {`${selectedId} x ${selectedId}`}
        <svg className="svg-container">
          <rect x="0" y="0"></rect>
        </svg>
      </span>
      <ul ref={listConatinerRef} className="select-options-container">
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
