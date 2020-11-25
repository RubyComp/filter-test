import React, {Component} from 'react'

function FilterRow({filter, change}) {

	return (

		<fieldset className="filters-row">
			<legend>{filter.name}</legend>
			<ul>
				{filter.values.map( value => {
					return (
						<li key={value.id}>
							<label className="filter-label">
								<input type="checkbox" data_id={value.id} onChange={ (e) => change(e)} />
								<span>{value.name}</span>
							</label>
						</li>
					)
				} )}
			</ul>
		</fieldset>

	)

}

export default class FiltersList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			filters: []
		};
	}

	componentDidMount() {
		fetch('https://rubycomp.site/?action=get_filters')
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						filters: result.filters
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

		const { error, isLoaded, filters } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>...</div>;
		} else {
			return (
				<aside>
					<h2>Фильтры</h2>
					<fieldset className="filters-row">
						<div id="filters-list">
							{filters.map(filter => (
								<FilterRow filter={filter} key={filter.id} change={this.props.change} />
							))}
						</div>
					</fieldset>
				</aside>
			);

		}

	}
}
