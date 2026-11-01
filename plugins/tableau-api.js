let tableauLoaded = null;

export default (context, inject) => {
  if (!tableauLoaded) {
    tableauLoaded = new Promise((resolve, reject) => {
      const tableauScript = document.createElement('script');
      tableauScript.src = '/js/tableau-2.min.js'; // Local file path
      tableauScript.async = true;

      tableauScript.onload = () => {
        console.log('Tableau API loaded successfully from local file');
        if (window.tableau) {
          resolve(window.tableau); // Resolve with the loaded tableau object
        } else {
          reject(new Error('Tableau API not available after loading script'));
        }
      };

      tableauScript.onerror = () => {
        console.error('Failed to load Tableau API from local file');
        reject(new Error('Failed to load Tableau API from local file'));
      };

      document.head.appendChild(tableauScript);
    });
  }

  inject('tableau', tableauLoaded); // Inject the Promise into Nuxt context
};
