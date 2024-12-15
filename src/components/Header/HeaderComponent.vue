<template>
    <header class="header">
        <HeaderLink to="/main" text="Main Page"/>
        <HeaderLink to="/dashboard" text="Dashboard"/>
        <template v-if="Authorized">
               <div class="button" @click.prevent="logout">Logout</div>
         </template>
         <template v-else>
              <HeaderLink to="/login" text="Login"/>
              <HeaderLink to="/register" text="Register"/>
          </template>
    </header>
</template>

<script>
import api from "@/services/axios";
import HeaderLink from "./HeaderLink.vue";

export default {
    data() {
        return{
            isAuthorized: Boolean(localStorage.getItem("my_access_token")),
        }
    },
    components: {
        HeaderLink,
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
                    //this.$router.push("/login");
                    window.location.href = "/main";
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

.header{
    display: flex;
    font-size: 1.5rem;
    height: 2rem;
    justify-content: center;
    align-items: center;
    border-bottom: black 1px solid;
    position: relative;
}

.button {
    position: absolute;
    right: 0;
    top: 0;
    color: black;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    padding-left: 4px;
    padding-right: 4px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button:hover {
    background-color: black;
    color: white;
    cursor: pointer;
}

</style>