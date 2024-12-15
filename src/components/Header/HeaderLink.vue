<template>
        <router-link :to="to">
                {{ text }}
        </router-link>
</template>

<script>

export default{
    data(){
        return{

        }
    },
    props: {
        to: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        }
    }
}
</script>

<style lang="scss" scoped>

a {
    text-align: center;
    border-left: black 1px solid;
    border-right: black 1px solid;
    padding-left: 4px;
    padding-right: 4px;
    height: 100%;
    color: black;
    text-decoration: none;

    &:hover{
        color: #78350f;
    }

    &.router-link-exact-active {
        border-bottom: solid 3px #78350f;
        color: #78350f;
        font-weight: bold;
    }
}

</style>