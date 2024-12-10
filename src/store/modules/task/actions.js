export default {
    fetchTasks({ commit }) {
        const tasks = [
            {
                id: 1,
                title: "First task title",
                description: "Some data to be displayed on description sectinf for data of task, \nSome data to be displayed on description sectinf for data of task",
                done: false
            },
            {
                id: 2,
                title: "Second task title",
                description: "Some data to be displayed on description sectinf for data of task, \nSome data to be displayed on description sectinf for data of task",
                done: false
            },
            {
                id: 3,
                title: "Third task title",
                description: "Some data to be displayed on description sectinf for data of task, \nSome data to be displayed on description sectinf for data of task",
                done: true
            }
        ];

        commit('setTasks', tasks);
    },
    updateTaskById({ commit }, updatedTask) {
        commit('UpdateTask', updatedTask);
    },
    removeTaskById({ commit }, id){
        commit('removeTask', id);
    },
    addTask({commit}, newTask){
        commit('addTask', newTask);
    }
};