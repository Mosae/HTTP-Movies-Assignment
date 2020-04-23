import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import axios from 'axios';
import UpdateMovieForm from './Movies/UpdateMovieForm';

const App = (props) => {
	const history = useHistory();
	const [savedList, setSavedList] = useState([]);
	const [movieList, setMovieList] = useState([]);

	console.log(movieList);

	const getMovieList = () => {
		axios
			.get('http://localhost:5000/api/movies')
			.then((res) => {
				console.log('getMovieList', res.data);
				setMovieList(res.data);
			})
			.catch((err) => console.log(err.response));
	};

	const updateMovieList = (id, updateMovie) => {
		console.log('updateMovie in Update movielist', updateMovie);

		const splitMovies = {
			...updateMovie,
			stars:
				typeof updateMovie.stars === 'string'
					? updateMovie.stars.split(',')
					: updateMovie.stars,
		}; // uses .split() method to turn updateMovie data back into an array
		axios
			.put(`http://localhost:5000/api/movies/${id}`, splitMovies)
			.then((res) => {
				const movieMatch = movieList.map((movie) => {
					// maps over movieList array and matches movie id's with PUT response data id's
					if (movie.id === res.data.id) {
						return res.data; // returns PUT response data if id's match
					} else {
						return movie; // returns current movie if PUT response id and movie id's DO NOT match
					}
				});
				// console.log(movieMatch);
				setMovieList(movieMatch);
				props.push(`/movies/${id}`);
			})
			.catch((err) => console.log(err));
	};

	const deleteMovie = (id, updateMovie) => {
		console.log('Delete Update', updateMovie);
		// const splitMovies = {
		// 	...updateMovie,
		// 	stars: updateMovie.stars.split(','),
		// };

		axios
			.delete(`http://localhost:5000/api/movies/${id}`)
			.then((res) => {
				console.log('axios delete', res);
				//setMovieList(res.data);
				getMovieList();
				history.push('/');
			})
			.catch((err) => console.log(err));
	};

	const addToSavedList = (movie) => {
		setSavedList([...savedList, movie]);
	};

	useEffect(() => {
		getMovieList();
	}, []);

	return (
		<>
			<SavedList list={savedList} />

			<Route exact path="/">
				<MovieList movies={movieList} />
			</Route>

			<Route path="/movies/:id">
				<Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie} />
			</Route>
			<Route
				path="/update-movie/:id"
				render={(props) => (
					<UpdateMovieForm
						{...props}
						movies={movieList}
						updateMovieList={updateMovieList}
					/>
				)}
			/>
		</>
	);
};

export default App;
