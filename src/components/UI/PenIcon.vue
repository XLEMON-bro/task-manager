<template>
    <i @click="$emit('edit-icon-clicked')" class="fa fa-edit"></i>
</template>

<script>

export default{
    data(){
        return{
        
        }
    }

}

</script>

<style lang="scss">

.fa.fa-edit{
    position: absolute;
    bottom: 4px;
    right: 4px;
    color: black;
    font-size: 20px;

    &:hover{
        color: blue;
        cursor: pointer;
        transform: scale(1.06); 
    }
}

</style>