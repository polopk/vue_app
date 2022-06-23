<template>
    <div id="site">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
            <a class="navbar-brand">Consecionaria Vehículos S.A.</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <!-- <span class="navbar-toggler-icon"></span> -->
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <div class="navbar-nav">
                    <a class="nav-link" >
                        <router-link to="/menu" title="Menu Principal">
                            Menu Principal
                        </router-link>
                    </a>
                    <a class="nav-link" >
                        <router-link to="/clientes" title="Clientes">
                            Clientes
                        </router-link>
                    </a>
                    <a class="nav-link" >
                        <router-link to="/inventario" title="Inventario">
                            Inventario
                        </router-link>
                    </a>
                </div>
            </div>
            </div>
        </nav>
    </div>
</template>

<script>

export default {
    name: 'header',
    props: {

    },

    data: function(){
        return{

        }
    },

    methods: {

    }
}
</script>
