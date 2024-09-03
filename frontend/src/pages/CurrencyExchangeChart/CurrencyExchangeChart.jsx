import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { line_options, line_data } from './line_config';
import { Chart } from 'chart.js/auto';
import CurrencySelector from 'src/components/CurrencySelector/CurrencySelector';
import './CurrencyExchangeChart.style.css';
import { HOST } from 'src/utils/Request.ts';


const title = 'Currency';
const default_currency = ['USD', 'RUB'];

const CurrencyExchangeChart = () => {
    useEffect(() => { document.title = title; });
    const [selectedFromCurrency, setSelectedFromCurrency] = useState(default_currency[0]);
    const [selectedToCurrency, setSelectedToCurrency] = useState(default_currency[1]);
    const [currencyData, setCurrencyData] = useState([]);

    useEffect(() => { // socket 
        if (selectedFromCurrency === selectedToCurrency) { return };

        const ws = new WebSocket(
            `ws://${HOST.split('//')[1]}/ws/currency/${selectedFromCurrency}_${selectedToCurrency}/`
        );

        ws.onopen = () => {console.log('ws.open')};

        ws.onmessage = (event) => {
            const receivedData = JSON.parse(event.data);
            if (Array.isArray(receivedData)) {
                setCurrencyData(receivedData);
            } else {
                setCurrencyData(prevData => [...prevData, receivedData]);
            }
            console.log('Получено сообщение от сервера:', receivedData);
        };

        ws.onclose = () => { console.log('ws close'); };
        return () => { ws.close(); };
    }, [selectedFromCurrency, selectedToCurrency]);

    return (
        <div className='CurrencyExchangeChart-block'>
            <h1>График валютной биржи</h1>
            <div className='settings-block'>
                <CurrencySelector
                    selectedFromCurrency={selectedFromCurrency}
                    selectedToCurrency={selectedToCurrency}
                    setSelectedFromCurrency={setSelectedFromCurrency}
                    setSelectedToCurrency={setSelectedToCurrency}
                />
            </div>
            {currencyData && currencyData.length > 0 ? (
                <div className='chart-container'>
                    <div className='currencyInformation'>
                        <div className='fromCurrencyCountText'>1 {selectedFromCurrency} ровняется</div>
                        <div className='toCurrencyCountText'>
                            {currencyData.length > 0 &&
                                currencyData[currencyData.length-1]['exchange_rate'].replace('.', ',')
                            }
                            {selectedToCurrency}
                        </div>
                    </div>
                    <Line className='Line' 
                        data={line_data(
                            currencyData.map(item => item['date_time']),
                            `1 ${selectedFromCurrency} to ${selectedToCurrency}`,
                            currencyData.map(item => item['exchange_rate'])
                        )}
                        options={line_options}
                    />
            </div>
            ) : (
                <div className='Loading'>Loading...</div>
            )}
        </div>
    );
};

export default CurrencyExchangeChart;