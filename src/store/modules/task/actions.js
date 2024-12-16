export default {
    fetchTasks({ commit }) {
        const tasks = [
            {
                id: "1",
                title: "First task title",
                description: "Some data to be displayed on description sectinf for data of task, Some data to be displayed on description sectinf for data of task",
                done: false
            },
            {
                id: "2",
                title: "Second task title",
                description: "Some data to be displayed on description sectinf for data of task, Some data to be displayed on description sectinf for data of task, Some data to be displayed on description sectinf for data of task, Some data to be displayed on description sectinf for data of task",
                done: false
            },
            {
                id: "3",
                title: "Third task title",
                description: "Some data to be displayed on description sectinf for data of task, Some data to be displayed on description sectinf for data of task",
                done: true
            },
            {
                id: "4",
                title: "Fourth task title",
                description: "Some data to be displayed on description sectinf for data of task, Some data to be displayed on description sectinf for data of task",
                done: false
            }
        ];

        commit('setTasks', tasks);
    },
    updateTask({ commit }, updatedTask) {
        commit('updateTask', updatedTask);
    },
    removeTaskById({ commit }, id){
        commit('removeTask', id);
    },
    addTask({commit}, newTask){
        commit('addTask', newTask);
    }
};