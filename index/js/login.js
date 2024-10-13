function login() {
    const username = document.getElementById('username').value.toLowerCase();
    const managers = ['גיל', 'gil', 'ארתור', 'arthur'];  // מנהלים: גיל וארתור
    const workers = ['יבגני', 'evgeniy', 'ערן', 'eran', 'ולרי', 'valery'];  // מפזרים: יבגני, ערן, ולרי

    if (username === '') {
        alert('נא להזין שם משתמש');
        return;
    }

    // הצגת הודעת טעינה
    document.getElementById('loadingMessage').style.display = 'block';

    // שמירת שם המשתמש ב-localStorage
    localStorage.setItem('currentUser', username);

    // עיבוד נתוני ההתחברות
    setTimeout(() => {
        if (managers.includes(username)) {
            // אם זה ארתור או גיל - הצגת מסך טעינה מותאם אישית
            if (username === 'ארתור' || username === 'arthur') {
                window.location.href = 'loading.html?user=arthur';
            } else if (username === 'גיל' || username === 'gil') {
                window.location.href = 'loading.html?user=gil';
            }
        } else if (workers.includes(username)) {
            // מפזרים עוברים ישירות לדף המשימות
            window.location.href = 'tasks.html';
        } else {
            document.getElementById('loadingMessage').style.display = 'none'; // הסתרת הודעת טעינה אם השם לא מוכר
            alert('שם משתמש לא מוכר');
        }
    }, 500); // הוספת השהיה קצרה ליצירת תחושת תגובה
}
