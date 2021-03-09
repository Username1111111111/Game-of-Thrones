import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';

export default class App extends React.Component {

	gotService = new gotService();
	
	constructor() {
		super();
		this.hideRandomChar = this.hideRandomChar.bind(this);
		this.state = {
			hidden: false,
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
			<>
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{ size: 5, offset: 0 }}>
							<Content />
							<Button color="primary" className="d-flex justify-content-center my-5" onClick={this.hideRandomChar}>Toggle random character</Button>
						</Col>
					</Row>
					<CharacterPage />
					<Row>
						<Col md='6'>
							<ItemList 
								onCharSelected={this.onCharSelected} 
								getData={this.gotService.getAllBooks}
								renderItem={ (item) => (<><span>{item.name}</span> <button>Click me</button></>)}/>
						</Col>
						<Col md='6'>
							<CharDetails charId={this.state.selectedChar} />
						</Col>
					</Row>
					<Row>
						<Col md='6'>
							<ItemList 
								onCharSelected={this.onCharSelected} 
								getData={this.gotService.getAllHouses}
								renderItem={ (item) => item.name}/>
						</Col>
						<Col md='6'>
							<CharDetails charId={this.state.selectedChar} />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
