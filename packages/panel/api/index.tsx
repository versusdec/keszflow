import { root } from './config'
// import axios from "axios";
/*import NextCors from 'nextjs-cors';

async function handler(req: any, res: any) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    // Rest of the API logic
    console.log(res);
}*/
//todo remove '/api/cors?url=' from prod
const url = '/api/cors?url=' + root
export const api = Object.freeze({
  test: {
    fetch: () => {
      return fetch(url, {})
        .then((res) => {
          return res
        })
        .catch((error) => {
          return error
        })
      /*return axios.get(root, {}).then(res => {
                if (res)
                    return res.data
            }).catch(error => {
                return error
            });*/
    },
  },
})
