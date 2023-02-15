import { ZodError, ZodSchema } from 'zod';
import { ValidationSchemaError } from '../../../errors/validation-schema.error';

export type ErrorSchema = {
    field: (string | number)[]
    message: string
}

export const validatorSchema = (shema: ZodSchema, payload: any) => {
    try {
        shema.parse(payload);

    } catch (erro: any) {
        const typedError = erro as ZodError;
        const errors: ErrorSchema[] = [];

        typedError.errors.forEach(e => {
            errors.push({ field: e.path, message: e.message });
        });

        throw new ValidationSchemaError('ERROR_SCHEMA', errors);
    }

}