// Use a simple encoding technique to obfuscate the number
var encodedNumber = 'OTgzMjU4MzE2OQ==';

// Decode the number and use it to dynamically generate the WhatsApp link
var whatsappNumber = atob(encodedNumber);

// Dynamically set the WhatsApp link when the page loads
window.onload = function() {
  document.getElementById('whatsapp-link').href = 'https://wa.me/' + whatsappNumber;
};
