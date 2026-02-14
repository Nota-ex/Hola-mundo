document.addEventListener("DOMContentLoaded", loadStudents);

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;

    let students = JSON.parse(localStorage.getItem("students")) || [];

    if (id) {
        students = students.map(student =>
            student.id == id ? { id, name, lastname, email } : student
        );
    } else {
        students.push({
            id: Date.now(),
            name,
            lastname,
            email
        });
    }

    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    loadStudents();
});

function loadStudents() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    studentList.innerHTML = "";

    students.forEach(student => {
        studentList.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.lastname}</td>
                <td>${student.email}</td>
                <td class="actions">
                    <button onclick="editStudent(${student.id})">Editar</button>
                    <button onclick="deleteStudent(${student.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function editStudent(id) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students.find(s => s.id == id);

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("lastname").value = student.lastname;
    document.getElementById("email").value = student.email;
}

function deleteStudent(id) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student.id != id);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}
