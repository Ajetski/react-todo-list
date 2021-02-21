import { FC, useState } from 'react';
import produce from 'immer';

import List from './List';

type ListItem = {
	text: string,
	completed: boolean
};

const App: FC = () => {
	const [ordered, setOrdered] = useState(false);
	const [list, setList] = useState<ListItem[]>([]);
	const [input, setInput] = useState('');
	return (
		<>
			<button onClick={() => setOrdered(!ordered)}>
				Change List Type
			</button>
			<div>
				<input onChange={(e) => setInput(e.target.value)} type="text" id="add-item-text" />
				<button onClick={() => {
					setList([...list, { text: input, completed: false }]);
					setInput('');
					const inputBox = document.getElementById('add-item-text') as HTMLInputElement;
					inputBox.value = '';
					inputBox.focus();
				}} id="add-item-btn">
					Add to List
				</button>
			</div>
			<div>
				{list.length > 0 ?
					<List ordered={ordered}>
						{list.map((el, idx) => (
							<li key={`${el.text}-${idx}`}>
								<span onClick={() => {
									setList(produce(list, newList => {
										newList[idx].completed = !newList[idx].completed;
									}));
								}} className={el.completed ? 'completed' : 'incomplete'}>
									{el.text}
								</span>
								<button className="delete"
									onClick={() => setList(list.filter(elem => elem !== el))}>
									✖
								</button>
							</li>
						))}
					</List>
					: <p>Your list is empty... Add some stuff!</p>}
			</div>
		</>
	);
};

export default App;
