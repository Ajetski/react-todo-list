import { FC, useState } from 'react';

export type ListItemType = {
	text: string;
	completed: boolean;
};

type ListItemProps = {
	item: ListItemType,
	onClickItem: VoidFunction,
	onClickDelete: VoidFunction
}

const ListItem: FC<ListItemProps> = ({item, onClickItem, onClickDelete}) => {
	const [showDelete, setShowDelete] = useState(false);

	return (
		<li onMouseOver={() => setShowDelete(true)}
			onMouseLeave={() => setShowDelete(false)}>
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
					✖
				</button>
			}
		</li>
	)
};

export default ListItem;