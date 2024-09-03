import { useEffect } from 'react';
import './CurrencySelector.style.css';


const CurrencySelector = ({
    selectedFromCurrency,
    setSelectedFromCurrency,
    selectedToCurrency,
    setSelectedToCurrency
}) => {
    const availableCurrencies = ['RUB', 'USD'];
    
    const handleFromCurrencyChange = (event) => {
        const selectedCurrency = event.target.value;
        setSelectedFromCurrency(selectedCurrency);
        localStorage.setItem('default_currency', {})
    };

    const handleToCurrencyChange = (event) => {
        const selectedCurrency = event.target.value;
        setSelectedToCurrency(selectedCurrency);
    };

    const availableToCurrencies = availableCurrencies.filter(currency => 
        currency !== selectedFromCurrency
    );

    useEffect(() => {
        if (availableToCurrencies.length > 0) {
            setSelectedToCurrency(availableToCurrencies[0]);
        }
    });

    return (
        <div className='CurrencySelector'>
            <select onChange={handleFromCurrencyChange} value={selectedFromCurrency}>
                {availableCurrencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                    ))}
            </select>
            <h3>to</h3>
            <select onChange={handleToCurrencyChange} value={selectedToCurrency}>
                {availableToCurrencies.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
};

export default CurrencySelector;