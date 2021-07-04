// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useRouteMatch, useHistory } from 'react-router-dom';
// import MovieCard from './MovieCard';

// function Movie({ addToSavedList }) {
// 	const [movie, setMovie] = useState(null);
// 	const params = useParams();
// 	const match = useRouteMatch();
// 	const history = useHistory();

// 	const fetchMovie = (id) => {
// 		axios
// 			.get(`http://localhost:5000/api/movies/${id}`)
// 			.then((res) => setMovie(res.data))
// 			.catch((err) => console.log(err.response));
// 	};

// 	const saveMovie = () => {
// 		addToSavedList(movie);
// 	};

// 	useEffect(() => {
// 		fetchMovie(params.id);
// 	}, [params.id]);

// 	if (!movie) {
// 		return <div>Loading movie information...</div>;
// 	}

// 	return (
// 		<div className="save-wrapper">
// 			<MovieCard movie={movie} />

// 			<div className="save-button" onClick={saveMovie}>
// 				Save
// 			</div>
// 		</div>
// 	);
// }

// export default Movie;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, deleteMovie }) {
	const [movie, setMovie] = useState(null);
	const match = useRouteMatch();
	const history = useHistory();

	const fetchMovie = (id) => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => setMovie(res.data))
			.catch((err) => console.log(err.response));
	};

	const saveMovie = () => {
		addToSavedList(movie);
	};

	useEffect(() => {
		fetchMovie(match.params.id);
	}, [match.params.id]);

	if (!movie) {
		return <div>Loading movie information...</div>;
	}
	const routeToUpdate = (e) => {
		e.preventDefault();
		history.push(`/update-movie/${movie.id}`);
	};
	const deleteHandler = (e) => {
		e.preventDefault();
		deleteMovie(movie.id);
	};

	return (
		<div className="save-wrapper">
			<MovieCard movie={movie} />

			<div className="save-button" onClick={saveMovie}>
				Save
			</div>

			<button type="submit" onClick={routeToUpdate}>
				Update
			</button>
			<button type="submit" onClick={deleteHandler}>
				Delete
			</button>
		</div>
	);
}

export default Movie;
