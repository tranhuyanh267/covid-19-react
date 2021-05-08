import React from 'react'

import { Cards, Charts, CountryPicker } from './components'
import styles from './App.module.css';
import { fetchData, fetchDataCountry } from './api'

class App extends React.Component {

    state = {
        data: {},
        country: '',
        dailyData: []
    }
    
    async componentDidMount() {
        const fetchedData = await fetchData()    
        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (country) => {
        if (country === 'global') {
            this.setState({country: null})
        } else {
            this.setState({data: await fetchDataCountry(country)})
            this.setState({country})
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <img src="https://i.ibb.co/7QpKsCX/image.png"/>
                <Cards data={this.state.data}/>
                <CountryPicker onCountryChange={this.handleCountryChange} />
                <Charts country={this.state.country} data={this.state.data}/>
            </div>
        )
    }
}
export default App;