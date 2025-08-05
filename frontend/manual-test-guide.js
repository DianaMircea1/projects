/**
 * Manual test - copia acest payload în Network tab din browser
 * și trimite-l de pe site-ul frontend pentru test real cu reCAPTCHA
 */

const manualTestData = {
  contactInfo: {
    fullName: "Test User",
    phone: "+40123456789",
    email: "test@example.com"
  },
  unitInfo: {
    unitName: "Test Hotel",
    address: "Test Address 123, Bucharest"
  },
  onlinePresence: {
    website: "https://test-hotel.com",
    reservationLinks: ["https://booking.com/test"],
    socialMedia: "https://facebook.com/test",
    googleBusiness: "https://goo.gl/maps/test"
  },
  marketingInfo: {
    mainObjective: "Creșterea rezervărilor cu 30%",
    marketingMethods: "Facebook Ads, Google Ads",
    marketingTeam: "none",
    challenges: "Buget limitat",
    contentFrequency: "monthly",
    reviewStrategy: "Răspund în 24h"
  },
  strategyInfo: {
    targetSegments: "Familii cu copii",
    uniqueFacilities: "Piscină, restaurant"
  },
  analyticsInfo: {
    analytics: "1000 vizitatori/lună",
    businessDescription: "Hotel boutique cu 20 camere"
  }
};

console.log('📋 Copiază datele de mai sus și completează formularul pe frontend pentru test real!');
console.log('🌐 URL: http://localhost:3000/audit');
console.log('');
console.log('🔍 Pentru debugging, verifică:');
console.log('1. Network tab în browser pentru requestul POST');
console.log('2. Console tab pentru erori JavaScript');
console.log('3. Backend logs pentru procesarea requestului');
