document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user');

    const loadingMessage = document.getElementById('loadingMessage');

    // ברוכים הבאים אישי בהתאם לשם המשתמש
    if (username === 'arthur') {
        loadingMessage.textContent = 'שבוע טוב ארתור! כאן תוכל לעקוב אחרי התקדמות הפיזורים במחלקות';
    } else if (username === 'gil') {
        loadingMessage.textContent = 'יום טוב גיל! כאן תוכל לעקוב אחרי התקדמות הצוות במחלקות';
    }

    // הצגת מסך טעינה למשך 5 שניות
    setTimeout(() => {
        window.location.href = 'tasks.html'; // מעבר לדף המשימות אחרי הטעינה
    }, 5000); // 5000ms = 5 שניות
});
