export default $axios => resource => ({
  
    get() {
      return $axios.$get('/api/'+resource);
    },

    getByParam(param) {
      return $axios.$get('/api/'+resource+'?'+param);
    },
  
    getById(id) {
      return $axios.$get('/api/'+resource+'/'+id);
    },
  
    post(payload) {
      return $axios.$post('/api/'+resource, payload);
    },

    postFile(payload) {
      return $axios.$post('/api/'+resource, payload );
    },
  
    update(id, payload) {
      return $axios.$post('/api/'+resource+'/'+id, payload);
    },
  
    delete(id) {
      return $axios.$delete('/api/'+resource+'/'+id);
    },
  });