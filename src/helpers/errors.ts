import { Request, Response } from 'express';
import e from 'express/ts4.0';

export enum names {
    ACCOUNT_NOT_FOUNT = 'ACCOUNT_NOT_FOUNT',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'
}

export const errors = {
    [names.ACCOUNT_NOT_FOUNT]: {
        code: 404,
        message: 'account_not_found',
    },
    [names.INVALID_CREDENTIALS]: {
        code: 401,
        message: 'invalid_credentials'
    }
};

// exports.httpCodesMap = {
//     '00': 500, // Internal Server Error
//     10: 400, // Bad Request
//     11: 400, // Bad Request
//     12: 400, // Bad Request
//     13: 400, // Bad Request
//     14: 401, // Unauthorized
//     15: 402, // Payment Required
//     16: 403, // Forbidden
//     17: 404, // Not Found
//     18: 405, // Method Not Allowed
//     19: 408, // Request Timeout
//     20: 500, // Internal Server Error
//     21: 501, // Not Implemented
//     22: 502, // Bad Gateway
//     23: 503, // Service Unavailable
//     24: 504, // Gateway Timeout
//     30: 500 // Internal Server Error
// };
