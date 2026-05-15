const apiUrl = "https://student-management-backend-alfd.onrender.com/api/Student";

let studentsData = [];

async function loadStudents() {

    const response = await fetch(apiUrl);

    const students = await response.json();

    studentsData = students;

    displayStudents(students);
}

function displayStudents(students) {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>

                <td>

                    <button onclick="editStudent(${student.id},
                                                  '${student.name}',
                                                  '${student.email}',
                                                  '${student.course}')">
                        Edit
                    </button>

                    <button onclick="deleteStudent(${student.id})">
                        Delete
                    </button>

                </td>
            </tr>
        `;
    });
}

async function saveStudent() {

    const id = document.getElementById("studentId").value;

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const course = document.getElementById("course").value;

    // Empty validation
    if(name === "" || email === "" || course === "") {

        alert("Please fill all fields");

        return;
    }

    // Email validation
    const emailPattern =
        /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.match(emailPattern)) {

        alert("Enter valid email");

        return;
    }

    const student = {

        name,
        email,
        course
    };

    if(id === "") {

        await fetch(apiUrl, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        });

        alert("Student Added Successfully");

    } else {

        await fetch(`${apiUrl}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        });

        alert("Student Updated Successfully");
    }

    clearForm();

    loadStudents();
}

function editStudent(id, name, email, course) {

    document.getElementById("studentId").value = id;

    document.getElementById("name").value = name;

    document.getElementById("email").value = email;

    document.getElementById("course").value = course;
}

async function deleteStudent(id) {

    const confirmDelete =
        confirm("Are you sure to delete?");

    if(!confirmDelete) {

        return;
    }

    await fetch(`${apiUrl}/${id}`, {

        method: "DELETE"
    });

    alert("Student Deleted");

    loadStudents();
}

function clearForm() {

    document.getElementById("studentId").value = "";

    document.getElementById("name").value = "";

    document.getElementById("email").value = "";

    document.getElementById("course").value = "";
}

function searchStudent() {

    const search = document.getElementById("search")
                           .value
                           .toLowerCase();

    const filtered = studentsData.filter(student =>
        student.name.toLowerCase().includes(search)
    );

    displayStudents(filtered);
}

loadStudents();