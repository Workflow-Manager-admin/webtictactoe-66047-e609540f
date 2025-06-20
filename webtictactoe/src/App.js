import React, { useState } from "react";
import "./App.css";

/** PUBLIC_INTERFACE
 * Personal Info Form Component
 */
function PersonalInfoForm({ personalInfo, onChange }) {
  return (
    <section className="rb-section">
      <h2 className="rb-section-title">Personal Information</h2>
      <div className="rb-form-row">
        <label>Name</label>
        <input
          type="text"
          value={personalInfo.name}
          onChange={e => onChange({ ...personalInfo, name: e.target.value })}
          placeholder="Full Name"
        />
      </div>
      <div className="rb-form-row">
        <label>Email</label>
        <input
          type="email"
          value={personalInfo.email}
          onChange={e => onChange({ ...personalInfo, email: e.target.value })}
          placeholder="Email"
        />
      </div>
      <div className="rb-form-row">
        <label>Phone</label>
        <input
          type="tel"
          value={personalInfo.phone}
          onChange={e => onChange({ ...personalInfo, phone: e.target.value })}
          placeholder="Phone Number"
        />
      </div>
      <div className="rb-form-row">
        <label>Location</label>
        <input
          type="text"
          value={personalInfo.location}
          onChange={e => onChange({ ...personalInfo, location: e.target.value })}
          placeholder="City, Country"
        />
      </div>
    </section>
  );
}

/** PUBLIC_INTERFACE
 * Education Form Component
 */
