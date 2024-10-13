// קבלת שם המשתמש מה-URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('user');

// הצגת ברכה עם שם המשתמש
document.getElementById('userGreeting').textContent = `שלום, ${username}`;

// בדיקת אם המשתמש הוא מנהל (גיל או ארתור) או עובד רגיל
const managers = ['gil', 'arthur'];
const workers = ['evgeniy', 'eran', 'valery'];
const isManager = managers.includes(username);

// עדכון תאריך ושעה בדף
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const currentDate = now.toLocaleDateString('he-IL', options);
const currentTime = now.toLocaleTimeString('he-IL');
document.getElementById('currentDateTime').textContent = `תאריך: ${currentDate}, שעה: ${currentTime}`;

// השבתת עריכת משימות למנהלים
if (isManager) {
    disableTaskEditing();
}

// פונקציה להשבתת עריכה למנהלים
function disableTaskEditing() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.disabled = true;
    });
    document.querySelectorAll('.mark-done-btn').forEach(button => {
        button.style.display = 'none';
    });
}

// הוספת מאזין אירועים לטופס שמירת המשימות
document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!isManager) {
        updateTaskStatus();
    }
});

// פונקציה לעדכון סטטוס המשימות
function updateTaskStatus() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        const taskRow = checkbox.closest('.task');
        const statusSpan = taskRow.querySelector('.status');
        if (checkbox.checked) {
            statusSpan.textContent = 'בוצע';
            statusSpan.classList.add('status-done');
            statusSpan.classList.remove('status-not-done');
            taskRow.querySelector('.completion-time').textContent = new Date().toLocaleTimeString('he-IL');
        } else {
            statusSpan.textContent = 'לא בוצע';
            statusSpan.classList.remove('status-done');
            statusSpan.classList.add('status-not-done');
            taskRow.querySelector('.completion-time').textContent = '';
        }
    });
    updateProgress();
}

// עדכון אחוז ההתקדמות
function updateProgress() {
    const totalTasks = document.querySelectorAll('input[type="checkbox"]').length;
    const completedTasks = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    const progressBar = document.querySelector('#progressBar .progress');
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}%`;
}

// הפעלת השעון עם השעה הנוכחית
function updateClock() {
    const now = new Date();
    const currentTime = now.toLocaleTimeString('he-IL');
    document.getElementById('clock').textContent = currentTime;
}

// עדכון השעון כל שניה
setInterval(updateClock, 1000);

// הצגת הודעת הפסקה בזמנים מסוימים
function checkBreakTimes() {
    const now = new Date();
    const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const breakMessage = document.getElementById('breakMessage');

    if (currentTime >= '10:30' && currentTime < '10:45') {
        breakMessage.textContent = 'הפסקה עד 10:45';
        breakMessage.style.display = 'block';
    } else if (currentTime >= '12:00' && currentTime < '12:20') {
        breakMessage.textContent = 'הפסקת אוכל עד 12:20';
        breakMessage.style.display = 'block';
    } else if (currentTime >= '13:45' && currentTime < '14:00') {
        breakMessage.textContent = 'הפסקה עד 14:00';
        breakMessage.style.display = 'block';
    } else {
        breakMessage.style.display = 'none';
    }
}

// בדיקת זמני הפסקה כל דקה
setInterval(checkBreakTimes, 60000);

// טעינת מצב המשימות מ-localStorage (אם יש)
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        if (savedTasks[checkbox.name]) {
            checkbox.checked = true;
        }
    });
    updateTaskStatus();
}

// שמירת מצב המשימות ב-localStorage
function saveTasks() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const tasks = {};
    checkboxes.forEach(function (checkbox) {
        tasks[checkbox.name] = checkbox.checked;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// הוספת מאזיני אירועים לשמירת מצב המשימות בכל שינוי
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', saveTasks);
});

// טעינת המשימות עם טעינת הדף
loadTasks();
