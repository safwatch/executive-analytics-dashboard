export default $store => resource => ({
// export default async function ({ $store, resource}){
    async checkAuth(moduleId, task) {
        //initial value task
        if (task == null){
            task = 'index';
        }

        var response = false;

        //get data store
       await $store.dispatch('authstate/checkAuth', {
            moduleId : moduleId,
            task : task
        }).then((resp) => {
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
            console.log('in user service getCheckAuth catch', error.message);
        });

        return response;
    },
 }

)