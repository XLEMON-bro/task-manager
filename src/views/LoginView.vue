<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <input type="email" v-model="email" placeholder="Email" required/>
            <input type="password" v-model="password" placeholder="Password" required/>
            <button type="submit">Login</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>



<script>
import api from "@/services/axios";

export default{
    data(){
        return{
            email: "",
            password: "",
            error: "",
        };
    },
    methods: {
        async handleLogin(){
            try{
                const response = await api.post("/account/login",{
                    email: this.email,
                    password: this.password,
                });

                localStorage.setItem("my_access_token", response.data.access_token);
                localStorage.setItem("my_refresh_token", response.data.refresh_token);
                localStorage.setItem("my_uid", response.data.user_id);

                this.$router.push("/dashboard");

            } catch {
                this.error = "invalid credentials";
            }
        }
    }
};
</script>