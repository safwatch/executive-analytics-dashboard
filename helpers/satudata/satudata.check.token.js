export default $store => resource => ({
// export default async function ({ $store, resource}){
    async checkTokenSatuData(moduleId, task) {

        var response = false;

        //get data store
       await $store.dispatch('satudata/checkTheToken').then((resp) => {
            if(resp.status == 'ERROR'){
                if(resp.message == "Invalid token"){
                    response = '401'
                }else{
                    response = '500'
                }
            }else{
                response = '200'
            }
            
            response = resp;
        })
        .catch((error)=>{
            console.log('in user service getCheckTokenSatudata catch', error.message);
        });

        return response;
    },
 }

)