// Initialize grades array from localStorage or use default if empty
let grades = JSON.parse(localStorage.getItem('grades')) || [
    { subject: 'Subject 1', grade: 0, units: 3 }
];

// Save grades to localStorage
function saveGrades() {
    localStorage.setItem('grades', JSON.stringify(grades));
}

// Display grades in the table
function displayGrades() {
    const gradesBody = document.getElementById('gradesBody');
    gradesBody.innerHTML = '';  // Clear the table first

    grades.forEach((grade, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" value="${grade.subject}" onchange="updateSubject(${index}, this.value)" /></td>
            <td><input type="number" value="${grade.grade}" min="0" max="5" step="0.01" onchange="updateGrade(${index}, this.value)" inputmode="decimal" /></td>
            <td><input type="number" value="${grade.units}" min="1" step="1" onchange="updateUnits(${index}, this.value)" inputmode="numeric" /></td>
            <td><button onclick="removeSubject(${index})"><i class="fas fa-trash"></i></button></td>
        `;
        gradesBody.appendChild(row);
    });
    saveGrades();
}

// Update subject name
function updateSubject(index, value) {
    grades[index].subject = value;
    saveGrades();
}

// Update grade value
function updateGrade(index, value) {
    grades[index].grade = parseFloat(value);
    saveGrades();
}

// Update number of units
function updateUnits(index, value) {
    grades[index].units = parseInt(value);
    saveGrades();
}

// Add a new subject
function addSubject() {
    const newSubject = { subject: `Subject ${grades.length + 1}`, grade: 0.0, units: 3 };
    document.getElementById('error').innerText = "";
    grades.push(newSubject);
    displayGrades();
}

// Remove a subject
function removeSubject(index) {
    if (grades.length === 1) {
        document.getElementById('error').innerText = "There should be at least 1 subject";
        return;
    }
    grades.splice(index, 1);
    displayGrades();
}

// Calculate GWA and display result
function calculateGwa() {
    let totalGradePoints = 0;
    let totalUnits = 0;
    let hasBelowTwo = false;

    grades.forEach(grade => {
        totalGradePoints += grade.grade * grade.units;
        totalUnits += grade.units;

        if (grade.grade < 2.5) {
            hasBelowTwo = true;
        }
    });

    const gwa = (totalGradePoints / totalUnits).toFixed(2);
    let resultText = `Your GWA is: ${gwa}`;

    // Check for grades below 2.0
    if (hasBelowTwo) {
        resultText += " - You cannot be a Dean's Lister due to having grades below 2.5.";
    } else {
        // Dean's Lister checks
        if (gwa >= 3.50 && gwa <= 4.00) {
            resultText += " - First Dean's Lister!";
            launchConfetti('gold');
        } else if (gwa >= 3.25 && gwa < 3.50) {
            resultText += " - Second Dean's Lister!";
            launchConfetti('silver');
        }
    }

    document.getElementById('result').innerText = resultText;
}

// Launch confetti effect
function launchConfetti(color) {
    const confettiSettings = {
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [color === 'gold' ? '#FFD700' : '#C0C0C0'], // Gold or Silver colors
    };
    confetti(confettiSettings);
}

// Add event listeners
document.getElementById('addSubjectBtn').addEventListener('click', addSubject);
document.getElementById('calculateGwaBtn').addEventListener('click', calculateGwa);

// Initialize the display
displayGrades();
