<template>
    <div class="overlay">
      <div class="modal-box">
        <button class="close-button" @click="closeOverlay">&times;</button>
  
        <h2>Edit Task</h2>
  
        <div class="form-group">
          <label for="title" class="form-label-above">Title:</label>
          <input id="title" type="text" v-model="title" placeholder="Enter task title" />
        </div>
  
        <div class="form-group">
          <label for="description" class="form-label-above">Description:</label>
          <textarea id="description" v-model="description" placeholder="Enter task description"></textarea>
        </div>
        
        <div v-if="action === 'update'" class="form-group-inline">
          <label class="form-label">Task:</label>
          <button :class="done ? 'task-button done' : 'task-button todo'" @click="toggleTask">{{ taskStatus }}</button>
        </div>
  
        <button class="action-button" @click="handleClick">{{action == 'update' ? 'Update' : 'Save'}}</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      taksId: {
        type: String,
        default: '',
      },  
      initialTitle: {
        type: String,
        default: '',
      },
      initialDescription: {
        type: String,
        default: '',
      },
      initialDone: {
        type: Boolean,
        default: false,
      },
      componentAction: {
        type: String,
        default: 'update',
        validator: function(value){
            return ['update', 'create'].includes(value);
        }
      }
    },
    data() {
      return {
        id: this.taksId,
        title: this.initialTitle,
        description: this.initialDescription,
        done: this.initialDone,
        action: this.componentAction,
      };
    },
    computed: {
      taskStatus() {
        return this.done ? 'Done' : 'To-Do';
      },
    },
    methods: {
      toggleTask() {
        this.done = !this.done;
      },
      closeOverlay() {
        this.$emit('close');
      },
      handleClick() {
        if(this.componentAction === 'create'){
            this.$emit('createTask', {  
              title: this.title,
              description: this.description,
              done: this.done,
            });
        }

        if(this.componentAction === 'update'){
            this.$emit('updateTask', { 
              id: this.id,   
              title: this.title,
              description: this.description,
              done: this.done,
            });
        }

      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-box {
    background: white;
    border-radius: 10px;
    padding: 20px;
    width: 600px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    position: relative;
    margin-left: 20px;
    margin-right: 20px;

    @media screen and (max-width: 600px){
        margin-left: 10px;
        margin-right: 10px;
    }

  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;

    &:hover{
        color: red;
    }
  }
  
  .form-group {
    margin-bottom: 25px;
  }
  
  .form-group-inline {
    display: flex;
    align-items: center;
  }
  
  .form-label-above {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-label {
    margin-right: 10px;
    font-weight: bold;
  }
  
  input, textarea {
    width: calc(100% - 20px);
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  textarea {
    resize: vertical;
    height: 140px;
  }
  
  .task-button {
    padding: 10px;
    background: lightgreen;
    color: white;
    border: 1px black solid;
    width: 80px;
    border-radius: 15px;
    cursor: pointer;

    &.done{
        background: rgb(68, 180, 68);
    }

    &.todo{
        background: rgb(225, 105, 105);
    }
  }
  
  .action-button {
    padding: 10px 20px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: calc(100% - 40px);
  }
  
  .action-button:hover {
    background: #218838;
  }
  </style>