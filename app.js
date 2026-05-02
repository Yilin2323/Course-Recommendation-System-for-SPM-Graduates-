const gradeSelectOptions = [
  { label: "SILA PILIH", value: "" },
  { label: "A+", value: "A+" },
  { label: "A / 1A / A1", value: "A" },
  { label: "A- / 2A / A2", value: "A-" },
  { label: "B+ / 3B / C3", value: "B+" },
  { label: "B / 4B / C4", value: "B" },
  { label: "C+ / 5C / C5", value: "C+" },
  { label: "C / 6C / C6", value: "C" },
  { label: "D / 7D / P7", value: "D" },
  { label: "E / 8E / P8", value: "E" },
  { label: "F / 9G / F9", value: "G" },
  { label: "TIADA", value: "TIADA" }
];
const gradePoints = {
  "A+": 10,
  "A": 9,
  "A-": 8,
  "B+": 7,
  "B": 6,
  "C+": 5,
  "C": 4,
  "D": 3,
  "E": 2,
  "G": 1
};

/** Mata pelajaran teras (wajib) — keys align with course rule lookups where applicable */
const compulsorySubjects = [
  { label: "Bahasa Melayu", key: "Bahasa Melayu" },
  { label: "Bahasa Inggeris (dijajarkan dengan CEFR)", key: "English" },
  { label: "Sejarah", key: "History" },
  { label: "Matematik", key: "Mathematics" },
  { label: "Sains (wajib bagi aliran Sastera, Perdagangan & Kesenian)", key: "Science" }
];

const CORE_KEYS = new Set([
  ...compulsorySubjects.map((row) => row.key),
  "Pendidikan Islam",
  "Pendidikan Moral"
]);

/** Mata pelajaran elektif — `value` is stored in grades; aliases map to course requirements */
const electiveGroups = [
  {
    title: "Aliran Sains Tulen",
    options: [
      { label: "Fizik", value: "Physics" },
      { label: "Kimia", value: "Chemistry" },
      { label: "Biologi", value: "Biology" },
      { label: "Matematik Tambahan", value: "Additional Mathematics" }
    ]
  },
  {
    title: "Aliran Sastera & Kemanusiaan",
    options: [
      { label: "Ekonomi", value: "Ekonomi" },
      { label: "Perniagaan", value: "Perniagaan" },
      { label: "Prinsip Perakaunan", value: "Prinsip Perakaunan" },
      { label: "Geografi", value: "Geografi" },
      { label: "Kesusasteraan Inggeris", value: "Kesusasteraan Inggeris" },
      { label: "Kesusasteraan Cina / Tamil", value: "Kesusasteraan Cina/Tamil" }
    ]
  },
  {
    title: "Aliran Teknikal & Vokasional",
    options: [
      { label: "Lukisan Kejuruteraan", value: "Lukisan Kejuruteraan" },
      { label: "Grafik Komunikasi Teknikal", value: "Grafik Komunikasi Teknikal" },
      { label: "Sains Tambahan", value: "Sains Tambahan" }
    ]
  },
  {
    title: "Bahasa Tambahan",
    options: [
      { label: "Bahasa Arab", value: "Bahasa Arab" },
      { label: "Bahasa Cina", value: "Bahasa Cina" },
      { label: "Bahasa Tamil", value: "Bahasa Tamil" },
      { label: "Bahasa Iban", value: "Bahasa Iban" },
      { label: "Bahasa Kadazandusun", value: "Bahasa Kadazandusun" },
      { label: "Bahasa Punjabi", value: "Bahasa Punjabi" }
    ]
  }
];

/** Course requirement key → student grade keys that can satisfy it (first match wins) */
const COURSE_GRADE_ALIASES = {
  "Accounting / Economy / ICT": ["Prinsip Perakaunan", "Ekonomi", "Perniagaan"]
};

function resolveStudentGrade(grades, requirementKey) {
  const direct = grades[requirementKey];
  if (direct && direct !== "TIADA") return direct;
  const aliases = COURSE_GRADE_ALIASES[requirementKey];
  if (aliases) {
    for (const alt of aliases) {
      const g = grades[alt];
      if (g && g !== "TIADA") return g;
    }
  }
  return undefined;
}

const riasecLabels = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional"
};

