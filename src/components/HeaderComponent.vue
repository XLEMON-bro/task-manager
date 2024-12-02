<template>
    <header>
        <h1>Task Manager</h1>
        <button @click="logout">Logout</button>
    </header>
</template>

<script>
import api from "@/services/axios";

export default {
    methods: {
        async logout() {
            await api.post("/account/logout", {
                refresh_token: localStorage.getItem("my_refresh_token"),
                access_token: localStorage.getItem("my_access_token"),
                user_id: localStorage.getItem("my_uid")
            });

            localStorage.removeItem("my_access_token");
            localStorage.removeItem("my_refresh_token");
            localStorage.removeItem("my_uid");
            this.$router.push("/login");
        },
    },
};
</script>
