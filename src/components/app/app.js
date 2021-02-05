import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

export default class App extends React.Component {
	
	constructor() {
		super();
		this.hideRandomChar = this.hideRandomChar.bind(this);
		this.state = {
			hidden: false
		};
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
				return <RandomChar/>;
			}
		};

		return (
			<>
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{ size: 5, offset: 0 }}>
							<Content/>
							<Button color="primary" className="d-flex justify-content-center my-5" onClick={this.hideRandomChar}>Toggle random character</Button>
						</Col>
					</Row>
					<Row>
						<Col md='6'>
							<ItemList />
						</Col>
						<Col md='6'>
							<CharDetails />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
