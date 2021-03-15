import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BooksPage, HousesPage, BooksItem } from '../pages';
import gotService from '../../services/gotService';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
export default class App extends React.Component {

	gotService = new gotService();

	constructor() {
		super();
		this.hideRandomChar = this.hideRandomChar.bind(this);
		this.state = {
			hidden: true,
			error: false
		};
	}

	componentDidCatch() {
		console.log('error');
		this.setState({ error: true });
	}

	hideRandomChar() {
		this.setState({
			hidden: !this.state.hidden
		});
	}

	render() {
		const Content = () => {
			if (this.state.hidden) {
				return null;
			}
			else {
				return <RandomChar />;
			}
		};

		if (this.state.error) {
			return <ErrorMessage />;
		}

		return (
			<Router>
				<div className="app">
					<Container>
						<Header />
					</Container>
					<Container>
						<Row>
							<Col lg={{ size: 5, offset: 0 }}>
								<Content />
								<Button color="primary" 
									className="d-flex justify-content-center my-5" 
									onClick={this.hideRandomChar}>
									Toggle random character
								</Button>
							</Col>
						</Row>
						<Route path='/' exact component={() => <h1>Welcome to GOT DB</h1>} />
						<Route path='/characters' component={CharacterPage} />
						<Route path='/books' exact component={BooksPage} />
						<Route path='/books/:id' render={({ match }) => {
							const { id } = match.params;
							return <BooksItem bookId={id} />;
						}} />
						<Route path='/houses' component={HousesPage} />
					</Container>
				</div>
			</Router>
		);
	}
}
