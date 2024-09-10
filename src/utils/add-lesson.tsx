import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addLesson } from "../features/classbook/classbook.slice";

export const AddLesson = () => {

	const [text, setText] = useState('');
	const dispatch = useAppDispatch();

	const handleSubmit = () => {
		dispatch(addLesson({title: text, ratings: []}))
		.unwrap()
		.then(res => {
			setText('');
		});
	};

	return <div>
		<h2>Add Lesson</h2>

		<input
			type="text"
			placeholder="Title"
			value={text}
			onChange={e => setText(e.target.value)}
			onKeyDown={e => e.key === 'Enter' && handleSubmit()}
		/>
	</div>
};