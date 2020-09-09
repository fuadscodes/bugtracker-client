import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { StyledCharts, Row, Graph } from './style';

const Charts = () => {
    const [names, setNames] = useState([]);
    const [values, setValues] = useState([]);
    const [typeNames, setTypeNames] = useState([]);
    const [typeValues, setTypeValues] = useState([]);
    const [priorityNames, setPriorityName] = useState([]);
    const [priorityValues, setPriorityValues] = useState([]);
    const [statusNames, setStatusNames] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    async function getData() {
        try{
            const response = await fetch("http://localhost:5000/admin/charts", {
                method: "POST",
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let data = (await response.json());
            let chart_roles = data.chart_roles;
            let chart_types = data.chart_types;
            let chart_priority = data.chart_priority;
            let chart_status = data.chart_status;

            let names_list = [];
            let values_list = [];

            let type_names = [];
            let type_values = [];

            let priority_names = [];
            let priority_values = [];

            let status_names = [];
            let status_values = [];

            chart_roles.map(role => {
                names_list.push(role.role_name);
                values_list.push(role.number);
                return null;
            });

            chart_types.map(type => {
                type_names.push(type.name);
                type_values.push(type.number);
                return null;
            });

            chart_priority.map(priority => {
                priority_names.push(priority.name);
                priority_values.push(priority.number);
                return null;
            });

            chart_status.map(status => {
                status_names.push(status.name);
                status_values.push(status.number);
                return null;
            });

            setNames(names_list);
            setValues(values_list);
            setTypeNames(type_names);
            setTypeValues(type_values);
            setPriorityName(priority_names);
            setPriorityValues(priority_values);
            setStatusNames(status_names);
            setStatusValues(status_values);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getData();
    }, []);

    return (
        <StyledCharts>
            <Row>
                <Graph>
                    <Bar
                        data={{
                            labels: [...names],
                            datasets: [{
                                data: [...values],
                                backgroundColor: [
                                    '#091F2E', '#D82737', '#F16B2E', '#F4A72B'
                                ]
                            }],
                        }}
                        
                        options={{
                            title:{
                                display: true,
                                text: "Users by role",
                                fontSize: 18
                            },
                            legend: {
                                display: false,
                            },
                            scales: {
                                yAxes: [{
                                ticks: {
                                    reverse: false,
                                    stepSize: 1,
                                    min: 0
                                },
                                }]
                            }
                        }}
                    >
                    </Bar>
                </Graph>
                <Graph>
                    <Pie
                        data={{
                            labels: [...typeNames],
                            datasets: [{
                                data: [...typeValues],
                                backgroundColor: [
                                    '#091F2E', '#D82737', '#F16B2E', '#F4A72B'
                                ]
                            }],
                        }}
                        
                        options={{
                            title:{
                                display: true,
                                text: "Tickets by type",
                                fontSize: 18
                            },
                            legend: {
                                display: true,
                                position: "bottom"
                            },
                        }}
                    >
                    </Pie>
                </Graph>
            </Row>
            <Row>
                <Graph>
                    <Bar
                        data={{
                            labels: [...priorityNames],
                            datasets: [{
                                data: [...priorityValues],
                                backgroundColor: [
                                    '#D82737', '#F16B2E', '#F4A72B'
                                ]
                            }],
                        }}
                        
                        options={{
                            title:{
                                display: true,
                                text: "Tickets by priority",
                                fontSize: 18
                            },
                            legend: {
                                display: false,
                            },
                            scales: {
                                yAxes: [{
                                ticks: {
                                    reverse: false,
                                    stepSize: 1,
                                    min: 0
                                },
                                }]
                            }
                        }}
                    >
                    </Bar>
                </Graph>
                <Graph>
                    <Pie
                        data={{
                            labels: [...statusNames],
                            datasets: [{
                                data: [...statusValues],
                                backgroundColor: [
                                    '#091F2E', '#D82737', '#F16B2E', '#F4A72B', '#ff4d4f'
                                ]
                            }],
                        }}
                        
                        options={{
                            title:{
                                display: true,
                                text: "Tickets by status",
                                fontSize: 18
                            },
                            legend: {
                                display: true,
                                position: "bottom"
                            },
                        }}
                    >
                    </Pie>
                </Graph>
            </Row>
        </StyledCharts>
    )
}

export default Charts;