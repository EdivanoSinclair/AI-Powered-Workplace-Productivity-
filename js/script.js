const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Toggle navigation");
  });
}


// Workplace Productivity Assistant prototype.
// Outputs are generated locally from rules/templates; no live AI service is called.
const toolTabs = document.querySelectorAll(".tool-tab");
const toolPanels = document.querySelectorAll(".tool-panel");
toolTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tool;
    toolTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    toolPanels.forEach((panel) => {
      const selected = panel.id === `tool-${target}`;
      panel.hidden = !selected;
      panel.classList.toggle("active", selected);
    });
  });
});

const setOutput = (id, value) => {
  const output = document.getElementById(id);
  if (output) output.textContent = value;
};

const clean = (value) => value.trim();
const splitLines = (value) => value.split(/\n+/).map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim()).filter(Boolean);

const emailForm = document.getElementById("email-form");
if (emailForm) {
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const recipient = clean(document.getElementById("email-recipient").value);
    const purpose = clean(document.getElementById("email-purpose").value);
    const tone = document.getElementById("email-tone").value;
    const details = clean(document.getElementById("email-details").value);
    const opening = tone === "friendly" ? `Hi ${recipient},` : tone === "formal" ? `Dear ${recipient},` : `Hello ${recipient},`;
    const closing = tone === "friendly" ? "Thanks so much,\n[Your name]" : tone === "formal" ? "Yours sincerely,\n[Your name]" : "Kind regards,\n[Your name]";
    const body = details ? `\n\n${details}\n` : "\n\nI am writing to discuss this matter and would appreciate your guidance on the next steps.\n";
    const conciseIntro = tone === "concise" ? `\n\nI am contacting you regarding ${purpose.toLowerCase()}.` : `\n\nI am writing regarding ${purpose.toLowerCase()}.`;
    setOutput("email-output", `${opening}${conciseIntro}${body}\nPlease let me know if you need any additional information.\n\n${closing}\n\nSubject: ${purpose}`);
  });
}

const meetingForm = document.getElementById("meeting-form");
if (meetingForm) {
  meetingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const lines = splitLines(document.getElementById("meeting-notes").value);
    const decisions = lines.filter((line) => /\b(decision|decided|agreed|approved|resolved)\b/i.test(line));
    const actions = lines.filter((line) => /\b(action|todo|to-do|follow[- ]?up|owner|by (monday|tuesday|wednesday|thursday|friday|today|tomorrow)|deadline)\b/i.test(line));
    const general = lines.filter((line) => !decisions.includes(line) && !actions.includes(line));
    const list = (items) => items.length ? items.map((item) => `• ${item}`).join("\n") : "• No items identified automatically. Review the original notes.";
    setOutput("meeting-output", `MEETING SUMMARY\n${general.length ? general.join(" ") : "No general discussion points were clearly identified."}\n\nDECISIONS\n${list(decisions)}\n\nACTIONS / FOLLOW-UPS\n${list(actions)}\n\nREVIEW NOTE\nThis is a rule-based organisation of your notes, not a verified summary. Confirm owners, dates and decisions with attendees.`);
  });
}

const tasksForm = document.getElementById("tasks-form");
if (tasksForm) {
  tasksForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const focus = document.getElementById("task-focus").value;
    const tasks = splitLines(document.getElementById("task-list").value).map((task, index) => {
      const urgent = /\b(urgent|asap|immediately|critical|today|overdue)\b/i.test(task);
      const deadline = /\b(deadline|due|by (monday|tuesday|wednesday|thursday|friday|today|tomorrow)|tomorrow|eod)\b/i.test(task);
      const quick = /\b(quick|short|reply|send|confirm|check)\b/i.test(task);
      let priority = urgent ? 1 : deadline ? 2 : 3;
      if (focus === "quick" && quick && !urgent) priority = Math.min(priority, 2);
      return { task, index, priority, quick };
    });
    tasks.sort((a, b) => a.priority - b.priority || (focus === "quick" ? Number(b.quick) - Number(a.quick) : 0) || a.index - b.index);
    const labels = {1: "HIGH", 2: "MEDIUM", 3: "NORMAL"};
    const planned = tasks.map((item, i) => `${i + 1}. [${labels[item.priority]}] ${item.task}`).join("\n");
    setOutput("tasks-output", `SUGGESTED ORDER\n${planned}\n\nNEXT STEPS\n• Choose a realistic time estimate for each task.\n• Confirm deadlines and dependencies with the relevant people.\n• Re-prioritise when new urgent work arrives.\n\nPriority is estimated from wording only; it does not know your actual workload or commitments.`);
  });
}

