import chroma from 'chroma-js';

export default (context, inject) => {
  inject('chroma', chroma); 
};