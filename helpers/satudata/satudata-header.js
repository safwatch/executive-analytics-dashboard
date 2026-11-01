export function satudataHeader() {
    // return authorization header with jwt token
    let response = JSON.parse(localStorage.getItem('satudata.token'));
    console.log("say in header");
    if (response && response.token) {
        return { 'Authorization': 'Bearer ' + response.token };
    } else {
        return {};
    }

    
}
