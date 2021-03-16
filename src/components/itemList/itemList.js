/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import PropTypes from 'prop-types';


class ItemList extends Component {

	gotService = new gotService();

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

		const {data} = this.props;

		const items = this.renderItems(data);

		return (
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}

ItemList.defaultProps = {
	onItemSelected: () => {}
};

ItemList.propTypes = {
	onItemSelected: PropTypes.func,
	// getData: PropTypes.arrayOf(PropTypes.object)
};

const f = () => {
	// eslint-disable-next-line react/display-name
	return class extends Component {

		state = {
			data: null
		}
	
		componentDidMount() {
	
			const {getData} = this.props;
	
			getData()
				.then( (data) => {
					this.setState({
						data
					}); 
				});
		}

		render() {

			const {data} = this.state;

			if (!data) {
				return <Spinner/>;
			}
			
			return <ItemList {...this.props} data={data}/>;
		}
	};
};

export default f();
