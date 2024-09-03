export const line_options = {
    scales: {
        x: {
            type: 'category'
        },
        y: {
            beginAtZero: true
        }
    }
}

export const line_data = (labels, label,  data) => {
    return {
        labels: labels,
        datasets: [
            {
                label: label,
                data: data,
                fill: true,
                borderColor: '#e87a2c',
                backgroundColor: 'rgba(232, 122, 44, 0.2)',
                borderWidth: 3,
                tension: 0.1
            }
        ]
    }
}
