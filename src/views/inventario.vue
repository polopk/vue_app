<template>
    <div class="content">
        <Header/>
        <br>
        <div class="form">
            <div class="card">
                <div class="card-header fw-bold">
                    Ingreso inventario
                </div>
                <div class="card-body">
                    <div class="form-group row">
                        <label class="col-md-2">Marca</label>
                        <div class="col-md-9">
                            <input type="text" class="form-control"  placeholder="Marca del vehículo" v-model="iMarca">
                        </div>
                    </div>
                    <br>
                    <div class="form-group row">
                        <label class="col-md-2">Placa</label>
                        <div class="col-md-9">
                            <input type="text" class="form-control"  placeholder="Placa del vehículo" v-model="iPlaca">
                        </div>
                    </div>
                    <br>
                    <div class="form-group row">
                        <label class="col-md-2">Tipo Vehículo</label>
                        <div class="col-md-9">
                            <input type="text" class="form-control"  placeholder="Tipo del Vehículo ej. sedan, panel, van, minivan, etc." v-model="iTipo">
                        </div>
                    </div>
                    <br>
                    <div class="form-group row">
                        <label class="col-md-2">VINI</label>
                        <div class="col-md-9">
                            <input type="text" class="form-control"  placeholder="VINI" v-model="iVini">
                        </div>
                    </div>
                    <br>
                    <div class="form-group row">
                        <label class="col-md-2">Precio</label>
                        <div class="col-md-9">
                            <input type="number" class="form-control"  placeholder="Precio comercial del vehículo" v-model="iPrecio">
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
                    Ver inventario
                </div>
                <div class="form-group">
                    <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered table-hover" id="tabla-clientes">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Marca</th>
                                <th>Placa</th>
                                <th>Tipo</th>
                                <th>Vini</th>
                                <th>Precio</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="odd gradeX" v-for="(vehiculo,index) in dtVehiculos" v-bind:key="index" v-bind:value="vehiculo.id">
                                <td>{{vehiculo.id}}</td>
                                <td>{{vehiculo.marca}}</td>
                                <td>{{vehiculo.placa}}</td>
                                <td>{{vehiculo.tipo}}</td>
                                <td>{{vehiculo.vini}}</td>
                                <td>{{vehiculo.precio}}</td>
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
    name: 'Inventario',
    components: {
        Header
    },

    data: function(){
        return{
            trn: 0,
            opr: '',
            iId: 0,
            iMarca: '',
            iPlaca: '',
            iTipo: '',
            iVini: '',
            iPrecio: 0,
            dtVehiculos: [],
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

            this.trn = 102;

            this.iMarca = this.iMarca.toUpperCase();
            this.iPlaca = this.iPlaca.toUpperCase();
            this.iTipo = this.iTipo.toUpperCase();
            this.iVini = this.iVini.toUpperCase();

            let json = {
                i_opr:  this.opr,
                i_trn:  this.trn,
                i_id:   this.iId,
                i_marca:  this.iMarca,
                i_placa: this.iPlaca,
                i_tipo: this.iTipo,
                i_vini: this.iVini,
                i_precio: this.iPrecio
            };

            // console.log(json)

            axios.post("https://umqrw1qlg4.execute-api.eu-west-1.amazonaws.com/dev/inventario", json)
            .then((res)=>{
                
                let respData = res.data;
                let respContent = respData.body.content[0]
                let respJsonDB = respContent[0]

                console.log(respJsonDB)

                if (respJsonDB.o_return == 0){
                    alert(msj);
                    this.iMarca = '';
                    this.iPlaca = '';
                    this.iTipo = '';
                    this.iVini = '';
                    this.iPrecio = 0;
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
            this.trn = 102;

            let json = {
                i_opr:  this.opr,
                i_trn:  this.trn,
                i_id:   this.iId,
                i_marca:  this.iMarca,
                i_placa: this.iPlaca,
                i_tipo: this.iTipo,
                i_vini: this.iVini,
                i_precio: this.iPrecio
            };

            // console.log(json)

            axios.post("https://umqrw1qlg4.execute-api.eu-west-1.amazonaws.com/dev/inventario", json)
            .then((res)=>{
                
                let respData = res.data;
                let respContent = respData.body.content[0];

                if (respContent.length > 0) {
                    this.dtVehiculos = respContent;
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
            this.iId = this.dtVehiculos[index].id;
            this.iMarca = this.dtVehiculos[index].marca;
            this.iPlaca = this.dtVehiculos[index].placa;
            this.iTipo = this.dtVehiculos[index].tipo;
            this.iVini = this.dtVehiculos[index].vini;
            this.iPrecio = this.dtVehiculos[index].precio;
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