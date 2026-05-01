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

const subjects = [
  "Bahasa Melayu",
  "English",
  "Mathematics",
  "Science",
  "Additional Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Accounting / Economy / ICT"
];

const universalSubjectRows = [
  { label: "BAHASA MELAYU", subject: "Bahasa Melayu" },
  { label: "BAHASA INGGERIS", subject: "English" },
  { label: "MATEMATIK", subject: "Mathematics" },
  { label: "SEJARAH", subject: "History" }
];

const electiveSubjectOptions = [
  { label: "SILA PILIH SUBJEK", value: "" },
  ...subjects
    .filter((subject) => !universalSubjectRows.some((row) => row.subject === subject))
    .map((subject) => ({ label: subject.toUpperCase(), value: subject }))
];

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
        const actual = student.grades[subject];
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

  function renderSubjectOptions(selectedSubject = "") {
    return electiveSubjectOptions.map((option) => (
      `<option value="${escapeHTML(option.value)}" ${option.value === selectedSubject ? "selected" : ""}>${escapeHTML(option.label)}</option>`
    )).join("");
  }

  function getSavedElectives() {
    return Object.entries(savedGrades)
      .filter(([subject]) => !universalSubjectRows.some((row) => row.subject === subject))
      .slice(0, 4)
      .map(([subject, grade]) => ({ subject, grade }));
  }

  function renderRows() {
    const savedElectives = getSavedElectives();
    gradeGrid.innerHTML = `
      <h3>Mata Pelajaran Universal</h3>
      ${universalSubjectRows.map((row) => `
        <div class="spm-row universal-row">
          <span>${escapeHTML(row.label)}</span>
          <select class="grade-input" data-subject="${escapeHTML(row.subject)}" aria-label="${escapeHTML(row.label)} grade">
            ${renderGradeOptions(savedGrades[row.subject] || "")}
          </select>
        </div>
      `).join("")}

      <h3>Mata Pelajaran Pakej Terbaik</h3>
      ${[0, 1].map((index) => `
        <div class="spm-row paired-row">
          <select class="subject-input" data-elective-index="${index}" aria-label="Pakej terbaik subject ${index + 1}">
            ${renderSubjectOptions(savedElectives[index]?.subject || "")}
          </select>
          <select class="grade-input" data-elective-grade="${index}" aria-label="Pakej terbaik grade ${index + 1}">
            ${renderGradeOptions(savedElectives[index]?.grade || "")}
          </select>
        </div>
      `).join("")}

      <h3>Mata Pelajaran Terbaik (Selain Mata Pelajaran Di Atas)</h3>
      ${[2, 3].map((index) => `
        <div class="spm-row paired-row">
          <select class="subject-input" data-elective-index="${index}" aria-label="Subjek terbaik lain ${index - 1}">
            ${renderSubjectOptions(savedElectives[index]?.subject || "")}
          </select>
          <select class="grade-input" data-elective-grade="${index}" aria-label="Gred subjek terbaik lain ${index - 1}">
            ${renderGradeOptions(savedElectives[index]?.grade || "")}
          </select>
        </div>
      `).join("")}
    `;
  }

  const nameInput = document.querySelector("#studentName");
  const emailInput = document.querySelector("#studentEmail");
  if (nameInput) nameInput.value = student.name || "";
  if (emailInput) emailInput.value = student.email || "";

  function getSelectedGrades() {
    const selectedGrades = {};

    gradeGrid.querySelectorAll("select[data-subject]").forEach((select) => {
      if (select.value && select.value !== "TIADA") {
        selectedGrades[select.dataset.subject] = select.value;
      }
    });

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

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const grades = form.getSelectedGrades ? form.getSelectedGrades() : {};

    if (form.hasDuplicateElectives?.()) {
      alert("Please choose each elective subject once only.");
      return;
    }

    if (form.hasIncompleteElectives?.()) {
      alert("Please complete both subject and grade for each elective row.");
      return;
    }

    if (Object.keys(grades).length === 0) {
      alert("Please add at least one SPM subject before continuing.");
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
        <p>${index + 1}. ${question.text}</p>
        <div class="scale" role="radiogroup" aria-label="${question.text}">
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
    summary.innerHTML = `<div class="empty-state">Please complete the student input page and personality test first.</div>`;
    list.innerHTML = "";
    return;
  }

  const recommendations = calculateRecommendations(student, personality.topTypes);
  intro.textContent = `Here are the ranked recommendations for ${student.name}.`;
  summary.innerHTML = `
    <strong>${student.name}</strong>
    <p>${student.email}</p>
    <div class="pills">
      ${personality.topTypes.map((type) => `<span class="pill">${type}</span>`).join("")}
    </div>
  `;

  list.innerHTML = recommendations.map((course) => `
    <article class="course-card">
      <div class="course-top">
        <div>
          <h2>${course.name}</h2>
          <span class="pill">${course.field}</span>
        </div>
        <div class="score">
          <strong>${course.score}%</strong>
          <span class="level ${course.level.className}">${course.level.text}</span>
        </div>
      </div>
      <p>${course.reason}</p>
    </article>
  `).join("");
}

function renderAdmin() {
  const count = document.querySelector("#courseCount");
  const table = document.querySelector("#adminCourseTable");
  if (!table) return;

  if (count) count.textContent = courses.length;
  table.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Course</th>
          <th>Field</th>
          <th>Requirements</th>
          <th>RIASEC Types</th>
        </tr>
      </thead>
      <tbody>
        ${courses.map((course) => `
          <tr>
            <td><strong>${course.name}</strong></td>
            <td>${course.field}</td>
            <td>${Object.entries(course.requiredSubjects).map(([subject, grade]) => `${subject}: ${grade}`).join("<br>")}</td>
            <td>${course.personalityTypes.join(", ")}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

renderGradeInputs();
handleStudentForm();
renderQuestions();
handlePersonalityForm();
renderResults();
renderAdmin();
