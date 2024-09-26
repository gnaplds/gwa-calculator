// Initialize grades array with a default subject
let grades = [
    { subject: 'Subject 1', grade: 0, units: 3 }
];

// Function to display subjects in the table
function displayGrades() {
    const gradesBody = document.getElementById('gradesBody');
    gradesBody.innerHTML = '';  // Clear the table before adding new rows

    grades.forEach((grade, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" value="${grade.subject}" oninput="updateSubject(${index}, this.value)" /></td>
            <td><input type="number" value="${grade.grade}" min="0" max="5" step="0.01" oninput="updateGrade(${index}, this.value)" /></td>
            <td><input type="number" value="${grade.units}" min="1" step="1" oninput="updateUnits(${index}, this.value)" /></td>
            <td><button onclick="removeSubject(${index})"><i class="fa-solid fa-trash"></i></button></td>
        `;
        gradesBody.appendChild(row);
    });
}

// Function to update the subject name
function updateSubject(index, value) {
    grades[index].subject = value;
}

// Function to update the grade value
function updateGrade(index, value) {
    grades[index].grade = parseFloat(value);
}

// Function to update the number of units
function updateUnits(index, value) {
    grades[index].units = parseInt(value);
}

// Function to add a new subject
function addSubject() {
    const newSubject = { subject: `Subject ${grades.length + 1}`, grade: 0, units: 3 };
    document.getElementById('error').innerText = "";
    grades.push(newSubject);
    displayGrades();
}

// Function to remove a subject
function removeSubject(index) {
    if (grades.length === 1) {
        document.getElementById('error').innerText = "There should be at least 1 subject";
        return;
    }
    grades.splice(index, 1);
    displayGrades();
}

// Function to calculate the GWA
function calculateGwa() {
    let totalGradePoints = 0;
    let totalUnits = 0;

    grades.forEach(grade => {
        totalGradePoints += grade.grade * grade.units;
        totalUnits += grade.units;
    });

    const gwa = (totalGradePoints / totalUnits).toFixed(2);
    document.getElementById('result').innerText = `Your GWA is: ${gwa}`;
    document.getElementById('error').innerText = "";
}

// Event listeners to add functionality to buttons
document.getElementById('addSubjectBtn').addEventListener('click', addSubject);
document.getElementById('calculateGwaBtn').addEventListener('click', calculateGwa);

// Display initial subjects when the page loads
displayGrades();
