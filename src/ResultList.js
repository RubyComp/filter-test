import React, {Component} from 'react'
import ResultItem from './ResultItem';

export default class ResultList extends Component {

	render() {
		const { error, isLoaded, items, filters_dump } = this.props.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Обновление данных...</div>;
		} else {

			let items_keys = Object.keys(items);
			if (items_keys.length > 0 && filters_dump) {
				return (
					<ul id="result-list">
						{items.map((item) => (
							<ResultItem item={item} key={item.id} filters_dump={filters_dump}/>
						))}
					</ul>
				)
			} else {
				return (
					<div className="mega-note">К сожалению по вашему запросу ничего не найдено. <br/>Попробуйте другие фильтры.</div>
				)
			}

		}

	}

}