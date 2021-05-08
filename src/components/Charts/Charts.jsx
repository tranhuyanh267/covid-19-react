import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css'

const Charts = ({data: {confirmed, recovered, deaths}, country}) => {

    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const dailyData = await fetchDailyData();
            setDailyData(dailyData)
        }

        fetchAPI()
    }, [])

    const LineChart = (
        dailyData.length !== 0 ? (
            <Line data={{
                labels: dailyData.map(({date}) => date),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, 
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Death',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true
                    }
                ]
            }}>
            </Line>
        ) : null
    )

    const BarChart = (
        confirmed ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            labels: 'People',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                            data: [
                                confirmed.value, recovered.value, deaths.value
                            ]
                        }
                    ]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}`}
                }}
            />
        ) : null
    )
    return (
        <div className={styles.container}>
            {
                country ? BarChart : LineChart
            }
        </div>
    )
}

export default Charts