const questions = [
  { type: "R", text: "I enjoy working with tools, machines, or equipment." },
  { type: "R", text: "I like practical activities that involve building or fixing things." },
  { type: "I", text: "I like solving problems and analyzing information." },
  { type: "I", text: "I enjoy science, research, experiments, or technology topics." },
  { type: "A", text: "I enjoy designing, drawing, editing, or creating content." },
  { type: "A", text: "I prefer creative tasks with flexible ways to solve them." },
  { type: "S", text: "I like helping, teaching, or guiding other people." },
  { type: "E", text: "I enjoy leading people or starting business ideas." },
  { type: "E", text: "I am interested in management, marketing, or entrepreneurship." },
  { type: "C", text: "I am careful with numbers, forms, and details." }
];

const courses = [
  {
    name: "Diploma in Information Technology",
    field: "Computing",
    requiredSubjects: { Mathematics: "C", English: "C" },
    personalityTypes: ["Investigative", "Conventional", "Realistic"],
    explanation: "Suitable for students who enjoy problem-solving, technology, and logical thinking."
  },
  {
    name: "Diploma in Computer Science",
    field: "Computing",
    requiredSubjects: { Mathematics: "C", "Additional Mathematics": "D", English: "C" },
    personalityTypes: ["Investigative", "Realistic", "Conventional"],
    explanation: "Good for students interested in software, algorithms, and analytical work."
  },
  {
    name: "Diploma in Accounting",
    field: "Business",
    requiredSubjects: { Mathematics: "C", "Accounting / Economy / ICT": "C" },
    personalityTypes: ["Conventional", "Enterprising", "Investigative"],
    explanation: "Recommended for students who are organized and comfortable with numbers and records."
  },
  {
    name: "Diploma in Business Management",
    field: "Business",
    requiredSubjects: { Mathematics: "D", English: "C" },
    personalityTypes: ["Enterprising", "Social", "Conventional"],
    explanation: "Suitable for students who enjoy leadership, planning, and business ideas."
  },
  {
    name: "Diploma in Engineering",
    field: "Engineering",
    requiredSubjects: { Mathematics: "C", Physics: "C", Science: "C" },
    personalityTypes: ["Realistic", "Investigative", "Conventional"],
    explanation: "Matches students who prefer practical technical work and scientific problem-solving."
  },
  {
    name: "Diploma in Graphic Design / Multimedia",
    field: "Creative Media",
    requiredSubjects: { English: "D", Mathematics: "D" },
    personalityTypes: ["Artistic", "Enterprising", "Social"],
    explanation: "Fits creative students who enjoy visual design, digital media, and content creation."
  },
  {
    name: "Diploma in Education",
    field: "Education",
    requiredSubjects: { "Bahasa Melayu": "C", English: "C", History: "C" },
    personalityTypes: ["Social", "Artistic", "Enterprising"],
    explanation: "Recommended for students who enjoy helping, teaching, and communicating with others."
  },
  {
    name: "Diploma in Science",
    field: "Science",
    requiredSubjects: { Science: "C", Chemistry: "D", Biology: "D" },
    personalityTypes: ["Investigative", "Realistic", "Conventional"],
    explanation: "Suitable for students interested in experiments, observation, and scientific knowledge."
  },
  {
    name: "Foundation in Computing",
    field: "Computing",
    requiredSubjects: { Mathematics: "C", English: "C", "Accounting / Economy / ICT": "D" },
    personalityTypes: ["Investigative", "Conventional", "Enterprising"],
    explanation: "A strong pathway for students planning to continue into computing degree programmes."
  },
  {
    name: "Foundation in Business",
    field: "Business",
    requiredSubjects: { Mathematics: "D", English: "C", "Bahasa Melayu": "C" },
    personalityTypes: ["Enterprising", "Conventional", "Social"],
    explanation: "A good route for students interested in business, accounting, marketing, or management."
  }
];

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[character]));
}

function showMessage(element, message) {
  if (!element) return;
  element.textContent = message;
  element.classList.add("show");
}

function clearMessage(element) {
  if (!element) return;
  element.textContent = "";
  element.classList.remove("show");
}

const AUTH_USERS_KEY = "kmeUsers";
const AUTH_SESSION_KEY = "kmeSession";

