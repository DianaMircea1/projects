# 🧪 Ghid Testare Frontend-Backend Integration

## ✅ Status Actual
- **Backend Health**: ✅ Funcțional
- **Authentication**: ✅ Configurată corect  
- **API Endpoint**: ✅ Răspunde corect
- **Security**: ✅ reCAPTCHA validare funcționează

## 🚀 Pași de Testare

### 1. **Quick Test (Backend Connectivity)**
```bash
node test-backend-connection.js
```
- Verifică dacă backend-ul răspunde
- Testează autentificarea
- Confirmă că endpoint-ul există

### 2. **Frontend Local Test**
```bash
# Instalează dependencies dacă nu sunt
npm install

# Pornește dev server
npm run dev
# SAU
npx next dev

# Accesează în browser
http://localhost:3000
http://localhost:3000/audit
```

### 3. **Manual Form Test**
1. Completează formularul cu date reale
2. Submitează și verifică:
   - Network tab: vezi POST request-ul
   - Console: verifică pentru erori
   - Response: vezi răspunsul backend-ului

### 4. **Production Test**
După deploy pe Vercel:
```bash
# Testează direct production URL
curl -X GET https://your-app.vercel.app/api/health
```

## 🔍 Debugging Guide

### **Network Tab Verificări:**
- Request URL: `https://api.tourism-audit.devidevs.com/api/generate-audit`
- Method: POST
- Headers: `Authorization: Basic ...`
- Body: JSON cu toate câmpurile

### **Expected Responses:**
```json
// Success
{
  "message": "Audit process triggered successfully",
  "status_message": "success", 
  "status_code": 200,
  "property_id": "prop_xyz123"
}

// Error Examples
{
  "message": "reCAPTCHA verification failed",
  "status_message": "failed",
  "status_code": 403
}

{
  "message": "Rate limit exceeded. Please wait...",
  "status_message": "failed", 
  "status_code": 429
}
```

### **Common Issues & Solutions:**

#### 🔴 reCAPTCHA Errors
- **Problem**: "reCAPTCHA verification failed"
- **Solution**: Verifică RECAPTCHA_SITE_KEY în .env.local

#### 🔴 CORS Errors  
- **Problem**: Cross-origin blocked
- **Solution**: Backend-ul trebuie să accepte domain-ul frontend

#### 🔴 Authentication Errors
- **Problem**: 401 Unauthorized  
- **Solution**: Verifică API_CLIENT_ID și API_CLIENT_SECRET

#### 🔴 Rate Limiting
- **Problem**: 429 Too Many Requests
- **Solution**: Așteaptă 24h sau folosește alt email

## ✅ Success Indicators

### **Frontend:**
- Formul se submitează fără erori JavaScript
- Loading state se afișează corect
- Success message apare după submit
- Form se resetează după success

### **Backend:**
- HTTP 200 response cu property_id
- Audit process triggered in background
- Email trimis în ~24 ore (verifică spam folder)

### **Integration:**
- Date transformate corect din frontend în backend format
- Security measures (reCAPTCHA, honeypot) funcționează
- Error handling afișează mesaje corecte

## 🎯 Final Test Checklist

- [ ] Backend health check passes
- [ ] Frontend se compilează fără erori  
- [ ] Form validation funcționează
- [ ] Submit trimite request corect
- [ ] Backend răspunde cu success/error
- [ ] UI afișează feedback corect
- [ ] Audit email este trimis (check after 24h)

---
**Dacă toate acestea funcționează → Integration COMPLETĂ! 🎉**
