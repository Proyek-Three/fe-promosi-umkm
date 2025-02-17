import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

async function login(username, password) {
    try {
        const response = await fetch('https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ User_name: username, Password: password })
        });

        const data = await response.json();

        if (response.status === 200) {
            localStorage.setItem('token', data.token);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You will be directed to dashboard",
                timer: 2000,
                showConfirmButton: false
              });
              setTimeout(() => {
                window.location.href = '../../Admin/dashboardadmin.html';
              }, 2000);
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Username atau password salah!",
                
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: "warning",
            title: "Login Failed",
            text: console.error(error)
        });
    }
}


document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});