import { baseUrl } from './info.js';

document.querySelector('#frmGenerate').addEventListener('submit', (e) => {
    e.preventDefault();

    // The endpoint is inferred from the selected option
    let endpoint = '/';
    if (e.target.chkPerson.checked) {
        endpoint += 'person'
        const numPersons = parseInt(e.target.txtNumberPersons.value);
        if (numPersons > 1) {
            endpoint += '?n=' + numPersons;
        }
    } else {
        endpoint += e.target.cmbPartialOptions.value;
    }

    // API call
    fetch(baseUrl + endpoint)
        .then(response => {
            if (!response.ok) {
                handleError();
            } else {
                return response.json();
            }
        })
        .then(handlePersonData)
        .catch(handleError);
});

const handlePersonData = (data) => {
    const output = document.querySelector('#output');
    output.innerHTML = '';

    if (data.length === undefined) {
        data = [data];
    }

    data.forEach(item => {
        const personCard = document.importNode(document.getElementById('personTemplate').content, true);
        if (item.CPR !== undefined) {
            const cprValue = personCard.querySelector('.cprValue');
            cprValue.innerText = item.CPR;
            cprValue.classList.remove('hidden');
            personCard.querySelector('.cpr').classList.remove('hidden');
        }
        if (item.firstName !== undefined) {
            const firstNameValue = personCard.querySelector('.firstNameValue');
            firstNameValue.innerText = item.firstName;
            firstNameValue.classList.remove('hidden');
            const lastNameValue = personCard.querySelector('.lastNameValue');
            lastNameValue.innerText = item.lastName;
            lastNameValue.classList.remove('hidden');
            personCard.querySelector('.firstName').classList.remove('hidden');
            personCard.querySelector('.lastName').classList.remove('hidden');
        }
        if (item.gender !== undefined) {
            const genderValue = personCard.querySelector('.genderValue');
            genderValue.innerText = item.gender;
            genderValue.classList.remove('hidden');
            personCard.querySelector('.gender').classList.remove('hidden');
        }
        if (item.birthDate !== undefined) {
            const dobValue = personCard.querySelector('.dobValue');
            dobValue.innerText = item.birthDate;
            dobValue.classList.remove('hidden');
            personCard.querySelector('.dob').classList.remove('hidden');
        }
        if (item.address !== undefined) {
            const streetValue = personCard.querySelector('.streetValue');
            streetValue.innerText = `${item.address.street} ${item.address.number}, ${item.address.floor}.${item.address.door}`;
            streetValue.classList.remove('hidden');
            const townValue = personCard.querySelector('.townValue');
            townValue.innerText = `${item.address.postal_code} ${item.address.town_name}`;
            townValue.classList.remove('hidden');
            personCard.querySelector('.address').classList.remove('hidden');
        }
        if (item.phoneNumber !== undefined) {
            const phoneNumberValue = personCard.querySelector('.phoneNumberValue');
            phoneNumberValue.innerText = item.phoneNumber;
            phoneNumberValue.classList.remove('hidden');
            personCard.querySelector('.phoneNumber').classList.remove('hidden');
        }

        output.appendChild(personCard);
    });
    output.classList.remove('hidden');
};

const handleError = () => {
    const output = document.querySelector('#output');

    output.innerHTML =
        '<p>There was a problem communicating with the API</p>';
    output.classList.add('error');

    setTimeout(() => {
        output.innerHTML = '';
        output.classList.remove('error');
    }, 2000);
};