function loadUsers() {
  return loadData(AUTH_USERS_KEY, []);
}

function saveUsers(users) {
  saveData(AUTH_USERS_KEY, users);
}

function getSession() {
  return loadData(AUTH_SESSION_KEY, null);
}

function setSession(session) {
  saveData(AUTH_SESSION_KEY, session);
}

function clearSession() {
  localStorage.removeItem(AUTH_SESSION_KEY);
}

function getPageFile() {
  const parts = window.location.pathname.split("/");
  return (parts.pop() || "index.html").toLowerCase();
}

function renderNavAuth() {
  const el = document.querySelector("#navAuth");
  if (!el) return;

  const session = getSession();
  const file = getPageFile();

  if (session && session.name && session.email) {
    el.innerHTML = `
      <span class="user-greeting" title="${escapeHTML(session.email)}">${escapeHTML(session.name)}</span>
      <button type="button" class="nav-auth-out button ghost">Log out</button>
    `;
    el.querySelector(".nav-auth-out")?.addEventListener("click", () => {
      clearSession();
      window.location.href = "index.html";
    });
    return;
  }

  if (file === "login.html") {
    el.innerHTML = `<a class="nav-auth-link" href="register.html">Create account</a>`;
    return;
  }

  if (file === "register.html") {
    el.innerHTML = `<a class="nav-auth-link" href="login.html">Log in</a>`;
    return;
  }

  el.innerHTML = `
    <a class="nav-auth-link" href="login.html">Log in</a>
    <a class="button secondary" href="register.html">Sign up</a>
  `;
}

function handleLoginForm() {
  const form = document.querySelector("#loginForm");
  const message = document.querySelector("#loginMessage");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage(message);
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      showMessage(message, "Please enter your email and password.");
      return;
    }

    const users = loadUsers();
    const user = users.find((entry) => entry.email === email);
    if (!user || user.password !== password) {
      showMessage(message, "That email or password does not match our records.");
      return;
    }

    setSession({ email, name: user.name });
    window.location.href = "index.html";
  });
}

function handleRegisterForm() {
  const form = document.querySelector("#registerForm");
  const message = document.querySelector("#registerMessage");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage(message);
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (!name || !email) {
      showMessage(message, "Please enter your name and email.");
      return;
    }

    if (password.length < 6) {
      showMessage(message, "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      showMessage(message, "Passwords do not match.");
      return;
    }

    const users = loadUsers();
    if (users.some((entry) => entry.email === email)) {
      showMessage(message, "An account with this email already exists. Try logging in.");
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    setSession({ email, name });
    window.location.href = "input.html";
  });
}

function meetsGrade(actual, minimum) {
  return gradePoints[actual] >= gradePoints[minimum];
}

function isPartialGrade(actual, minimum) {
  return gradePoints[actual] + 1 === gradePoints[minimum];
}

function getSuitabilityLevel(score) {
  if (score >= 80) return { text: "Highly Suitable", className: "high" };
  if (score >= 60) return { text: "Suitable", className: "suitable" };
  if (score >= 40) return { text: "Moderately Suitable", className: "moderate" };
  return { text: "Not Recommended", className: "low" };
}

function calculateRecommendations(student, topTypes) {
  return courses
    .map((course) => {
      const requirements = Object.entries(course.requiredSubjects);
      let academicScore = 0;
      const academicReasons = [];

      requirements.forEach(([subject, minimum]) => {
        const actual = resolveStudentGrade(student.grades || {}, subject);
        if (!actual) {
          academicReasons.push(`${subject} was not provided`);
        } else if (meetsGrade(actual, minimum)) {
          academicScore += 50 / requirements.length;
          academicReasons.push(`meets ${subject} minimum grade ${minimum}`);
        } else if (isPartialGrade(actual, minimum)) {
          academicScore += 25 / requirements.length;
          academicReasons.push(`is close to the ${subject} minimum grade ${minimum}`);
        } else {
          academicReasons.push(`does not meet ${subject} minimum grade ${minimum}`);
        }
      });

      let personalityScore = 0;
      const matchedTypes = course.personalityTypes.filter((type) => topTypes.includes(type));
      if (course.personalityTypes.includes(topTypes[0])) {
        personalityScore = 30;
      } else if (matchedTypes.length > 0) {
        personalityScore = 20;
      }

      const score = Math.round(Math.min(100, academicScore + personalityScore));
      const level = getSuitabilityLevel(score);
      const personalityReason = matchedTypes.length
        ? `Your ${matchedTypes.join(", ")} personality type matches this course.`
        : "Your top personality types are not a direct match for this course.";

      return {
        ...course,
        score,
        level,
        reason: `Academic match: you ${academicReasons.join("; ")}. ${personalityReason} ${course.explanation}`
      };
    })
    .sort((a, b) => b.score - a.score);
}

