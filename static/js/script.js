let countries = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('/countries')
        .then(response => response.json())
        .then(data => {
            countries = data;
        });
});

function suggestCountries() {
    const query = document.getElementById('search').value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    if (query.length === 0) {
        return;
    }

    const suggestions = countries.filter(country => 
        country.name.toLowerCase().startsWith(query) || country.code.toLowerCase().startsWith(query)
    );

    suggestions.forEach(country => {
        const suggestion = document.createElement('p');
        suggestion.textContent = `${country.name} (${country.code})`;
        suggestion.classList.add('p-2', 'cursor-pointer', 'hover:bg-gray-200');
        suggestion.onclick = () => {
            document.getElementById('search').value = country.name;
            suggestionsDiv.innerHTML = '';
        };
        suggestionsDiv.appendChild(suggestion);
    });
}

function searchCountry() {
    const query = document.getElementById('search').value;
    const resultDiv = document.getElementById('result');

    fetch(`/countries/code/${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                return fetch(`/countries/name/${query}`);
            } else {
                displayResult(data);
                return null;
            }
        })
        .then(response => response ? response.json() : null)
        .then(data => {
            if (data && !data.error) {
                displayResult(data);
            } else if (data) {
                resultDiv.innerHTML = '<p>Ülke Bulunamadı.</p>';
            }
        })
        .catch(error => {
            resultDiv.innerHTML = '<p>Lütfen ülke giriniz.</p>';
            console.error('Error:', error);
        });
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Dial Code:</strong> ${data.dial_code}</p>
        <p><strong>Code:</strong> ${data.code}</p>
    `;
}