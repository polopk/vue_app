<template>
    <div class="container">
        <br>
        <br>
        <br>
        <div class="abs-center">
            <form class="border p-3 form" v-on:submit.prevent="fnEntrar">
                <div class="form-group mb-3">
                    <label class="control-label row justify-content-center">User</label>
                    <input type="text" class="form-control" id="user" v-model="usr">
                    <div id="user" class="form-text">Ingresa tu usuario para ingreso al sistema.</div>
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="pss" v-model="pss">
                </div>
                <button type="submit" class="btn btn-primary" v-on:submit.prevent="fnEntrar">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'login',
    props: {

    },

    data: function(){
        return{
            usr: '',
            pss: '',
            trn: 0,
            opr: ''
        }
    },

    methods: {
        fnEntrar(){

            this.opr = 'VC';
            this.trn = 100;

            let json = {
                i_opr:  this.opr,
                i_usr:  this.usr,
                i_ps:   this.pss,
                i_trn:  this.trn
            };

            // console.log(json)

            axios.post("https://lslc1jonj8.execute-api.eu-west-1.amazonaws.com/dev/login", json)
            .then((res)=>{
                
                let respData = res.data;
                let respContent = respData.body.content[0]
                let respJsonDB = respContent[0]

                console.log(respJsonDB)

                if (respJsonDB.o_return == 0){
                    alert('Bienvenido');
                    this.$router.push('menu');
                }
                

                // respJson = JSON.stringify(respuesta.body.content[0]);
                // let objResp = {};

                // objResp = JSON.parse(respJson);
                // console.log(objResp);

                // console.log(respJson.o_return);

                
            })
            .catch((err)=>{
                console.log(err);
            })

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .abs-center {
    display: flex;
    align-items: center;
    justify-content: center;
    }
</style>