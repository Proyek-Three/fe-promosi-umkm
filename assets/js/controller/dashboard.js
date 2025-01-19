import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import {addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");


document.addEventListener('DOMContentLoaded', async () => {
   
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const token = getCookie('token');
console.log(token);

if (!token) {
  Swal.fire({
    icon: "warning",
    title: "Can't Access Dashboard",
    text: "You need to login before accessing dashboard!",
    timer: 2000,
    customClass: {
      container: 'backdrop-blur-md',
    },
    showConfirmButton: false
  });
  setTimeout(() => {
    window.location.href = '../auth/login.html';
  }, 2000);
}
    try {
        const response = await fetch('https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();

        if (response.status === 200) {
            if (!localStorage.getItem('alertShown')) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    backdrop: false,
                    customClass: {
                        container: 'no-blur-container',
                    },
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Anda telah masuk",
                    text: data.message + " dengan ID Admin: " + data.admin_id,
                });
                localStorage.setItem('alertShown', 'true');
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Access Restricted",
                text: data.message,
                timer: 2000,
                backdrop: true,
                customClass: {
                    container: 'backdrop-blur-md',
                },
                showConfirmButton: false
            });
            setTimeout(() => {
                window.location.href = '../auth/admin/login.html';
            }, 2000);
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Access Restricted",
            text: data.message,
            timer: 2000,
            backdrop: true,
            customClass: {
                container: 'backdrop-blur-md',
            },
            showConfirmButton: false
        });
        setTimeout(() => {
            window.location.href = '../auth/admin/login.html';
        }, 2000);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('cancelToast') === 'true') {

      localStorage.removeItem('cancelToast');
  
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
  
      Toast.fire({
        icon: "info",
        title: "You canceled the action."
      });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('updateToast') === 'true') {

      localStorage.removeItem('updateToast');
  
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
  
      Toast.fire({
        icon: "info",
        title: "Successfuly update the data."
      });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('submitToast') === 'true') {

      localStorage.removeItem('submitToast');
  
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
  
      Toast.fire({
        icon: "info",
        title: "Successfuly submit the data."
      });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('deleteToast') === 'true') {

      localStorage.removeItem('deleteToast');
  
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
  
      Toast.fire({
        icon: "info",
        title: "Successfuly delete the data."
      });
    }
});