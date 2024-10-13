function login() {
    const username = document.getElementById('username').value.toLowerCase();
    const managers = ['gil', 'arthur'];  // מנהלים: גיל וארתור
    const workers = ['evgeniy', 'eran', 'valery'];  // מפזרים: יבגני, ערן, ולרי
    
    if (username === '') {
        alert('נא להזין שם משתמש');
        return;
    }
    
    // שמירת שם המשתמש ב-localStorage
    localStorage.setItem('currentUser', username);
    
    if (managers.includes(username)) {
        // אם זה ארתור או גיל - הצגת מסך טעינה מותאם אישית
        if (username === 'arthur') {
            window.location.href = 'loading.html?user=arthur';
        } else if (username === 'gil') {
            window.location.href = 'loading.html?user=gil';
        }
    } else if (workers.includes(username)) {
        // מפזרים עוברים ישירות לדף המשימות
        window.location.href = 'tasks.html';
    } else {
        alert('שם משתמש לא מוכר');
    }
}
