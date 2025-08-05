# Two-Phase AI System – Technical Guide

This guide explains the architecture, flow and implementation details of the **two-phase AI pipeline** introduced in July 2025 for Cazare-Audit.  
It is aimed at developers who need a deep understanding of how the system fetches data, generates a digital-marketing audit, formats it for Romanian customers and delivers it via email.

---

## 1. Why a Two-Phase Approach?

| Classic Flow (v1) | Two-Phase Flow (v2) |
|-------------------|---------------------|
| Single AI call produced a long free-form report that was attached as a `.txt` file. | Phase 1 – generate *raw* audit ➜ Phase 2 – reformat into a strict **Romanian template** ➜ inline HTML email. |

Reasons for the redesign:

1. **Consistent output** – business users wanted the same headings, icons (✅⚠️❌) and action plan every time.
2. **Separation of concerns** – heavy research vs. light formatting are different tasks and models.
3. **Better localisation** – second call guarantees Romanian language & diacritics.
4. **Inline HTML** – no attachments, mobile friendly, branding friendly.
5. **Error resilience** – easier to validate and retry formatting separately.

---

## 2. Phase 1 – DigitalAuditor (Raw Audit Generation)

### Purpose
Collect public-web intelligence (website, social links, booking platforms etc.) and produce an *unstructured* but complete audit in Romanian.

### Implementation
* File: `audit_generator.py`
* Class: `DigitalAuditor`
* Model: `o4-mini` by default (configurable)
* Flow:
  1. Build **master prompt** with business context and structured instructions.
  2. Submit background job (`client.responses.create(background=True)`).
  3. Poll status until `completed | failed`.
  4. On success, `output_text` is stored as **raw_audit** (string).

### Key Settings
| Config | Source | Default |
|--------|--------|---------|
| `DEEP_RESEARCH_MODEL` | `config.py` | `o4-mini` |
| `CLIENT_TIMEOUT` | `config.py` | 600 s |
| `max_tool_calls` | hard-coded | 25 |

### Typical Output (excerpt)

```
Website speed: The PageSpeed Insights score is 46/100 on mobile...
Booking.com profile: score 9.1/10 (69 reviews)...
...
```

---

## 3. Phase 2 – TemplateProcessor (Romanian Formatting)

### Purpose
Transform the raw audit into the strict **“AUDIT DIGITAL – [NUME]”** template supplied by business stakeholders.

### Implementation
* File: `template_processor.py`
* Class: `TemplateProcessor`
* Model: `gpt-4-turbo` (configurable)
* Prompt:
  * Contains the full template scaffold +
    mandatory rules + raw audit as reference.
* Validation:
  * `_validate_formatted_content()` checks for mandatory
    sections, counts ≤6 action items, verifies status icons.
  * Raises `TemplateProcessingError` on issues.

#### Logic Highlights
* Regex parsing is used later to convert the plain-text template into styled HTML.
* Independent from Phase 1 – can be re-run on the same raw text if validation fails or template evolves.

### Typical Output (excerpt)

```
AUDIT DIGITAL – VILA MAIA

Legenda status:
- ✅ Bine ...
...

1. Evaluarea Prezenței Online și Vizibilității

Site web
- Existență & funcționalitate: ✅ Site activ...
```

---

## 4. Phase 3 – HTML Email Generation & Delivery

### Purpose
Embed the formatted audit into a rich, dark-mode HTML email and send it to the property owner.

### Implementation
* Rendered by `TemplateProcessor.generate_html_email()`
  * Converts template text ➜ responsive HTML (same design as marketing provided).
  * Inserts property name dynamically.
* Sent by `EmailService.send_audit_report()`
  * File: `email_service.py`
  * Provider: **Resend**
  * Inline HTML + plain-text fallback.
  * No attachments (>40 MB limit avoided).

---

## 5. Technical Details per Phase

| Phase | Key File / Class | External API | Important Methods |
|-------|------------------|-------------|-------------------|
| 1 ‑ Raw Audit | `audit_generator.py` / `DigitalAuditor` | OpenAI **Deep Research** | `_build_master_prompt`, `start_audit_generation` |
| 2 ‑ Formatting | `template_processor.py` / `TemplateProcessor` | OpenAI **chat completions** | `_build_template_prompt`, `_validate_formatted_content`, `_convert_formatted_text_to_html` |
| 3 ‑ Email | `email_service.py` / `EmailService` | Resend email API | `send_audit_report`, `_generate_email_greeting` |

---

## 6. Error Handling & Validation

### Phase 1
* Retries full job up to **3** times on rate-limit failures.
* Exits early on permanent failures (`error.code != rate_limit_exceeded`).

### Phase 2
* Hard validation list of required headings.
* Minimum 3 (actually 6) action items check.
* Raises `TemplateProcessingError` ➜ caught in `main.py`, displayed and halts email send.

### Phase 3
* Resend API call wrapped in exponential back-off (3 attempts).
* Missing HTML or invalid email raises `EmailError`.

---

## 7. Benefits Recap

1. Predictable, branded output every time.
2. Easier localisation tweaks (only Phase 2 touched).
3. Smaller, cheaper model in Phase 1; more eloquent model only for formatting.
4. Validation step prevents garbled emails reaching clients.
5. Inline HTML drives higher open & read rates vs. attachments.

---

## 8. Configuration Options

| Variable | Description | Affecting Phase | Example |
|----------|-------------|-----------------|---------|
| `DEEP_RESEARCH_MODEL` | Model for heavy research | 1 | `o3-deep-research-2025-06-26` |
| `OPENAI_API_KEY` | Auth for both phases | 1 & 2 | `sk-...` |
| `RESEND_API_KEY` | Email delivery | 3 | `re_...` |
| `FROM_EMAIL` | Default “From” header | 3 | `Digital Audit <audit@domain>` |
| CLI `--send-email` | Toggle email stage | 3 | `True/False` |

All are loaded via `python-dotenv` in `config.py`.

---

## 9. End-to-End Example

### Input (DB Row → `ClientData`)
```json
{
  "property_name": "Vila Maia",
  "website_url": "https://vilamaia.ro",
  "booking_platform_links": ["https://booking.com/..."],
  "social_media_links": ["https://facebook.com/vilamaia"],
  "google_my_business_link": "",
  "primary_marketing_goal": "Creșterea rezervărilor directe",
  "owner_name": "Ioana Pop",
  "email": "ioana@vilamaia.ro",
  "phone_number": "0755-123-456",
  "property_address": "Str. Plajei 1, Eforie Sud"
}
```

### Phase 1 Output (snippet)
```
Website speed: 46/100 mobile, 71/100 desktop...
Airbnb profile: not found...
```

### Phase 2 Output (snippet)
```
AUDIT DIGITAL – VILA MAIA

1. Evaluarea Prezenței Online și Vizibilității

Site web
- Existență & funcționalitate: ✅ Site activ...
- Viteză de încărcare: ⚠️ Recomandare: comprimare imagini
...
```

### Phase 3 Output
*Email preview – dark card with heading “Audit Digital – VILA MAIA”, legend, sections with ✅⚠️❌, action steps 01-06, footer “Raport generat de DeviDevs”.*

---

## 10. Where to Hook In?

* **Change prompt** ➜ edit `_build_master_prompt` in `audit_generator.py`.
* **Change template** ➜ edit `_build_template_prompt` in `template_processor.py`.
* **Add new email language** ➜ extend `_generate_email_greeting` + HTML generator.
* **Skip email** ➜ omit `--send-email` or disable `EmailService`.

---

*Last updated: 20 July 2025*
