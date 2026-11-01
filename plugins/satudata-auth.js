import { satudataService } from '../helpers/satudata/satudata.service';

// export default (app, inject) => {
export default async function ({app}, inject) {
    const satuDataCheckAuthHelper  = satuDataCheckAuth(app.store);

    inject('satuDataCheckAuth', satuDataCheckAuthHelper())
}