const researchForm = document.getElementById("research-form");
if (researchForm) {
  researchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const topic = clean(document.getElementById("research-topic").value);
    const question = clean(document.getElementById("research-question").value);
    const audience = clean(document.getElementById("research-audience").value) || "a general workplace audience";
    setOutput("research-output", `RESEARCH TOPIC\n${topic}\n\nMAIN QUESTION\n${question}\n\nSUGGESTED APPROACH\n1. Define key terms and the scope of the question.\n2. Find recent, reputable primary sources and authoritative guidance.\n3. Compare at least two independent sources for important claims.\n4. Record the publication date, author/organisation and source URL.\n5. Summarise findings, limitations, risks and practical recommendations.\n6. Check every citation and distinguish evidence from opinion.\n\nPROMPT TEMPLATE\n"Research ${topic} for ${audience}. Focus on this question: ${question} Provide a balanced summary, key findings, limitations, and practical recommendations. Use reputable, current sources and include verifiable links and publication dates. Do not invent citations; state when evidence is uncertain."\n\nThis tool creates a plan only. It does not search the web or validate sources.`);
  });
}

const chatForm = document.getElementById("chat-form");
const answerWorkplaceQuestion = (question) => {
  const q = question.toLowerCase();
  if (/meeting|agenda|minutes/.test(q)) return "MEETING TIP\n• Set a clear objective and share a short agenda.\n• Invite only the people needed for the decision.\n• Capture decisions, action owners and due dates.\n• End by reading back the next steps and send notes promptly.";
  if (/email|write|follow.?up|message/.test(q)) return "EMAIL TIP\n• Use a specific subject line.\n• State the purpose in the first two sentences.\n• Keep one main request per paragraph.\n• Include relevant context and a clear next step.\n• Check names, dates, attachments and tone before sending.";
  if (/prioriti|task|plan|workday|deadline|urgent/.test(q)) return "TASK PLANNING TIP\n• List all tasks and their real deadlines.\n• Identify urgent, high-impact work and dependencies.\n• Break large tasks into small actions.\n• Schedule focused time and leave space for interruptions.\n• Revisit priorities when circumstances change.";
  if (/research|source|citation|fact/.test(q)) return "RESEARCH TIP\n• Turn the topic into a focused question.\n• Prefer authoritative, current and primary sources.\n• Compare independent sources for important claims.\n• Track URLs and publication dates as you go.\n• Verify citations and flag uncertainty; do not assume a claim is true because it sounds confident.";
  if (/stress|overwhelm|too much/.test(q)) return "WORKLOAD TIP\nWrite down everything competing for attention, identify the most time-sensitive commitments, and agree priorities with your manager or team when there is a conflict. Break the next task into a small first step and take short breaks.";
  return "GENERAL PRODUCTIVITY TIP\n1. Define the outcome you need.\n2. Gather only the context necessary to begin.\n3. Break the work into clear next actions.\n4. Check deadlines, assumptions and stakeholders.\n5. Review the result before sharing it.\n\nTry asking about email writing, meeting agendas, task prioritisation or research planning. This demo uses prepared guidance and is not a live generative AI chatbot.";
};
if (chatForm) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = clean(document.getElementById("chat-question").value);
    setOutput("chat-output", answerWorkplaceQuestion(question));
  });
  document.querySelectorAll(".prompt-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const prompt = chip.dataset.prompt;
      document.getElementById("chat-question").value = prompt;
      setOutput("chat-output", answerWorkplaceQuestion(prompt));
    });
  });
}

document.querySelectorAll(".copy-output").forEach((button) => {
  button.addEventListener("click", async () => {
    const output = document.getElementById(button.dataset.output);
    if (!output) return;
    const originalLabel = button.textContent;
    try {
      await navigator.clipboard.writeText(output.textContent);
      button.textContent = "Copied!";
    } catch (error) {
      const range = document.createRange();
      range.selectNodeContents(output);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = "Select and copy";
    }
    window.setTimeout(() => { button.textContent = originalLabel; }, 1800);
  });
});
