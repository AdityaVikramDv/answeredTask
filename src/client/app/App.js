import React from 'react';
import style from './file.css';
import axios from 'axios';
class App extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			movies:[],
			show:'',
			charNames:[]
		}
		this.movieClickHandler =this.movieClickHandler.bind(this)
	}
	componentDidMount(){
		axios.get('https://swapi.co/api/films')
		.then(
				function(response)
				{
					console.log(response.data);

					this.setState(function(prevState){

						return {
							movies:response.data.results
						}
					});
					console.log(this.state.movies);
				}.bind(this)
			);

	}
	fetchCharacters(data){

		var names = [];
		var characters = this.state.movies.filter(function(movie){
			console.log(movie.title, data);
			if(movie.title == data){
				return true;
			}
		});

	characters = characters[0].characters.slice();
		



		characters.map(function(char){
			axios.get(char)
				.then(
				function(response)
				{
					names.push(response.data.name);
					this.setState(function(presvState){
						return {
							charNames : names
						}
					})

				}.bind(this)
			);


		}.bind(this));

			
	}
	movieClickHandler(e){
		console.log("clicked",e.target.textContent);
		this.setState({
			show:e.target.textContent
		});

		this.fetchCharacters(e.target.textContent);

	}

	render(){
			return (
				<div className="container" >
				<div> 
				<h2>Movies List</h2>
				</div>
				<ul>
				{
					this.state.movies.map(function(movie, index){
						return <li key={index} className="movies_list" onClick={this.movieClickHandler} value = {movie.title}>{movie.title}</li>
					}.bind(this))
				}

				</ul>

				<div>
				<h3>Movie details Clicked:</h3>
					<ul>
						{
							this.state.charNames.map(function(name){
								return <li className="list">{name}</li>
							})
						}

					</ul>
					
				</div>
				</div>)
	}
	
}
export default App