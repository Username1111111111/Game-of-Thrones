/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {

	gotService = new gotService();

	state = {
		selectedChar: 130,
		error: false
	}

	componentDidCatch() {
		this.setState({ error: true });
	}

	onCharSelected = (id) => {
		this.setState({
			selectedChar: id
		});
	}

	render() {

		if (this.state.error) {
			return <ErrorMessage />;
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onCharSelected}
				getData={this.gotService.getAllCharacters}
				renderItem={({ name }) => name}/>
		);

		const itemDetails = (
			<ItemDetails 
				itemId={this.state.selectedChar}
				getData={this.gotService.getCharacter}>
				<Field field='gender' label='Gender'/>
				<Field field='born' label='Born'/>
				<Field field='died' label='Died'/>
				<Field field='culture' label='Culture'/>
			</ItemDetails>
		);

		return (
			<RowBlock left={itemList} right={itemDetails}/>
		);
	}
}