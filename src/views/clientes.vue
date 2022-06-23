<template>
    <div class="content">
        <Header/>
        <br>
        <div class="form">
            <div class="card">
                <div class="card-header fw-bold">
                    Ingreso clientes
                </div>
                <div class="card-body">
                    <div class="form-group row">
                        <label class="col-md-2">Nombre</label>
                        <div class="col-md-9">
                            <input type="text" class="form-control"  placeholder="Nombre del cliente" v-model="iName">
                        </div>
                    </div>
                    <br>
                    <div class="form-group row">
                        <label class="col-md-2">Apellido</label>
                        <div class="col-md-9">
                            <input type="text" class="form-control"  placeholder="Apellido del cliente" v-model="iLastName">
                        </div>
                    </div>
                    <br>
                    <div class="form-group row">
                        <label class="col-md-2">Direccion</label>
                        <div class="col-md-9">
                            <input type="text" class="form-control"  placeholder="Dirección" v-model="iDireccion">
                        </div>
                    </div>
                    <br>
                    <div class="form-group row">
                        <label class="col-md-2">Numero Telefono</label>
                        <div class="col-md-9">
                            <input type="text" class="form-control"  placeholder="Número de telefono" v-model="iNumero">
                        </div>
                    </div>
                    <br>
                    <div class="form-group row">
                        <label class="col-md-2">Empresa</label>
                        <div class="col-md-9">
                            <input type="text" class="form-control"  placeholder="Codigo empresa donde labora" v-model="iEmpresa">
                        </div>
                    </div>
                    <br>
                    <button type="button" class="btn btn-outline-success" v-on:click="fnEnviar">Enviar</button>
                </div>
            </div>
            <br>
        </div>
        <br>
        <div class="form">
            <div class="card">
                <div class="card-header fw-bold">
                    Ver clientes
                </div>
                <div class="form-group">
                    <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered table-hover" id="tabla-clientes">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Direccion</th>
                                <th>Numero</th>
                                <th>Empresa</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="odd gradeX" v-for="(cliente,index) in dtClientes" v-bind:key="index" v-bind:value="cliente.id">
                                <td>{{cliente.id}}</td>
                                <td>{{cliente.nombre}}</td>
                                <td>{{cliente.apellido}}</td>
                                <td>{{cliente.direccion}}</td>
                                <td>{{cliente.numero}}</td>
                                <td>{{cliente.empresa}}</td>
                                <td><button class="btn btn-warning" @click="fnEditar(index)">Editar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import axios from 'axios'

export default {
    name: 'clientes',
    components: {
        Header
    },

    data: function(){
        return{
            trn: 0,
            opr: '',
            iId: 0,
            iName: '',
            iLastName: '',
            iDireccion: '',
            iNumero: '',
            iEmpresa: 0,
            dtClientes: [],
            isUpdate: false
        }
    },

    methods: {

        //insertar y actualizar
        fnEnviar(){
            
            var msj = '';

            if(this.isUpdate === false){
                this.opr = 'IN';
                msj = 'Ingresado exitosamente';
            }else{
                this.opr = 'UP';
                msj = 'Actualizado exitosamente';
            }

            this.trn = 101;

            this.iName = this.iName.toUpperCase();
            this.iLastName = this.iLastName.toUpperCase();
            this.iDireccion = this.iDireccion.toUpperCase();

            let json = {
                i_opr:  this.opr,
                i_trn:  this.trn,
                i_id:   this.iId,
                i_name:  this.iName,
                i_last_name: this.iLastName,
                i_direccion: this.iDireccion,
                i_numero: this.iNumero,
                i_empresa: this.iEmpresa
            };

            // console.log(json)

            axios.post("https://z46ec9szg6.execute-api.eu-west-1.amazonaws.com/dev/clientes", json)
            .then((res)=>{
                
                let respData = res.data;
                let respContent = respData.body.content[0]
                let respJsonDB = respContent[0]

                console.log(respJsonDB)

                if (respJsonDB.o_return == 0){
                    alert(msj);
                    this.iName = '';
                    this.iLastName = '';
                    this.iDireccion = '';
                    this.iNumero = '';
                    this.iEmpresa = 0;
                    this.iId = 0;
                    this.isUpdate = false;
                    this.fnBuscar();
                }else{
                    alert('Hubo un problema')
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })

        },

        fnBuscar() {

            this.opr = 'SE';
            this.trn = 101;

            let json = {
                i_opr:  this.opr,
                i_trn:  this.trn,
                i_id:   this.iId,
                i_name:  this.iName,
                i_last_name: this.iLastName,
                i_direccion: this.iDireccion,
                i_numero: this.iNumero,
                i_empresa: this.iEmpresa
            };

            // console.log(json)

            axios.post("https://z46ec9szg6.execute-api.eu-west-1.amazonaws.com/dev/clientes", json)
            .then((res)=>{
                
                let respData = res.data;
                let respContent = respData.body.content[0];

                if (respContent.length > 0) {
                    this.dtClientes = respContent;
                }else{
                    alert('No se pudieron cargar los clientes');
                }

                
            })
            .catch((err)=>{
                console.log(err);
            })
        },

        fnEditar(index){
            this.isUpdate = true;
            this.iId = this.dtClientes[index].id;
            this.iName = this.dtClientes[index].nombre;
            this.iLastName = this.dtClientes[index].apellido;
            this.iDireccion = this.dtClientes[index].direccion;
            this.iNumero = this.dtClientes[index].numero;
            this.iEmpresa = this.dtClientes[index].empresa;
        }
        
    },

    mounted() {
        this.fnBuscar();
    }
}

</script>

<style scoped>
    .card{
        width: 85rem;
    }
    .form{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>