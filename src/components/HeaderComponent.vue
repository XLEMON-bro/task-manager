<template>
    <header>
        <h1>Task Manager</h1>
        <template v-if="Authorized">
            <div class="button" @click.prevent="logout">Logout</div>
        </template>
        <template v-else>
            <a href="/login" class="button">Login</a>
            <a href="/register" class="button">Register</a>
        </template>
    </header>
</template>

<script>
import api from "@/services/axios";

export default {
    data() {
        return{
            isAuthorized: Boolean(localStorage.getItem("my_access_token"))
        }
    },
    methods: {
        async logout() {
            try{
                await api.post("/account/logout", {
                    refresh_token: localStorage.getItem("my_refresh_token"),
                    access_token: localStorage.getItem("my_access_token"),
                    user_id: localStorage.getItem("my_uid")
                });
            }
            catch(error){
                console.log(error.response.data.error);
            }finally {
                    // Clear localStorage
                    localStorage.removeItem("my_access_token");
                    localStorage.removeItem("my_refresh_token");
                    localStorage.removeItem("my_uid");

                    // Redirect to login
                    this.$router.push("/login");
            }
        }
    },
    computed: {
        Authorized(){
            return this.isAuthorized;
        }
    },
    checkAuthorization() {
        this.isAuthorized = Boolean(localStorage.getItem("my_access_token"));
    },
    mounted() {
        // Optionally, you can watch localStorage changes if other tabs affect it:
        window.addEventListener("storage", this.checkAuthorization);
    },
    beforeDestroy() {
        window.removeEventListener("storage", this.checkAuthorization);
    }
    
};
</script>

<style lang="scss" scoped>

.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    text-align: center;
}

.button:hover {
    background-color: #0056b3;
}

</style>