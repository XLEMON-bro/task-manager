export default{
    setTasks(state, tasks){
        state.tasks = tasks;
    },
    updateTask(state, updatedTask) {
        const index = state.tasks.findIndex(task => task.id === updatedTask.id);
        if(index !== -1) {
            state.tasks.splice(index, 1, updatedTask);
        }
    },
    removeTask(state, id){
        state.tasks = state.tasks.filter(task => task.id !== id);
    },
    addTask(state, newTask){
        state.tasks.push(newTask);
    }
};