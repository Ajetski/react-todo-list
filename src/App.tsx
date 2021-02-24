import { FC, useState, useRef, useEffect } from "react";
import produce from "immer";

import List from "./List";
import ListItem, { ListItemType } from "./ListItem";

const App: FC = () => {

	const getInitalValue = <T extends unknown>(key: string, fallback: T) => {
		let value = fallback;
		try {
			if (localStorage.getItem(key)) {
				value = JSON.parse(localStorage.getItem(key) as string)
			} else {
				localStorage.setItem(key, JSON.stringify(value));
			}
		} catch (err) {
			console.log(err);
		}
		return value;
	};

	const [ordered, setOrdered] = useState(getInitalValue<boolean>('ordered', false));
	const [list, setList] = useState<ListItemType[]>(getInitalValue<ListItemType[]>('items', []));
	const [input, setInput] = useState("");
	const addInputRef = useRef<HTMLInputElement>(null);
	const addButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		try {
			localStorage.setItem("items", JSON.stringify(list));
		} catch (err) {
			console.log(err);
		}
	}, [list]);

	useEffect(() => {
		try {
			localStorage.setItem("ordered", JSON.stringify(ordered));
		} catch (err) {
			console.log(err);
		}
	}, [ordered]);

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
			<button onClick={() => setList(list.filter((el) => !el.completed))}>
				Delete Completed Items
			</button>
			<div>
				<input
					onChange={(e) => setInput(e.target.value)}
					onKeyUp={(e) => {
						if (e.key === "Enter") addItem();
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
							<ListItem key={`${el.text}-${idx}`} item={el} onClickItem={() => {
								setList(
									produce(list, (newList) => {
										newList[idx].completed = !newList[idx].completed;
									})
								);
							}} onClickDelete={() => setList(list.filter((item) => el !== item))} />
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
