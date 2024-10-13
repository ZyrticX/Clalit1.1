// Existing code...

// Add logout functionality
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Existing code...

// Update loadTasks function to handle case when no tasks are saved
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    if (Object.keys(savedTasks).length === 0) {
        // If no tasks are saved, set all tasks to uncompleted
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    } else {
        checkboxes.forEach(function (checkbox) {
            if (savedTasks.hasOwnProperty(checkbox.name)) {
                checkbox.checked = savedTasks[checkbox.name];
            } else {
                checkbox.checked = false;
            }
        });
    }
    updateTaskStatus();
}

// Existing code...

// Add error handling for localStorage operations
function saveTasks() {
    try {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const tasks = {};
        checkboxes.forEach(function (checkbox) {
            tasks[checkbox.name] = checkbox.checked;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks:', error);
        alert('שגיאה בשמירת המשימות. אנא נסה שנית.');
    }
}

// Existing code...
