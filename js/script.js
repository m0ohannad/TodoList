let tasks = [
    {
        title: "قراءة جزء من القرآن",
        date: "1-1-2022 | 12:00 PM",
        isDone: false
    },
    {
        title: "بناء مشروع JS",
        date: "2-1-2022 | 5:00 AM",
        isDone: true
    },
    {
        title: "تعلم البلوكتشين",
        date: "3-1-2022 | 10:00 PM",
        isDone: false
    }
];

getTasksFromStorage()

function fillTasks() {

    document.getElementById("tasks").innerHTML = ""

    for (task of tasks) {

        // // get index of task
        // let index = tasks.indexOf(task)
        // console.log(index)

        let content = `
                        <!-- TASK -->
                            <div class="task ${task.isDone ? 'done' : ''} ">
                                <!-- TASK INFO -->
                                <div class="task-info">
                                    <h2>${task.title}</h2>
                                    <div class="date">
                                        <span class="material-symbols-outlined">
                                            calendar_month
                                        </span>
                                        <bdi>
                                        <span>
                                            ${task.date}
                                        </span>
                                        </bdi>
                                    </div>
                                </div>
                                <!-- END TASK INFO -->
                                <!-- TASK ACTIONS -->
                                <div class="task-actions">
                                    <button onclick='deleteTask(${tasks.indexOf(task)})' class="circular" style="background-color: rgb(114, 0, 0);">
                                        <span class="material-symbols-outlined">
                                            delete
                                        </span>
                                    </button>
        
                                    ${task.isDone ? `
                                        <button onclick='toggleTaskCompletion(${tasks.indexOf(task)})' class="circular" style="background-color: rgb(118, 0, 101);">
                                            <span class="material-symbols-outlined">
                                                cancel
                                            </span>
                                        </button>
                                    ` : `
                                        <button onclick='toggleTaskCompletion(${tasks.indexOf(task)})' class="circular" style="background-color: rgb(0, 150, 30);">
                                            <span class="material-symbols-outlined">
                                                done
                                            </span>
                                        </button>
                                    `}
        
                                    <button onclick='editTask(${tasks.indexOf(task)})' class="circular" style="background-color: rgba(0, 16, 197, 0.692); color: white;">
                                        <span class="material-symbols-outlined">
                                            edit
                                        </span>
                                    </button>
                                </div>
                                <!-- END TASK ACTIONS -->
                            </div>
                        <!-- END TASK -->
        `
        document.getElementById("tasks").innerHTML += content
    }

}

fillTasks()

document.getElementById("add-btn").addEventListener("click", function () {
    now = new Date()
    // let taskDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}`
    // let taskDate = `${now.toLocaleDateString()} | ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;
    let taskDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} | ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;
    let taskTitle = prompt("أدخل اسم المهمة")
    // let taskDate = prompt("أدخل تاريخ المهمة")
    let task = {
        title: taskTitle,
        date: taskDate,
        isDone: false
    }
    tasks.push(task)

    storeTasks()

    fillTasks()
})

function deleteTask(index) {
    let task = tasks[index]
    isConfirmed = confirm(`هل تريد حذف المهمة "${task.title}"؟`)
    if (isConfirmed) {
        tasks.splice(index, 1)
        storeTasks()
        fillTasks()
    }
}

function editTask(index) {
    let task = tasks[index]
    let newTitle = prompt("أدخل اسم المهمة", task.title)
    task.title = newTitle
    storeTasks()
    fillTasks()
}

// function completeTask(index) {
//     let task = tasks[index]
//     task.isDone = true
//     fillTasks()
// }

function toggleTaskCompletion(index) {
    let task = tasks[index]
    task.isDone = !task.isDone
    storeTasks()
    fillTasks()
}

// ================== STORAGE FUNCTIONS ==================
function storeTasks() {
    let taskString = JSON.stringify(tasks)
    localStorage.setItem("tasks", taskString)
}

function getTasksFromStorage() {
    // let taskString = localStorage.getItem("tasks")
    // let tasks = JSON.parse(taskString) ?? []

    tasks = JSON.parse(localStorage.getItem("tasks")) || tasks
}
