import React, { useState } from 'react';
import axios from 'axios';

const initialMovie = {
	id: 0,
	title: '',
	director: '',
	metascore: 89,
	stars: [],
};
const MovieForm = (props) => {
	const [movie, setMovie] = useState(initialMovie);

	const changeHandler = (e) => {
		e.persist();
		let value = e.target.value;
	};
	setMovie({
		...movie,
		[e.target.name]: value,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<h2>Update</h2>
		</div>
	);
};
