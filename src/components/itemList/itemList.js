/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';


export default class ItemList extends Component {

	gotService = new gotService();

	state = {
		itemList: null
	}

	componentDidMount() {

		const {getData} = this.props;

		getData()
			.then( (itemList) => {
				this.setState({
					itemList
				}); 
			});
	}

	renderItems(arr) {
		
		return arr.map( (item) => {
			
			const {id} = item;
			const label = this.props.renderItem(item);
			
			return (
				<li key={id} 
					className="list-group-item" 
					onClick={ () => this.props.onItemSelected(+id)}>
					{label}
				</li>
			);
		});
	}

	render() {

		const {itemList} = this.state;

		if (!itemList) {
			return <Spinner/>;
		}

		const items = this.renderItems(itemList);

		return (
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}