function EducationForm({ educationList, onChange }) {
  // Handler to update a single education entry
  const updateEducation = (idx, field, value) => {
    const updated = educationList.map((edu, i) =>
      i === idx ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  const addEducation = () =>
    onChange([
      ...educationList,
      { school: "", degree: "", start: "", end: "" }
    ]);

  const removeEducation = idx =>
    onChange(educationList.filter((_, i) => i !== idx));

  return (
    <section className="rb-section">
      <h2 className="rb-section-title">Education</h2>
      {educationList.map((edu, idx) => (
        <div className="rb-edu-exp-block" key={idx}>
          <div className="rb-form-row">
            <label>School</label>
            <input
              type="text"
              value={edu.school}
              onChange={e => updateEducation(idx, "school", e.target.value)}
              placeholder="Institution Name"
            />
          </div>
          <div className="rb-form-row">
            <label>Degree</label>
            <input
              type="text"
              value={edu.degree}
              onChange={e => updateEducation(idx, "degree", e.target.value)}
              placeholder="Degree or Field"
            />
          </div>
          <div className="rb-form-2col">
            <div>
              <label>Start</label>
              <input
                type="text"
                value={edu.start}
                onChange={e => updateEducation(idx, "start", e.target.value)}
                placeholder="Start (e.g. 2021)"
              />
            </div>
            <div>
              <label>End</label>
              <input
                type="text"
                value={edu.end}
                onChange={e => updateEducation(idx, "end", e.target.value)}
                placeholder="End or 'Present'"
              />
            </div>
          </div>
          <button
            className="rb-btn rb-btn-small rb-btn-remove"
            onClick={() => removeEducation(idx)}
            type="button"
            disabled={educationList.length === 1}
            aria-label="Remove education"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="rb-btn rb-btn-add"
        onClick={addEducation}
        type="button"
        aria-label="Add education"
      >
        + Add Education
      </button>
    </section>
  );
}

/** PUBLIC_INTERFACE
 * Experience Form Component
 */
function ExperienceForm({ experienceList, onChange }) {
  // Handler to update a single experience entry
  const updateExperience = (idx, field, value) => {
    const updated = experienceList.map((exp, i) =>
      i === idx ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const addExperience = () =>
    onChange([
      ...experienceList,
      { company: "", role: "", start: "", end: "", description: "" }
    ]);

  const removeExperience = idx =>
    onChange(experienceList.filter((_, i) => i !== idx));

  return (
    <section className="rb-section">
      <h2 className="rb-section-title">Experience</h2>
      {experienceList.map((exp, idx) => (
        <div className="rb-edu-exp-block" key={idx}>
          <div className="rb-form-row">
            <label>Company</label>
            <input
              type="text"
              value={exp.company}
              onChange={e => updateExperience(idx, "company", e.target.value)}
              placeholder="Company Name"
            />
          </div>
          <div className="rb-form-row">
            <label>Role</label>
            <input
              type="text"
              value={exp.role}
              onChange={e => updateExperience(idx, "role", e.target.value)}
              placeholder="Job Title"
            />
          </div>
          <div className="rb-form-2col">
            <div>
              <label>Start</label>
              <input
                type="text"
                value={exp.start}
                onChange={e => updateExperience(idx, "start", e.target.value)}
                placeholder="Start (e.g. 2021)"
              />
            </div>
            <div>
              <label>End</label>
              <input
                type="text"
                value={exp.end}
                onChange={e => updateExperience(idx, "end", e.target.value)}
                placeholder="End or 'Present'"
              />
            </div>
          </div>
          <div className="rb-form-row">
            <label>Description</label>
            <textarea
              value={exp.description}
              onChange={e => updateExperience(idx, "description", e.target.value)}
              placeholder="Describe your responsibilities, achievements, etc."
              rows={2}
              maxLength={300}
            />
          </div>
          <button
            className="rb-btn rb-btn-small rb-btn-remove"
            onClick={() => removeExperience(idx)}
            type="button"
            disabled={experienceList.length === 1}
            aria-label="Remove experience"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="rb-btn rb-btn-add"
        onClick={addExperience}
        type="button"
        aria-label="Add experience"
      >
        + Add Experience
      </button>
    </section>
  );
}

/** PUBLIC_INTERFACE
 * Skills Form Component
 */
function SkillsForm({ skills, onChange }) {
  const [input, setInput] = useState("");
  const addSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      onChange([...skills, input.trim()]);
      setInput("");
    }
  };

  const removeSkill = idx => {
    onChange(skills.filter((_, i) => i !== idx));
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <section className="rb-section">
      <h2 className="rb-section-title">Skills</h2>
      <div className="rb-form-skill-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a skill and press Enter"
          onKeyDown={handleKeyDown}
        />
        <button
          className="rb-btn rb-btn-add-skill"
          onClick={addSkill}
          type="button"
          aria-label="Add skill"
        >
          Add
        </button>
      </div>
      <div className="rb-skill-list">
        {skills.map((skill, idx) => (
          <span className="rb-skill-item" key={idx}>
            {skill}
            <button
              type="button"
              className="rb-skill-remove"
              aria-label="remove-skill"
              onClick={() => removeSkill(idx)}
              title="Remove"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </section>
  );
}

/** PUBLIC_INTERFACE
 * Resume Preview Component
 */
function ResumePreview({ personalInfo, educationList, experienceList, skills }) {
  return (
    <div className="rb-resume-preview">
      <header className="rb-preview-header">
        <h1>{personalInfo.name || "Your Name"}</h1>
        <div className="rb-preview-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>
      {educationList.length > 0 && educationList[0].school && (
        <section>
          <h3>Education</h3>
          <ul className="rb-preview-section-list">
            {educationList.map((edu, idx) =>
              edu.school ? (
                <li key={idx}>
                  <span className="rb-preview-main">{edu.degree}</span>
                  <span className="rb-preview-sec"> at {edu.school}</span>
                  {edu.start || edu.end ? (
                    <span className="rb-preview-dates">
                      {" "}
                      | {edu.start} - {edu.end}
                    </span>
                  ) : null}
                </li>
              ) : null
            )}
          </ul>
        </section>
      )}
      {experienceList.length > 0 && experienceList[0].company && (
        <section>
          <h3>Experience</h3>
          <ul className="rb-preview-section-list">
            {experienceList.map((exp, idx) =>
              exp.company ? (
                <li key={idx}>
                  <span className="rb-preview-main">{exp.role}</span>
                  <span className="rb-preview-sec"> at {exp.company}</span>
                  {exp.start || exp.end ? (
                    <span className="rb-preview-dates">
                      {" "}
                      | {exp.start} - {exp.end}
                    </span>
                  ) : null}
                  {exp.description && (
                    <div className="rb-preview-desc">{exp.description}</div>
                  )}
                </li>
              ) : null
            )}
          </ul>
        </section>
      )}
      {skills.length > 0 && (
        <section>
          <h3>Skills</h3>
          <div className="rb-preview-skills">
            {skills.map((skill, idx) => (
              <span key={idx}>{skill}</span>
            ))}
          </div>
        </section>
      )}
      {!personalInfo.name &&
        !educationList[0].school &&
        !experienceList[0].company &&
        skills.length < 1 && (
          <div className="rb-preview-placeholder">
            Your live resume preview will appear here.
          </div>
        )}
    </div>
  );
}

/** PUBLIC_INTERFACE
 * Main App component for Resume Builder application.
 */
function App() {
  // Application-level state for all sections
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });
  const [educationList, setEducationList] = useState([
    { school: "", degree: "", start: "", end: "" }
  ]);
  const [experienceList, setExperienceList] = useState([
    { company: "", role: "", start: "", end: "", description: "" }
  ]);
  const [skills, setSkills] = useState([]);

  return (
    <div className="resume-builder-app">
      <header className="rb-header">
        <h1>Resume Builder</h1>
        <p className="rb-subtitle">
          Start creating your professional resume with our easy-to-use builder.
        </p>
      </header>
      <main className="rb-content-grid">
        <div className="rb-inputs-pane" aria-label="Resume Input Forms">
          <PersonalInfoForm
            personalInfo={personalInfo}
            onChange={setPersonalInfo}
          />
          <EducationForm
            educationList={educationList}
            onChange={setEducationList}
          />
          <ExperienceForm
            experienceList={experienceList}
            onChange={setExperienceList}
          />
          <SkillsForm skills={skills} onChange={setSkills} />
        </div>
        <div className="rb-preview-pane" aria-label="Resume Preview">
          <ResumePreview
            personalInfo={personalInfo}
            educationList={educationList}
            experienceList={experienceList}
            skills={skills}
          />
        </div>
      </main>
      <footer className="rb-footer">
        <span>
          Resume Builder • <a href="https://kavia.ai" target="_blank" rel="noopener noreferrer">KAVIA AI</a>
        </span>
      </footer>
    </div>
  );
}

export default App;
