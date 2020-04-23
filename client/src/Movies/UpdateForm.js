import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
	id: '',
	title: '',
	director: '',
	metascore: '',
	stars: [],
};

const UpdateForm = (props) => {
	const { push } = useHistory();
	const { item, setItem } = useState(initialMovie);
	const { id } = useParams();
	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/update-movie/${id}`)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log(err));
	}, [id]);

	const changeHandler = (e) => {
		e.persist();
		// let value = e.target.value;
		// value = parseInt(value, 5);
	};
	setItem({
		...item,
		// [e.target.name]: value,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// make a PUT request to edit the item
		axios
			.put(`http://localhost:5000/api/movies/update-movie/${id}`, item)
			.then((res) => {
				// res.data
				props.setItems(res.data);
				push(`/update-movie/${id}`);

				// res.data ==> just updated item object
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h2>Update Movie</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					onChange={changeHandler}
					placeholder="Movie Name"
					value={item.name}
				/>

				<div>
					<input
						type="text"
						name="name"
						onChange={changeHandler}
						placeholder="Movie Name"
						value={item.name}
					/>
				</div>
				<div>
					<input
						type="text"
						name="name"
						onChange={changeHandler}
						placeholder="Movie Name"
						value={item.name}
					/>
				</div>
				<div>
					<input
						type="text"
						name="name"
						onChange={changeHandler}
						placeholder="Movie Name"
						value={item.name}
					/>
				</div>
				<button className="md-button">Update</button>
			</form>
		</div>
	);
};

export default UpdateForm;
