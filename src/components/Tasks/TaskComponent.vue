<template>
    <div>
        <div class="task">
            <button @click="removeTask(taskId)" class="button cancel">&times;</button>
            <div class="status">
                <div :class=" taskDone ? 'done' : 'todo'">{{ taskDone ? 'Done' : 'To-do' }}</div>
            </div>
            <h2>
                {{ title }}
            </h2>
            <div class="description">
                <p v-html="taskDescription"></p>
            </div>
            <PenComponent @edit-icon-clicked="taskEditing=true"/>
        </div>
        <OverlayComponent 
        @close="taskEditing=false" 
        v-show="taskEditing" 
        component-action="update"
        :taks-id="this.taskId"
        :initial-description="this.taskDescription"
        :initial-title="this.title"
        :initial-done="this.taskDone"
        @updateTask="updateTask"/>
    </div>
</template>

<script>
import PenComponent from '@/components/UI/PenIcon.vue'
import OverlayComponent from './OverlayComponent.vue';

export default {
    data(){
        return{
            taskEditing: false,
        };
    },
    components: {
        PenComponent,
        OverlayComponent,
    },
    props: {
        title: String,
        taskId: String,
        taskDescription: String,
        done: Boolean,
    },
    methods: {
        removeTask(id){
            this.$store.dispatch('task/removeTaskById', id);
        },
        updateTask(task){
            //add logic for task editing
            this.$store.dispatch('task/updateTask', task);
            this.taskEditing = false;
            console.log('custom event from update for task ' + task.id);
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
        top: 4px;
        right: 4px;
        background: transparent;    // Transparent background
        border: none;               // No border
        color: #000;                // Black color for "X"
        font-size: 20px;            // Font size for visibility
        cursor: pointer;            // Pointer cursor for interactivity
        font-weight: bold;

        &:hover{
            color: red;
        }
    }

    h2{
        margin-top: 20px;
        margin-bottom: 5px;
        margin-left: 10px;
        margin-right: 10px;
    }

    p{
        margin-top: 0px;
        margin-bottom: 5px;
    }

    .description{
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
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