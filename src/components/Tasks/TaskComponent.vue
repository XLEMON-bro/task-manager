<template>
    <div class="task">
        <button @click="removeTask(taskId)" class="button cancel">&times;</button>
        <div class="status">
            <div :class=" taskDone ? 'done' : 'todo'">{{ taskDone ? 'Done' : 'To-do' }}</div>
        </div>
        <h2>
            {{ title }}
        </h2>
        <div class="description">
            <P v-html="taskDescription"></p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        };
    },
    props: {
        title: String,
        taskId: Number,
        taskDescription: String,
        done: Boolean,
    },
    methods: {
        removeTask(id){
            this.$store.dispatch('task/removeTaskById', id);
        }
    },
    computed: {
        taskDone() {
            return this.done;
        }
    }
};
</script>

<style lang="scss" scoped>

.task{
    border: 1px black solid;
    border-radius: 10px;
    width: auto;
    height: auto;
    min-width: 240px;
    min-height: 120px;
    max-width: 460px;
    max-height: 460px;
    background-color: white;
    box-shadow: 6px 6px 3px rgba(0, 0, 0, 0.3);
    display: flex;   
    position: relative;          
    flex-direction: column;    
    justify-content: space-between;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    margin: auto;

    &:hover{
        transform: scale(1.02); 
        box-shadow: 8px 8px 5px rgba(0, 0, 0, 0.4);
    }

    .cancel{
        position: absolute;
        top: 2px;
        right: 5px;
        background: transparent;    // Transparent background
        border: none;               // No border
        color: #000;                // Black color for "X"
        font-size: 16px;            // Font size for visibility
        cursor: pointer;            // Pointer cursor for interactivity
        font-weight: bold;

        &:hover{
            color: red;
        }
    }

    h2{
        margin-top: 20px;
        margin-bottom: 5px;
    }

    p{
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .status{
        position: absolute;
        top: 5px;
        left: 5px;
        border: 1px black solid;
        border-radius: 10px;
        width: 44px;

        .done{
            color: green;
            font-family: monospace;

            &:hover{
            background-color: lightgreen;
            border-radius: 10px;
            color: white;
            cursor: default;
            }
        }

        .todo{
            color: red;
            font-family: monospace;

            &:hover{
            background-color: lightcoral;
            border-radius: 10px;
            color: white;
            cursor: default;
            }
        }
    }
}

</style>