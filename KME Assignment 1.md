\# Prototype Specification    
\#\# Knowledge-Based Course Recommendation System for SPM Graduates

\#\# 1\. Project Goal

Build a simple web-based prototype for a \*\*Knowledge-Based Course Recommendation System for SPM Graduates\*\*.

The system recommends suitable university courses based on:

1\. Student SPM results    
2\. RIASEC personality test result    
3\. Rule-based reasoning using a Knowledge Base and Inference Engine

The prototype should demonstrate Knowledge Management concepts:  
\- Knowledge acquisition  
\- Knowledge organization  
\- Knowledge representation  
\- Knowledge application

\---

\#\# 2\. Target Users

\#\#\# Main User  
SPM graduates / secondary school students who want course recommendations.

\#\#\# Admin / Knowledge Engineer  
A simple admin role that manages:  
\- Course data  
\- Course entry requirements  
\- Personality-course mapping rules

\---

\#\# 3\. Main Features

\#\#\# 3.1 Student Input Module  
Students should be able to enter:

\- Name  
\- Email  
\- SPM subject grades:  
  \- Bahasa Melayu  
  \- English  
  \- Mathematics  
  \- Science  
  \- Additional Mathematics  
  \- Physics  
  \- Chemistry  
  \- Biology  
  \- History  
  \- Accounting / Economy / ICT optional subjects

Grades can be selected using dropdown:  
\`A+\`, \`A\`, \`A-\`, \`B+\`, \`B\`, \`C+\`, \`C\`, \`D\`, \`E\`, \`G\`

\---

\#\#\# 3.2 RIASEC Personality Test Module

The system should include a simple personality test based on Holland RIASEC theory.

Personality categories:  
\- R \= Realistic  
\- I \= Investigative  
\- A \= Artistic  
\- S \= Social  
\- E \= Enterprising  
\- C \= Conventional

Use around 18 sample questions, 3 questions for each personality type.

Example:

\- Realistic: "I enjoy working with tools or machines."  
\- Investigative: "I like solving problems and analyzing information."  
\- Artistic: "I enjoy designing, drawing, or creating content."  
\- Social: "I like helping and teaching others."  
\- Enterprising: "I enjoy leading people or starting business ideas."  
\- Conventional: "I like organizing data, records, or documents."

Answer format:  
\- Yes / No  
or  
\- 1 to 5 Likert scale

The system should calculate the top 3 personality types.

Example output:  
\`Top personality types: Investigative, Conventional, Enterprising\`

\---

\#\# 4\. Knowledge Base

Create a knowledge base that stores:

\#\#\# 4.1 Course Information  
Each course should have:

\- Course name  
\- Field/category  
\- Required SPM subjects  
\- Minimum grades  
\- Suitable RIASEC personality types  
\- Short explanation

Example courses:

1\. Diploma in Information Technology  
2\. Diploma in Computer Science  
3\. Diploma in Accounting  
4\. Diploma in Business Management  
5\. Diploma in Engineering  
6\. Diploma in Graphic Design / Multimedia  
7\. Diploma in Education  
8\. Diploma in Science  
9\. Foundation in Computing  
10\. Foundation in Business

\---

\#\#\# 4.2 Example Course Rules

Use IF–THEN rule logic.

Example:

IF Mathematics grade is C or above    
AND personality includes Investigative    
THEN recommend Diploma in Information Technology

IF Accounting grade is C or above    
AND personality includes Conventional    
THEN recommend Diploma in Accounting

IF Science grade is C or above    
AND personality includes Investigative    
THEN recommend Diploma in Science

IF personality includes Artistic    
THEN recommend Multimedia / Graphic Design related courses

IF personality includes Social    
THEN recommend Education or Communication related courses

IF personality includes Enterprising    
THEN recommend Business Management related courses

\---

\#\# 5\. Inference Engine

The inference engine should:

1\. Read student SPM results  
2\. Read top 3 RIASEC personality types  
3\. Compare student profile with course rules  
4\. Calculate suitability score  
5\. Rank recommended courses  
6\. Display explanation

\---

\#\# 6\. Recommendation Scoring

Use a simple scoring system.

\#\#\# Academic Match  
\- If student meets required subject grade: \+50 points  
\- If student partially meets requirement: \+25 points  
\- If student fails required subject: 0 points

\#\#\# Personality Match  
\- If course matches top personality type: \+30 points  
\- If course matches second or third personality type: \+20 points  
\- No match: 0 points

\#\#\# Final Suitability Level  
\- 80–100: Highly Suitable  
\- 60–79: Suitable  
\- 40–59: Moderately Suitable  
\- Below 40: Not Recommended

\---

\#\# 7\. Recommendation Output

The system should display:

\- Recommended course name  
\- Suitability score  
\- Suitability level  
\- Reason / explanation

Example:

Course: Diploma in Information Technology    
Suitability: 85%    
Level: Highly Suitable    
Reason: You meet the Mathematics requirement and your Investigative personality matches problem-solving and analytical courses.

\---

\#\# 8\. Pages / Screens

Build these pages:

\#\#\# Student Side  
1\. Home Page  
   \- Brief system introduction  
   \- Start recommendation button

2\. Student Profile Page  
   \- Name and basic details

3\. SPM Result Input Page  
   \- Subject and grade selection

4\. Personality Test Page  
   \- RIASEC questions

5\. Recommendation Result Page  
   \- Course list  
   \- Suitability score  
   \- Explanation

\---

\#\#\# Admin Side  
1\. Admin Dashboard  
2\. Manage Courses  
3\. Manage Course Requirements  
4\. Manage RIASEC Mapping Rules

Admin can be simple. CRUD is optional for prototype. Static data is acceptable if time is limited.

\---

\#\# 9\. Suggested Tech Stack

Use one of these:

\#\#\# Option A: Simple Web Prototype  
\- HTML  
\- CSS  
\- JavaScript  
\- LocalStorage or JSON file

\#\#\# Option B: Python Web App  
\- Flask  
\- SQLite  
\- HTML templates

Recommended for fastest prototype:  
\*\*HTML \+ CSS \+ JavaScript only\*\*

\---

\#\# 10\. Data Storage

For simple prototype:

Use JavaScript arrays / JSON objects.

Example:

\`\`\`js  
const courses \= \[  
  {  
    name: "Diploma in Information Technology",  
    requiredSubjects: {  
      Mathematics: "C",  
      English: "C"  
    },  
    personalityTypes: \["Investigative", "Conventional", "Realistic"\],  
    explanation: "Suitable for students who enjoy problem-solving, technology, and logical thinking."  
  }  
\];  
