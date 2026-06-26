import { AppError, ERROR_CODES } from '../../../shared/errors/AppError.js';

export const PASSWORD_RULES = Object.freeze({
    minimumLength: 8,
    maximumLength: 128,
})

export function validatePassword(password){
    if(typeof password !== "string"){
        throw new AppError(
            "Password is required",
            400,
            ERROR_CODES.AUTH_PASSWORD_REQUIRED
        )
    }
}