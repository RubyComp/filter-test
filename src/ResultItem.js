import React from 'react'

export default function ResultItem({item, filters_dump}) {

	let img_path = './img/';

	return (

		<li className="result-item">
			<div className="result-item-image-container">
				<img src={img_path + item.image} alt={item.name} className="result-item-image" />
			</div>
			<div className="result-item-content">
				<h3 className="result-item-title">{item.name}</h3>
				<div className="result-item-data">

					<ul className="items-filters">
						{item.filters.map( filter => {

							let filter_name = filters_dump['filters_parents'].find(x => x.id === filter.parent_id).name;
							let filter_value = filters_dump['filters_values'].find(x => x.id === filter.value_id).name;

							return <li key={filter.key}><small className="filter-title">{filter_name}</small> {filter_value}</li>

						})}

					</ul>
				</div>
			</div>

		</li>

	)
}