function renderGradeInputs() {
  const gradeGrid = document.querySelector("#spmGradeGrid");
  if (!gradeGrid) return;

  const student = loadData("kmeStudent", { grades: {} });
  const savedGrades = student.grades || {};

  function renderGradeOptions(selectedGrade = "") {
    return gradeSelectOptions.map((option) => (
      `<option value="${escapeHTML(option.value)}" ${option.value === selectedGrade ? "selected" : ""}>${escapeHTML(option.label)}</option>`
    )).join("");
  }

  function renderElectiveSubjectOptions(selectedSubject = "") {
    const groups = electiveGroups.map((group) => `
      <optgroup label="${escapeHTML(group.title)}">
        ${group.options.map((option) => (
          `<option value="${escapeHTML(option.value)}" ${option.value === selectedSubject ? "selected" : ""}>${escapeHTML(option.label)}</option>`
        )).join("")}
      </optgroup>
    `).join("");
    return `<option value="">${escapeHTML("SILA PILIH SUBJEK")}</option>${groups}`;
  }

  function getSavedElectives() {
    return Object.entries(savedGrades)
      .filter(([subject]) => !CORE_KEYS.has(subject))
      .slice(0, 6)
      .map(([subject, grade]) => ({ subject, grade }));
  }

  function renderRows() {
    const savedElectives = getSavedElectives();
    const piGrade = savedGrades["Pendidikan Islam"];
    const pmGrade = savedGrades["Pendidikan Moral"];
    const agamaValue = piGrade ? "Pendidikan Islam" : pmGrade ? "Pendidikan Moral" : "";
    const agamaGrade = piGrade || pmGrade || "";

    gradeGrid.innerHTML = `
      <h3 class="spm-section-title">1. Mata Pelajaran Teras (Wajib)</h3>
      <p class="spm-lead">Semua calon wajib mengambil subjek ini. Pilih gred seperti yang tertera pada keputusan SPM anda.</p>
      ${compulsorySubjects.map((row) => `
        <div class="spm-row universal-row">
          <span>${escapeHTML(row.label)}</span>
          <select class="grade-input" data-subject="${escapeHTML(row.key)}" aria-label="Gred ${escapeHTML(row.label)}">
            ${renderGradeOptions(savedGrades[row.key] || "")}
          </select>
        </div>
      `).join("")}

      <div class="spm-row paired-row agama-row">
        <div class="agama-choice" role="group" aria-labelledby="agama-legend">
          <strong id="agama-legend" class="agama-legend">Pendidikan Islam (pelajar Muslim) / Pendidikan Moral (pelajar bukan Muslim)</strong>
          <label class="agama-option">
            <input type="radio" name="kmeAgamaChoice" value="Pendidikan Islam" ${agamaValue === "Pendidikan Islam" ? "checked" : ""}>
            Pendidikan Islam
          </label>
          <label class="agama-option">
            <input type="radio" name="kmeAgamaChoice" value="Pendidikan Moral" ${agamaValue === "Pendidikan Moral" ? "checked" : ""}>
            Pendidikan Moral
          </label>
        </div>
        <div>
          <label class="agama-grade-label">Gred
            <select class="grade-input" data-agama-grade aria-label="Gred Pendidikan Islam atau Pendidikan Moral">
              ${renderGradeOptions(agamaGrade)}
            </select>
          </label>
        </div>
      </div>

      <h3 class="spm-section-title">2. Mata Pelajaran Elektif</h3>
      <p class="spm-lead">Pilih subjek yang anda ambil pada SPM (contoh mengikut aliran). Kosongkan baris yang tidak berkenaan.</p>
      ${[0, 1, 2, 3, 4, 5].map((index) => `
        <div class="spm-row paired-row">
          <select class="subject-input" data-elective-index="${index}" aria-label="Subjek elektif ${index + 1}">
            ${renderElectiveSubjectOptions(savedElectives[index]?.subject || "")}
          </select>
          <select class="grade-input" data-elective-grade="${index}" aria-label="Gred subjek elektif ${index + 1}">
            ${renderGradeOptions(savedElectives[index]?.grade || "")}
          </select>
        </div>
      `).join("")}
    `;
  }

  const nameInput = document.querySelector("#studentName");
  const emailInput = document.querySelector("#studentEmail");
  const account = getSession();
  if (nameInput) {
    nameInput.value = student.name || "";
    if (!nameInput.value && account?.name) nameInput.value = account.name;
  }
  if (emailInput) {
    emailInput.value = student.email || "";
    if (!emailInput.value && account?.email) emailInput.value = account.email;
  }

  function getSelectedGrades() {
    const selectedGrades = {};

    gradeGrid.querySelectorAll("select[data-subject]").forEach((select) => {
      if (select.value && select.value !== "TIADA") {
        selectedGrades[select.dataset.subject] = select.value;
      }
    });

    const agamaRadio = gradeGrid.querySelector("input[name=\"kmeAgamaChoice\"]:checked");
    const agamaGradeSelect = gradeGrid.querySelector("select[data-agama-grade]");
    if (agamaRadio && agamaGradeSelect?.value && agamaGradeSelect.value !== "TIADA") {
      if (agamaRadio.value === "Pendidikan Islam") {
        selectedGrades["Pendidikan Islam"] = agamaGradeSelect.value;
      } else if (agamaRadio.value === "Pendidikan Moral") {
        selectedGrades["Pendidikan Moral"] = agamaGradeSelect.value;
      }
    }

    const electiveSubjects = [...gradeGrid.querySelectorAll("select[data-elective-index]")];
    electiveSubjects.forEach((subjectSelect) => {
      const index = subjectSelect.dataset.electiveIndex;
      const gradeSelect = gradeGrid.querySelector(`select[data-elective-grade="${index}"]`);
      if (subjectSelect.value && gradeSelect?.value && gradeSelect.value !== "TIADA") {
        selectedGrades[subjectSelect.value] = gradeSelect.value;
      }
    });

    return selectedGrades;
  }

  function hasDuplicateElectives() {
    const selectedSubjects = [...gradeGrid.querySelectorAll("select[data-elective-index]")]
      .map((select) => select.value)
      .filter(Boolean);
    return new Set(selectedSubjects).size !== selectedSubjects.length;
  }

  function hasIncompleteElectives() {
    const electiveSubjects = [...gradeGrid.querySelectorAll("select[data-elective-index]")];
    return electiveSubjects.some((subjectSelect) => {
      const index = subjectSelect.dataset.electiveIndex;
      const gradeSelect = gradeGrid.querySelector(`select[data-elective-grade="${index}"]`);
      const hasSubject = Boolean(subjectSelect.value);
      const hasGrade = Boolean(gradeSelect?.value);
      return hasSubject !== hasGrade && gradeSelect?.value !== "TIADA";
    });
  }

  const form = document.querySelector("#studentForm");
  if (form) {
    form.dataset.dynamicGrades = "true";
    form.getSelectedGrades = getSelectedGrades;
    form.hasDuplicateElectives = hasDuplicateElectives;
    form.hasIncompleteElectives = hasIncompleteElectives;
  }

  renderRows();
}

