import { FC, useState, useRef, useEffect } from "react";
import produce from "immer";

import List from "./List";

type ListItem = {
  text: string;
  completed: boolean;
};

const App: FC = () => {
  const [ordered, setOrdered] = useState(false);
  const [list, setList] = useState<ListItem[]>([]);
  const [input, setInput] = useState("");
  const addInputRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    try {
      if (localStorage.getItem("items")) {
        setList(JSON.parse("items"));
      } else {
        localStorage.setItem("items", JSON.stringify([]));
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("items", JSON.stringify(list));
    } catch (err) {}
  }, [list]);

  const addItem = () => {
    if (input.trim().length === 0) return;
    setList(
      produce(list, (newList) => {
        newList.push({ text: input, completed: false });
      })
    );
    setInput("");
    if (addInputRef.current) {
      addInputRef.current.value = "";
      addInputRef.current.focus();
    }
  };

  return (
    <>
      <button onClick={() => setOrdered(!ordered)}>Change List Type</button>
      <div>
        <input
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") addButtonRef.current?.click();
          }}
          ref={addInputRef}
          type="text"
          id="add-item-text"
        />
        <button onClick={addItem} ref={addButtonRef} id="add-item-btn">
          Add to List
        </button>
      </div>
      <div>
        {list.length > 0 ? (
          <List ordered={ordered}>
            {list.map((el, idx) => (
              <li key={`${el.text}-${idx}`}>
                <span
                  onClick={() => {
                    setList(
                      produce(list, (newList) => {
                        newList[idx].completed = !newList[idx].completed;
                      })
                    );
                  }}
                  className={el.completed ? "completed" : "incomplete"}
                >
                  {el.text}
                </span>
                <button
                  className="delete"
                  onClick={() => setList(list.filter((elem) => elem !== el))}
                >
                  ✖
                </button>
              </li>
            ))}
          </List>
        ) : (
          <p>Your list is empty... Add some stuff!</p>
        )}
      </div>
    </>
  );
};

export default App;
