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
	const { updateMovie, setUpdateMovie } = useState(initialMovie);
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
		setUpdateMovie({ ...updateMovie, [e.target.name]: e.target.value });

		// let value = e.target.value;
		// if (ev.target.name === 'movie') {
		// 	value = parseInt(value, 10);
		// }
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// make a PUT request to edit the updateMovie
		axios
			.put('/update-movie/:id', updateMovie)
			.then((res) => {
				console.log(res);
				// res.data
				props.setItems(res.data);
				push(`/update-movie/${id}`);

				// res.data ==> just updated updateMovie object
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
					value={updateMovie.name}
				/>

				<div>
					<input
						type="text"
						name="director"
						onChange={changeHandler}
						placeholder="Director's Name"
						value={updateMovie.director}
					/>
				</div>
				<div>
					<input
						type="number"
						name="metascore"
						onChange={changeHandler}
						placeholder="Metascore"
						value={updateMovie.metascore}
					/>
				</div>
				<div>
					<input
						type="array"
						name="stars"
						onChange={changeHandler}
						placeholder="Stars"
						value={updateMovie.stars}
					/>
				</div>
				<button className="md-button">Update Movie</button>
			</form>
		</div>
	);
};

export default UpdateForm;
