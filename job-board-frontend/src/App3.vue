<script setup>
import { ref, onMounted } from 'vue';

const name = ref("John Doe");
const status = ref("pending");
const tasks = ref(['Task One', 'Task Two', 'Task Three']);
const newTask = ref('')

const addTask = () => {
    if (newTask.value.trim !== "") {
        tasks.value.push(newTask.value)
        newTask.value = ""
    }
}
const deleteTask = (index) => {
    tasks.value.splice(index, 1);
}

const toggleStatus = () => {
    if (status.value === 'active') {
        status.value = 'pending';
    }
    else if (status.value === 'pending') {
        status.value = "inactive";
    }
    else {
        status.value = 'active';
    }
}

onMounted(async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        console.log(data)
        tasks.value = data?.map((task) => task?.title);
    }
    catch (err) {
        console.error("Error Fetching Tasks");

    }
})
</script>

<template>
    <h1>{{ name }}</h1>
    <p v-if="status === 'active'">User is active</p>
    <p v-else-if="status === 'pending'">User is pending</p>
    <p v-else>User is inactive</p>

    <form @submit.prevent="addTask">
        <label>Add Task</label>
        <input name="newTask" v-model="newTask" />
    </form>

    <h3>Tasks:</h3>
    <ul>
        <li v-for="(task, index) in tasks" :key="task">
            <span>{{ task }}</span>
            <button @click="deleteTask(index)">X</button>
        </li>
    </ul>

    <button @click="toggleStatus">click Me</button>
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;
        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>