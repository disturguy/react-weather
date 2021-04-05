import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Row, Col } from 'react-bootstrap';

// var temperature_data = {
// 	labels: [
// 		'1',
// 		'2',
// 		'3',
// 		'4'
// 	],
// 	datasets: [{
// 		label: 'Temperature',
// 		data: [1,4,6,2],
// 		backgroundColor: [
// 			'#FF6384',
// 			'#36A2EB',
// 			'#FFCE45',
// 			'#FFCE80',
// 		],
// 		borderWidth: 1,
// 		hoverBackgroundColor: [
// 			'#FF6384',
// 			'#36A2EB',
// 			'#FFCE56'
// 		]
// 	}]
// };

// var description_data = {
// 	labels: [
// 		'Clear',
// 		'Cloudy',
// 		'Rainy'
// 	],
// 	datasets: [{
// 		data: [1,4,6],
// 		backgroundColor: [
// 			'#FF6384',
// 			'#36A2EB',
// 			'#FFCE56'
// 		],
// 		hoverBackgroundColor: [
// 			'#FF6384',
// 			'#36A2EB',
// 			'#FFCE56'
// 		]
// 	}]
// };

const Charts = ({ data }) => {

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		}
	}

	var counts = {};
	for (var i = 0; i < data.data2.length; i++) {
    counts[data.data2[i]] = 1 + (counts[data.data2[i]] || 0);
	}

	//console.log(data)
	

	return (
		<div>
		{data.data3[0] === "" ? null : (
			<>
			<Row align="center" style={{ height: "100px" }}>
			<Col>
				<h2>Metrics for 7 days</h2>
			</Col>
		</Row>
		<Row align="center" style={{ height: "800px" }}>
			<Col>
				<Bar data={{
					labels: [
						data.data3[0],
						data.data3[1],
						data.data3[2],
						data.data3[3],
						data.data3[4],
						data.data3[5],
						data.data3[6],
						data.data3[7]
					],
					datasets: [{
						type: 'bar',
						label: 'Temperature Bar',
						data: data.data1,
						backgroundColor: [
							'#FF6384',
							'#36A2EB',
							'#FFCE45',
							'#FFCE80',
							'#FF6384',
							'#36A2EB',
							'#FFCE45',
							'#FFCE80'
						],
						borderWidth: 1,
						hoverBackgroundColor: [
							'#FF6384',
							'#36A2EB',
							'#FFCE56',
							'#FF6384',
							'#36A2EB',
							'#FFCE56',
							'#FF6384',
							'#36A2EB'
						]
					},     
					{
						type: 'line',
						label: 'Temperature Line',
						borderColor: '#000000',
						borderWidth: 2,
						fill: false,
						data: data.data1,
					  }]
				}} options={options} />
			</Col>
		</Row>
		<hr />
		<Row align="center" style={{ height: "800px" }}>
			<Col>
				<Doughnut data={{
					labels: [
						'Clear',
						'Cloudy',
						'Rainy'
						
					],
					datasets: [{
						data: [counts.Clear, counts.Clouds, counts.Rain],
						backgroundColor: [
							'#FF6384',
							'#36A2EB',
							'#FFCE56'
						],
						hoverBackgroundColor: [
							'#FF6384',
							'#36A2EB',
							'#FFCE56'
						]
					}]
				}} />
			</Col>
		</Row>
			</>
		)}
		</div>
	);
};

export default Charts