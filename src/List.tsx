import { FC } from 'react';

const List: FC<{ ordered: boolean }> = ({ ordered, children }) => (
	<>
		{ordered ?
			<ol>{children}</ol> :
			<ul>{children}</ul>
		}
	</>
);

export default List;
