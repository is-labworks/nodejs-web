const axios = require('axios');

const url = 'http://localhost:3000'; // Replace with your server URL

axios.get(url)
    .then(response => {
        console.log('Data:', response.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });