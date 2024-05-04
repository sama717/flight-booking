document.addEventListener('DOMContentLoaded', function () {
  const returnCheckbox = document.getElementById('return-checkbox');
  const returnDetailsDiv = document.getElementById('return-details');
  const form = document.getElementById('booking-form');
  const passengersInput = document.getElementById('passengers');
  const passengerDetailsDiv = document.getElementById('passenger-details');
  const departureDateInput = document.getElementById('departure-date');
  const arrivalDateInput = document.getElementById('arrival-date');
  const fromSelect = document.getElementById('from');
  const toSelect = document.getElementById('to');

  // Prevent '0' from being entered into the passengers input field
  passengersInput.addEventListener('keydown', function(event) {
      if (event.key === '0') {
          event.preventDefault();
      }
  });

  // Reset value to 1 if input field is manually set to 0
  passengersInput.addEventListener('input', function() {
      if (passengersInput.value === '0') {
          passengersInput.value = '1';
      }
  });

  // Prevent the user from deleting the number inside the passengers input field
  passengersInput.addEventListener('keydown', function(event) {
      // Check if the input field is not empty and the Backspace or Delete key is pressed
      if (passengersInput.value !== '' && (event.key === 'Backspace' || event.key === 'Delete')) {
          event.preventDefault(); // Prevent default behavior (deleting)
      }
  });

  returnCheckbox.addEventListener('change', function () {
      if (returnCheckbox.checked) {
          returnDetailsDiv.style.display = 'block';
          // Show error message if return date is before departure date
          if (arrivalDateInput.value && new Date(arrivalDateInput.value) <= new Date(departureDateInput.value)) {
              arrivalDateInput.classList.add('error');
          }
      } else {
          returnDetailsDiv.style.display = 'none';
          // Remove error message if return checkbox is unchecked
          arrivalDateInput.classList.remove('error');
      }
  });

  passengersInput.addEventListener('input', function () {
      const numPassengers = parseInt(passengersInput.value);

      passengerDetailsDiv.innerHTML = ''; // Clear previous inputs

      for (let i = 0; i < numPassengers; i++) {
          const passengerDiv = document.createElement('div');
          passengerDiv.classList.add('passenger');

          const firstNameLabel = document.createElement('label');
          firstNameLabel.textContent = `Name `;
          const firstNameInput = document.createElement('input');
          firstNameInput.type = 'text';
          firstNameInput.name = `passenger${i + 1}-first-name`;
          firstNameInput.required = true;
          firstNameLabel.appendChild(firstNameInput);

          const lastNameLabel = document.createElement('label');
          lastNameLabel.textContent = `Surname `;
          const lastNameInput = document.createElement('input');
          lastNameInput.type = 'text';
          lastNameInput.name = `passenger${i + 1}-last-name`;
          lastNameInput.required = true;
          lastNameLabel.appendChild(lastNameInput);

          passengerDiv.appendChild(firstNameLabel);
          passengerDiv.appendChild(lastNameLabel);

          passengerDetailsDiv.appendChild(passengerDiv);
      }
  });

  departureDateInput.addEventListener('input', function () {
      const departureDate = new Date(departureDateInput.value);
      const arrivalDate = new Date(arrivalDateInput.value);

      if (arrivalDate <= departureDate) {
          arrivalDateInput.value = ''; // Clear return date if it's less than or equal to departure date
          if (returnCheckbox.checked) {
              arrivalDateInput.classList.add('error'); // Show error message if return date is before departure date
          }
      } else {
          arrivalDateInput.classList.remove('error'); // Remove error message if return date is valid
      }
  });

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Check if all required fields are filled
      const requiredInputs = form.querySelectorAll('input[required]');
      let allFilled = true;
      requiredInputs.forEach(function(input) {
          if (!input.value.trim()) {
              input.classList.add('required-field'); // Mark required fields as red
              allFilled = false;
          } else {
              input.classList.remove('required-field');
          }
      });

      // Check if departure city and destination city are the same
      if (fromSelect.value === toSelect.value) {
          alert('Departure city cannot be the same as destination city');
          allFilled = false;
      }

      // Check if return date is before departure date
      const departureDate = new Date(departureDateInput.value);
      const arrivalDate = new Date(arrivalDateInput.value);
      if (returnCheckbox.checked && arrivalDate <= departureDate) {
          alert('Return date must be after departure date');
          allFilled = false;
      }

      if (allFilled) {
          // All required fields are filled and validations pass
          alert("Booking Successful!"); // Show alert message
      }
  });

  // Trigger input event on page load to populate initial passenger details
  passengersInput.dispatchEvent(new Event('input'));
  
});
