import React, {Component} from 'react'
import ResultList from './ResultList';
import FiltersList from './FiltersList';

export default class PageFilter extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
		};
		this.change = this.change.bind(this);
	}

	componentDidMount() {
		fetch('https://rubycomp.site/?action=get_items')
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.answer.items,
						filters: [],
						filters_dump: result.answer.filters_dump,
						unique_values_id: result.answer.unique_values_id
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	change = (e) => {

		let filter_id = e.target.attributes.data_id.value;
		let checked = e.target.checked;
		let filters = this.state.filters;

		let filter = '';

		if (checked && filters.indexOf(filter_id) === -1) { // filters list

			filters.push(filter_id);

		} else if (!checked) {

			let index = filters.indexOf(filter_id);
			if (index > -1) {
				filters.splice(index, 1);
			}

		}

		if (filters.length) {
			filter = '&filters=' + filters.join(',');
		}

		fetch('https://rubycomp.site/?action=get_items' + filter)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.answer.items
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	render() {

		return (
			<div className="container-with-aside">
				<main>
					<h1>Мобильные телефоны</h1>
					<ResultList state={this.state} />
				</main>
				<FiltersList change={this.change} unique={this.state.unique_values_id} />
			</div>
		);

	}

}
