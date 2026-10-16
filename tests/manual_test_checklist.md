# Manual Test Checklist

Run the site locally in a modern desktop browser and, if possible, a mobile-sized viewport.

## Portfolio regression
- [ ] Home page loads and existing navigation links work.
- [ ] About, Skills, Projects, Education, Experience and Contact pages load.
- [ ] Download CV links open/download `downloads/Moeketsi-Mokotedi-CV.pdf`.
- [ ] Mobile navigation opens and closes and updates `aria-expanded`.
- [ ] The new Productivity Assistant navigation link appears across the portfolio.

## Productivity assistant
- [ ] Email writer: submit with recipient and purpose; confirm a draft appears.
- [ ] Email writer: change tone and confirm greeting/closing changes.
- [ ] Email writer: add details and confirm they appear in the draft.
- [ ] Meeting organiser: include a line starting with “Decision:” and an “Action:” line; confirm both are categorised.
- [ ] Meeting organiser: submit multiple notes and confirm the output includes a review note.
- [ ] Task planner: enter urgent, deadline and normal tasks; confirm urgency wording influences order.
- [ ] Task planner: leave task field blank and confirm browser validation prevents submission.
- [ ] Research helper: enter topic, question and audience; confirm plan and prompt are generated.
- [ ] Research helper: confirm output clearly says it does not search the web or validate sources.
- [ ] Chatbot: ask about a meeting and confirm meeting tips appear.
- [ ] Chatbot: ask about email writing and confirm email tips appear.
- [ ] Chatbot: ask an unrelated question and confirm general guidance appears.
- [ ] Quick prompt chips populate the chatbot question and produce a response.
- [ ] Copy text buttons copy output when clipboard permission is available.
- [ ] Tool tabs switch panels and correctly update the selected state.
- [ ] Confirm the prototype notice and responsible AI checklist are visible.
- [ ] Test at narrow mobile width; forms, tabs and outputs remain readable.

## Responsible-use checks
- [ ] No API keys, passwords or tokens are included in source files.
- [ ] README accurately explains the rule-based implementation and limitations.
- [ ] Sample content contains no confidential workplace or personal information.
