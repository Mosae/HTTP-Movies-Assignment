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
	console.log('These are props received', props);
	const { push } = useHistory();
	const [updateMovie, setUpdateMovie] = useState(initialMovie);
	console.log('update movie', updateMovie);
	const { id } = useParams();

	useEffect(() => {
		const editingMovie = props.movies.find((film) => {
			return film.id === Number(props.match.params.id);
		});
		if (editingMovie) {
			setUpdateMovie(editingMovie);
		}
	}, [props.movies, props.match.params]);

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
			.put(`http://localhost:5000/api/movies/${id}`, updateMovie)
			.then((res) => {
				console.log('45', res);
				// res.data
				props.updateMovieList(id, res.data);
				push(`/movies/${id}`);

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
					name="title"
					onChange={changeHandler}
					placeholder="Movie Name"
					value={updateMovie.title}
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
						type="text"
						name="stars"
						onChange={changeHandler}
						placeholder="Stars"
						value={updateMovie.stars}
					/>
				</div>
				<button className="lg-button">Update Movie</button>
			</form>
		</div>
	);
};

export default UpdateForm;
