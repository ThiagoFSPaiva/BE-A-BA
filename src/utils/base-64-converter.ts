import { LoginPayload } from "src/auth/dtos/loginPayload.dto";

export const authorizationLoginPayload = (authorization: string): LoginPayload => {
    const authorizationSplit = authorization.split('.');

    if(authorizationSplit.length < 3 || !authorizationSplit[1]) {
        return undefined;
    }

    return JSON.parse(Buffer.from(authorizationSplit[1], 'base64').toString('utf-8'));
}

// import { LoginPayload } from "src/auth/dtos/loginPayload.dto";

// export const authorizationLoginPayload = (authorization: string): LoginPayload => {
//     if (!authorization) {
//         return undefined;
//     }

//     const authorizationSplit = authorization.split('.');

//     if(authorizationSplit.length < 3 || !authorizationSplit[1]) {
//         return undefined;
//     }

//     return JSON.parse(Buffer.from(authorizationSplit[1], 'base64').toString('utf-8'));
// }