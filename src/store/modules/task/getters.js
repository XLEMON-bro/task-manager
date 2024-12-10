export default{
    getAllTasks(state){
        return state.tasks;
    },
    getTaskById: (state) => (id) => {
      return state.tasks.find(task => task.id === id);  
    },
};