<template>
    <div class="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>
        <div class="dashboard">
          <Task 
          v-for="task in tasks" :key="task.id"
          v-bind:title="task.title"
          v-bind:taskDescription="task.description"
          v-bind:done="task.done"
          v-bind:taskId="task.id"/>
        </div>
    </div>
</template>
  
<script>
  import Task from '@/components/Tasks/TaskComponent.vue'

  export default {
    data(){
      return{
          
      }
    },
    components: { 
      Task
    },
    methods: {
      removeTaskById(id){
        this.$store.dispatch('task/removeTaskById', id);
      }
    },
    computed: {
      tasks() {
        console.log(this.$store.getters['task/getAllTasks']);
        return this.$store.getters['task/getAllTasks'];
      }
    },
    created() {
      this.$store.dispatch('task/fetchTasks');
    }
  };
</script>

<style lang="scss" scoped>

.dashboard-container{
  display: flex;
  flex-direction: column;
}

.dashboard{
  width: auto;
  height: auto;
  min-width: 240px;
  min-height: 200px;
  border: 1px black solid;
  border-radius: 15px;
  background-color: #f5f5f5;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-left: 15px;
  margin-right: 15px;
}

@media (max-width: 550px) {
    .dashboard{
      margin-left: 5px;
      margin-right: 5px;
    }
  }
</style>