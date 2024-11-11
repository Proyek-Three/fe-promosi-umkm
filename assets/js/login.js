var admin = [
    {
        id: "1",
        name: "ghaida",
        email: "ghaida123@gmail.com",
        password: "umkm123"
    },

    {
        id: "2",
        name: "Dzulkifli",
        email: "dzulkiflifaiz11@gmail.com",
        password: "ganteng"
    }
];

function getLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!email || !password) {
        console.log("There's still blank form.");
        alert("Harap isi semua bidang!");
        return;
    }

    var loginSuccess = false;
    for (var i = 0; i < admin.length; i++) {
        if (email === admin[i].email && password === admin[i].password) {
            console.log("Admin login berhasil.");
            loginSuccess = true;
            break;
        }
    }
    if (loginSuccess) {
        alert("Selamat datang di Admin Jul Gadget!");
        window.location.href = "dashboard.html";
    } else {
        console.log("Incorrect email or password");
        alert("Email atau password salah");
    }
}