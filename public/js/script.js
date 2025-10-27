let baseUrl = "";

fetch("http://localhost:8080/api/config")
  .then((response) => response.json())
  .then((config) => {
    baseUrl = config.baseUrl;

    document.querySelector("#frmGenerate").addEventListener("submit", (e) => {
      e.preventDefault();

      // The endpoint is inferred from the selected option
      let endpoint = "/";
      if (e.target.chkPerson.checked) {
        const numPersons = parseInt(e.target.txtNumberPersons.value);
        endpoint += numPersons > 1 ? "persons?amount=" + numPersons : "person";
      } else {
        endpoint += e.target.cmbPartialOptions.value;
      }

      // API call
      fetch(baseUrl + endpoint)
        .then((response) => {
          if (!response.ok) {
            handleError();
          } else {
            return response.json();
          }
        })
        .then(handlePersonData)
        .catch(handleError);
    });
  })
  .catch(() => handleError());

const handlePersonData = (data) => {
  const output = document.querySelector("#output");
  output.innerHTML = "";

  if (data.length === undefined) {
    data = [data];
  }

  data.forEach((item) => {
    const personCard = document.importNode(
      document.getElementById("personTemplate").content,
      true,
    );
    if (item.cpr !== undefined) {
      const cprValue = personCard.querySelector(".cprValue");
      cprValue.innerText = item.cpr;
      cprValue.classList.remove("hidden");
      personCard.querySelector(".cpr").classList.remove("hidden");
    }
    if (item.name !== undefined) {
      const firstNameValue = personCard.querySelector(".firstNameValue");
      firstNameValue.innerText = item.name;
      firstNameValue.classList.remove("hidden");

      const lastNameValue = personCard.querySelector(".lastNameValue");
      lastNameValue.innerText = item.surname;
      lastNameValue.classList.remove("hidden");
      personCard.querySelector(".firstName").classList.remove("hidden");
      personCard.querySelector(".lastName").classList.remove("hidden");
    }
    if (item.gender !== undefined) {
      const genderValue = personCard.querySelector(".genderValue");
      genderValue.innerText = item.gender;
      genderValue.classList.remove("hidden");
      personCard.querySelector(".gender").classList.remove("hidden");
    }
    if (item.birthdate !== undefined) {
      const dobValue = personCard.querySelector(".dobValue");
      dobValue.innerText = item.birthdate;
      dobValue.classList.remove("hidden");
      personCard.querySelector(".dob").classList.remove("hidden");
    }
    if (item.address !== undefined || item.street !== undefined) {
      const address = item.address ?? item;
      const personCard = document.importNode(
        document.getElementById("personTemplate").content,
        true,
      );

      personCard.querySelector(".address").classList.remove("hidden");
      personCard.querySelector(".streetValue").textContent =
        `${address.street} ${address.number}, ${address.floor}.${address.door}`;
      personCard.querySelector(".streetValue").classList.remove("hidden");
      personCard.querySelector(".townValue").textContent =
        `${address.town.postalCode} ${address.town.name}`;
      personCard.querySelector(".townValue").classList.remove("hidden");

      document.querySelector("#output").appendChild(personCard);
    }
    if (item.phoneNumber !== undefined || item.phone !== undefined) {
      const phone = item.phoneNumber ?? item.phone;
      const phoneLabel = personCard.querySelector(".phoneNumber");
      const phoneValue = personCard.querySelector(".phoneNumberValue");

      if (phoneLabel && phoneValue) {
        phoneValue.textContent = phone;
        phoneLabel.classList.remove("hidden");
        phoneValue.classList.remove("hidden");
      }
    }

    output.appendChild(personCard);
  });
  output.classList.remove("hidden");
};

const handleError = () => {
  const output = document.querySelector("#output");

  output.innerHTML = "<p>There was a problem communicating with the API</p>";
  output.classList.add("error");

  setTimeout(() => {
    output.innerHTML = "";
    output.classList.remove("error");
  }, 2000);
};
