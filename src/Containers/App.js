import React, {Component} from 'react';
import SearchBox from '../Components/SearchBox';
import CardList from '../Components/CardList';
//import { robots } from './robots';
import './App.css';
import Scroll from'../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';


class App extends Component {
constructor() {
	super()
	this.state = {
		robots: [],
		searchfield: ''
	}
}

componentDidMount(){
	fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users =>  this.setState({ robots: users}));
}

onSearchChange = (event) => {
	this.setState({searchfield: event.target.value})
		 
}
 
	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})
		if(!robots.length){
	return <h1>LOADING</h1>
} else {
	return (
		
		<div className = 'tc'>
		<h1 className = 'f1'>ROBOFRIENDS</h1>
		<SearchBox searchChange={this.onSearchChange} />
		<Scroll>
		<ErrorBoundry>
		<CardList robots={filteredRobots} />
		</ErrorBoundry>
		</Scroll>
		</div>
	);
}
}
}


export default App;