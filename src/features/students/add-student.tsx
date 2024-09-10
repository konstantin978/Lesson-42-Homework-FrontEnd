import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addStudent } from "./students.slice";
import { PartialUser } from "./types";
import { useNavigate } from "react-router-dom";

export const AddStudent = () => {

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const handleSubmit = () => {
		const user:PartialUser = { name, surname }

		dispatch(addStudent(user))
			.unwrap()
			.then(res => {
				console.log(res);
				setSurname('');
				setName('');
				navigate('/');
			});
	};

	return <>
		<h1>Add Student</h1>
		<input
			type="text"
			placeholder="Name"
			value={name}
			onChange={e => setName(e.target.value)}
		/>
		<input
			type="text"
			placeholder="Surname"
			value={surname}
			onChange={e => setSurname(e.target.value)}
		/>
		<button onClick={handleSubmit}>Add Student</button>
	</>
};