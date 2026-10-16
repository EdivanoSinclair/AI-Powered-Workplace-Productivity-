# Moeketsi Mokotedi — CV Portfolio and Workplace Productivity Assistant

## Project overview

This repository contains the multi-page CV portfolio website and an interactive **AI-Powered Workplace Productivity Assistant** prototype, created as a practical project for an AI Skills Program.

The existing portfolio pages remain available:
- Home (`index.html`)
- About (`about.html`)
- Skills (`skills.html`)
- Projects (`projects.html`)
- Education & Certifications (`education.html`)
- Experience (`experience.html`)
- Contact (`contact.html`)

The new assistant is available at `productivity-assistant.html`.

## Productivity assistant features

1. **Professional email writer** — builds an email draft from recipient, purpose, tone and user-provided details.
2. **Meeting notes organiser** — separates likely decisions, action items and general notes using keyword rules.
3. **Task planner** — orders tasks using words that suggest urgency or deadlines and adds a review checklist.
4. **Research helper** — generates a research plan and reusable research prompt; it does not perform web searches.
5. **Workplace productivity chatbot** — provides prepared guidance for common questions about meetings, emails, planning and research.

### Important implementation note

This version is a browser-based JavaScript prototype. It uses templates and keyword-based rules. **It does not connect to a live AI model, call an AI API, send data to a server, or perform live web research.** The project is useful for demonstrating interface design, form handling, prompt structure, rule-based automation and responsible-use considerations. If the assignment requires genuine generative AI, a model API and a secure server-side integration will need to be added as a later phase; never expose a secret API key in client-side JavaScript.

## Run locally

1. Extract the project folder.
2. Open it in Visual Studio Code.
3. Optionally install the Live Server extension.
4. Open `index.html` with Live Server, or open `index.html` directly in a modern browser.
5. Select **Productivity Assistant** in the navigation.
6. Try each tool using sample, non-confidential information.

No build step, package installation or external JavaScript library is required.

## Deployment

The site is static and can be hosted with GitHub Pages. Upload the complete folder, preserving the `css`, `js` and `downloads` directories and all HTML files. The assistant uses relative paths so it can work from a project subdirectory.

## Responsible and ethical use

- Do not paste passwords, personal data, confidential meeting notes or sensitive company/customer information.
- Check generated drafts and summaries before using them.
- Confirm action owners, deadlines and decisions with the original source.
- Verify research claims and citations independently; the prototype does not browse the web.
- Use human judgement for important employment, security, customer or operational decisions.
- Do not present the rule-based prototype as a live AI model.

## Testing

See [`tests/manual_test_checklist.md`](tests/manual_test_checklist.md) for the manual test checklist.

## Technology

- HTML5
- CSS3 (responsive layout)
- Vanilla JavaScript
- Browser-native form and clipboard APIs

## CV download

The CV PDF is stored at `downloads/Moeketsi-Mokotedi-CV.pdf`. Keep this file and the `downloads` directory in place so the Download CV links continue to work.

## Project maintenance

The networking and IT support examples on the Projects page are starter placeholders and should be edited to reflect actual completed work. Avoid adding claims that are not accurate.
