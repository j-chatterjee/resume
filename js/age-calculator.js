// Function to calculate age based on date of birth
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
  
  // Update the age in the HTML
  function updateAge() {
    const dob = '1995-02-13'; // Your date of birth
    const age = calculateAge(dob);
    document.getElementById('age').textContent = age; // Update the content of the age element
  }
  
  // Call the function to update the age when the page loads
  window.onload = updateAge;
  