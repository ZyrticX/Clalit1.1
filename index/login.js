function login() {
    const username = document.getElementById('username').value.toLowerCase();
    const managers = ['arthur', 'gil'];
    const workers = ['evgeniy', 'valery', 'eran'];

    if (username === '') {
        alert('נא להזין שם משתמש');
        return;
    }

    localStorage.setItem('currentUser', username); // שמירת שם המשתמש ב-localStorage

    if (managers.includes(username)) {
        if (username === 'arthur' || username === 'gil') {
            window.location.href = 'loading.html'; // מעבר לדף טעינה לארתור וגיל
        } 
    } else if (workers.includes(username)) {
        window.location.href = 'tasks.html'; // מעבר לדף המשימות עבור מפזרים
    } else {
        alert('שם משתמש לא מוכר');
    }
}

// טעינה אוטומטית כאשר הטופס נטען
document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById('username');
    usernameInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            login(); // התחברות גם כאשר לוחצים על Enter
        }
    });
});