function handleStudentForm() {
  const form = document.querySelector("#studentForm");
  if (!form) return;
  const message = document.querySelector("#studentMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage(message);
    const formData = new FormData(form);
    const grades = form.getSelectedGrades ? form.getSelectedGrades() : {};

    if (form.hasDuplicateElectives?.()) {
      showMessage(message, "Sila pilih setiap subjek elektif sekali sahaja.");
      return;
    }

    if (form.hasIncompleteElectives?.()) {
      showMessage(message, "Sila lengkapkan subjek dan gred untuk setiap baris elektif yang diisi.");
      return;
    }

    const missingCore = compulsorySubjects
      .filter(({ key }) => !grades[key])
      .map(({ label }) => label);
    if (missingCore.length) {
      showMessage(message, `Sila pilih gred untuk semua mata pelajaran wajib: ${missingCore.join(", ")}.`);
      return;
    }

    const gradeGrid = document.querySelector("#spmGradeGrid");
    const agamaRadio = gradeGrid?.querySelector("input[name=\"kmeAgamaChoice\"]:checked");
    const agamaGradeEl = gradeGrid?.querySelector("select[data-agama-grade]");
    if (!agamaRadio) {
      showMessage(message, "Sila pilih Pendidikan Islam (pelajar Muslim) atau Pendidikan Moral (pelajar bukan Muslim).");
      return;
    }
    if (!agamaGradeEl?.value || agamaGradeEl.value === "TIADA") {
      showMessage(message, "Sila masukkan gred untuk Pendidikan Islam atau Pendidikan Moral.");
      return;
    }

    saveData("kmeStudent", {
      name: formData.get("name"),
      email: formData.get("email"),
      grades
    });

    window.location.href = "personality.html";
  });
}

