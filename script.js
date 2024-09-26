// Initialize grades array with a default subject
let grades = JSON.parse(localStorage.getItem('grades')) || [
    { subject: 'Subject 1', grade: 0, units: 3 }
];

// Function to save the grades data to localStorage
function saveGrades() {
    localStorage.setItem('grades', JSON.stringify(grades));
}

// Function to display subjects in the table
function displayGrades() {
    const gradesBody = document.getElementById('gradesBody');
    gradesBody.innerHTML = '';  // Clear the table first

    grades.forEach((grade, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><input type="text" value="${grade.subject}" onchange="updateSubject(${index}, this.value)" /></td>
            <td><input type="number" value="${grade.grade}" min="0" max="5" step="0.01" onchange="updateGrade(${index}, this.value)" /></td>
            <td><input type="number" value="${grade.units}" min="1" step="1" onchange="updateUnits(${index}, this.value)" /></td>
            <td><button onclick="removeSubject(${index})"><i class="fas fa-trash"></i></button></td>
        `;

        gradesBody.appendChild(row);
    });

    saveGrades();  // Save to localStorage after displaying
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

    // Check for dean's lister status and trigger confetti
    if (gwa >= 3.50 && gwa <= 4.00) {
        document.getElementById('result').innerText += " - First Dean's Lister!";
        launchConfetti('gold'); // Gold confetti for first dean's lister
    } else if (gwa >= 3.25 && gwa < 3.50) {
        document.getElementById('result').innerText += " - Second Dean's Lister!";
        launchConfetti('silver'); // Silver confetti for second dean's lister
    }
}

// Function to launch confetti
function launchConfetti(color) {
    const confettiSettings = {
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [color === 'gold' ? '#FFD700' : '#C0C0C0'], // Gold or Silver colors
    };
    confetti(confettiSettings);
}


// Event listeners to add functionality to buttons
document.getElementById('addSubjectBtn').addEventListener('click', addSubject);
document.getElementById('calculateGwaBtn').addEventListener('click', calculateGwa);

// Display initial subjects when the page loads
displayGrades();
