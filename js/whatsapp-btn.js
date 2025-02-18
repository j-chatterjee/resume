// // Use a simple encoding technique to obfuscate the number
// var encodedNumber = 'OTgzMjU4MzE2OQ==';

// // Decode the number and use it to dynamically generate the WhatsApp link
// var whatsappNumber = atob(encodedNumber);

// // Dynamically set the WhatsApp link when the page loads
// window.onload = function() {
//   document.getElementById('whatsapp-link').href = 'https://wa.me/' + whatsappNumber;
// };


// Use a simple encoding technique to obfuscate the number
var encodedNumber = 'OTgzMjU4MzE2OQ==';

// Decode the number and use it to dynamically generate the WhatsApp link
var whatsappNumber = atob(encodedNumber);

// Wait until the DOM is fully loaded before making any changes
document.addEventListener('DOMContentLoaded', function() {
  // Make sure the element exists before trying to change the href
  var whatsappLink = document.getElementById('whatsapp-link');
  if (whatsappLink) {
    whatsappLink.href = 'https://wa.me/' + whatsappNumber;
  } else {
    console.error("WhatsApp link element not found!");
  }
});
