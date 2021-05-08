import React, {useState, useEffect} from 'react'
import {NativeSelect, FormControl} from '@material-ui/core'
import { fetchCountries } from '../../api'

import styles from './CountryPicker.module.css'

const CountryPicker = ({onCountryChange}) => {
    const [ countries, setCountries ] = useState([])
    useEffect(() => {
        const fetchCountriesFunc = async () => {
            setCountries(await fetchCountries())
        }

        fetchCountriesFunc();
    }, [setCountries])

    const countryOptions = countries.map((c, i) => {
        return (
            <option key={i + 1} value={c}>{c}</option>
        )
    })

    return (
        <FormControl className={styles.formControl}>
           <NativeSelect defaultValue="" onChange={(e) => onCountryChange(e.target.value)}>
                <option key="1" value="global">Global</option>
                {countryOptions}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker