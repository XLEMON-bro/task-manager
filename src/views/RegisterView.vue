<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleRegister">
            <input type="text" v-model="firstName" placeholder="firstName" required/>
            <input type="text" v-model="lastName" placeholder="lastName" required/>
            <input type="email" v-model="email" placeholder="Email" required/>
            <input 
            type="password" 
            v-model="password" 
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required/>
            <button type="submit">Register</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>



<script>
import api from "@/services/axios";

export default{
    data(){
        return{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: "",
        };
    },
    methods: {
        async handleRegister(){
            try{
                const response = await api.post("/account/register",{
                    email: this.email,
                    password: this.password,
                    first_name: this.firstName.replaceAll(" ", ""),
                    last_name: this.lastName.replaceAll(" ", "")
                });

                localStorage.setItem("my_access_token", response.data.access_token);
                localStorage.setItem("my_refresh_token", response.data.refresh_token);
                localStorage.setItem("my_uid", response.data.user_id);

                //this.$router.push("/dashboard");
                window.location.href = "/dashboard";

            } catch (error) {
                this.error = error.response.data.error;
            }
        }
    }
};
</script>