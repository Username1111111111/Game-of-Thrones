import React, {useState, useEffect} from 'react';

function Appp() {
	const [count, setCount] = useState(0);
	const [data, refreshData] = useState([{name: 'Ivan', sex: 'male'}]);

	useEffect( () => {
		console.log(data);
	});

	// useEffect( () => {
	// 	updateChar();
	// 	let timerId = setInterval(updateChar, 15000);
	// 	return () => {
	// 		clearInterval(timerId);
	// 	};
	// });

	return (
		<div>
			<p>{count}</p>
			<button 
				onClick={ () => setCount(count+1)}>
					Click
			</button>
			{data.map(item => {
				return (
					// eslint-disable-next-line react/jsx-key
					<div>Name: {item.name}, sex: {item.sex}</div>
				);
			})}
			<button onClick={() => refreshData(data => ([...data, {name: 'Qasda', sex: 'male'}]))}>Add data</button>
		</div>
	);
}

export default Appp;