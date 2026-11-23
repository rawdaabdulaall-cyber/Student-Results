class Student {
    #name;
    #subject1;
    #subject2;
    #subject3;
    #attendance;

    constructor(name, subject1, subject2, subject3, attendance) {
        this.name = name;
        this.subject1 = subject1;
        this.subject2 = subject2;
        this.subject3 = subject3;
        this.attendance = attendance;
    }

    set name(value) {
        if (value.trim() === "") {
            throw new Error("Please enter student name");
        }
        this.#name = value.trim();
    }

    set subject1(value) {
        if (value === "" || value === null) {
            throw new Error("Please enter Subject 1 degree");
        }
        if (Number(value) < 0 || Number(value) > 100) {
            throw new Error("Subject 1 must be between 0 and 100");
        }
        this.#subject1 = Number(value);
    }

    set subject2(value) {
        if (value === "" || value === null) {
            throw new Error("Please enter Subject 2 degree");
        }
        if (Number(value) < 0 || Number(value) > 100) {
            throw new Error("Subject 2 must be between 0 and 100");
        }
        this.#subject2 = Number(value);
    }

    set subject3(value) {
        if (value === "" || value === null) {
            throw new Error("Please enter Subject 3 degree");
        }
        if (Number(value) < 0 || Number(value) > 100) {
            throw new Error("Subject 3 must be between 0 and 100");
        }
        this.#subject3 = Number(value);
    }

    set attendance(value) {
        if (value === "" || value === null) {
            throw new Error("Please enter attendance percentage");
        }
        if (Number(value) < 0 || Number(value) > 100) {
            throw new Error("Attendance must be between 0 and 100");
        }
        this.#attendance = Number(value);
    }

    get name() {
        return this.#name;
    }

    get average() {
        return (this.#subject1 + this.#subject2 + this.#subject3) / 3;
    }
}

let studentsList = [];

const studentName = document.getElementById("studentName");
const subject1 = document.getElementById("subject1");
const subject2 = document.getElementById("subject2");
const subject3 = document.getElementById("subject3");
const attendance = document.getElementById("attendance");

const addStudentBtn = document.getElementById("addStudent");
const errorBox = document.getElementById("errorBox");
const studentsBox = document.getElementById("studentsBox");

addStudentBtn.onclick = function () {
    try {
        errorBox.textContent = "";

        const student = new Student(
            studentName.value,
            subject1.value,
            subject2.value,
            subject3.value,
            attendance.value
        );

        studentsList.push(student);

        studentsBox.innerHTML += `<p>${student.name}</p>`;

        studentName.value = "";
        subject1.value = "";
        subject2.value = "";
        subject3.value = "";
        attendance.value = "";

    } catch (error) {
        errorBox.textContent = error.message;
    }
};

const graceBtn = document.getElementById("graceBtn");
const reportBox = document.getElementById("reportBox");

graceBtn.onclick = function () {

    const strugglingStudents = studentsList.filter(function (student) {
        return student.average >= 40 && student.average < 50;
    });

    const newAverages = strugglingStudents.map(function (student) {
        return student.average + 5;
    });

    const total = newAverages.reduce(function (sum, avg) {
        return sum + avg;
    }, 0);

    const generalAverage = strugglingStudents.length > 0
        ? total / strugglingStudents.length
        : 0;

    let reportHTML = `<h4>Grace Committee Report</h4>
    <p>Number of Students: ${strugglingStudents.length}</p>
    <ul>`;

    strugglingStudents.forEach(function (student, index) {
        reportHTML += `<li>${student.name} - New Average: ${newAverages[index].toFixed(2)}</li>`;
    });

    reportHTML += `</ul>
    <p>General Average After Grace: ${generalAverage.toFixed(2)}</p>`;

    reportBox.innerHTML = reportHTML;
};
