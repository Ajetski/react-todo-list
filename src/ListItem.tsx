import { FC, useState } from 'react';
import { useDrag } from 'react-use-gesture';

export type ListItemType = {
	text: string;
	completed: boolean;
};

type ListItemProps = {
	item: ListItemType,
	onClickItem: VoidFunction,
	onClickDelete: VoidFunction
}

const ListItem: FC<ListItemProps> = ({ item, onClickItem, onClickDelete }) => {
	const [showDelete, setShowDelete] = useState(false);
	const bind = useDrag(({offset: [x], dragging}) => {
		if (!dragging) {
			setShowDelete(x < 0);
		}
	});
	return (
		<li {...bind()}>
			<span
				onClick={onClickItem}
				className={item.completed ? "completed" : "incomplete"}
			>
				{item.text}
			</span>
			{showDelete &&
				<button
					className="delete"
					onClick={onClickDelete}>
					Delete
				</button>
			}
		</li>
	)
};

export default ListItem;
