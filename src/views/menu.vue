<template>
    <div class="form">
        <Header/>
        <div>
            <h3></h3>
            <h1 class="fw-bold">Sistema de Consecionaria S.A</h1>
            <h3></h3>
            <br>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    name: 'menu',
    components: {
        Header
    }
}
</script>

<style scoped>
h1{
    height: 200px;
    background-color: #EEE;
    display:flex;
    justify-content: center;
    align-items: center;
}
h3{
    height: 200px;
    background-color: rgba(232, 164, 164, 0.995);
    display:flex;
    justify-content: center;
    align-items: center;
}

</style>