function renderQuestions() {
  const list = document.querySelector("#questionList");
  if (!list) return;

  const saved = loadData("kmePersonalityAnswers", {});
  list.innerHTML = questions.map((question, index) => {
    const name = `question-${index}`;
    return `
      <article class="question-card">
        <p><span class="question-number">${index + 1}</span>${escapeHTML(question.text)}</p>
        <div class="scale" role="radiogroup" aria-label="${escapeHTML(question.text)}">
          ${[1, 2, 3, 4, 5].map((value) => `
            <label>
              <input type="radio" name="${name}" value="${value}" ${Number(saved[name]) === value ? "checked" : ""} required>
              ${value}
            </label>
          `).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function handlePersonalityForm() {
  const form = document.querySelector("#personalityForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const answers = {};

    questions.forEach((question, index) => {
      const key = `question-${index}`;
      const value = Number(formData.get(key));
      answers[key] = value;
      scores[question.type] += value;
    });

    const topTypes = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => riasecLabels[type]);

    saveData("kmePersonalityAnswers", answers);
    saveData("kmePersonalityResult", { scores, topTypes });
    window.location.href = "result.html";
  });
}

function renderResults() {
  const summary = document.querySelector("#profileSummary");
  const list = document.querySelector("#recommendationList");
  const intro = document.querySelector("#resultIntro");
  if (!summary || !list) return;

  const student = loadData("kmeStudent", null);
  const personality = loadData("kmePersonalityResult", null);

  if (!student || !personality) {
    summary.innerHTML = `
      <div class="empty-state">
        <strong>No profile found yet.</strong>
        <p>Please complete the student input page and personality test first.</p>
      </div>
    `;
    list.innerHTML = "";
    return;
  }

  const recommendations = calculateRecommendations(student, personality.topTypes);
  intro.textContent = `Here are the ranked recommendations for ${student.name}.`;
  summary.innerHTML = `
    <span class="mini-chip">Student snapshot</span>
    <strong>${escapeHTML(student.name)}</strong>
    <p>${escapeHTML(student.email)}</p>
    <p>${Object.keys(student.grades || {}).length} SPM subjects included in this match.</p>
    <div class="pills">
      ${personality.topTypes.map((type) => `<span class="pill">${escapeHTML(type)}</span>`).join("")}
    </div>
  `;

  list.innerHTML = recommendations.map((course, index) => `
    <article class="course-card ${index === 0 ? "top-match" : ""}">
      <div class="course-top">
        <div>
          <h2>${escapeHTML(course.name)}</h2>
          <span class="pill">${escapeHTML(course.field)}</span>
        </div>
        <div class="score">
          <strong>${course.score}%</strong>
          <span class="level ${course.level.className}">${escapeHTML(course.level.text)}</span>
        </div>
      </div>
      <div class="reason-list">
        ${course.reason.split(". ").filter(Boolean).map((reason) => `<span>${escapeHTML(reason.replace(/\.$/, ""))}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

renderNavAuth();
handleLoginForm();
handleRegisterForm();
renderGradeInputs();
handleStudentForm();
renderQuestions();
handlePersonalityForm();
renderResults();
