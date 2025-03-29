import { validate, ValidationError } from 'class-validator';

/**
 * Utility function to validate a DTO object.
 * @param dto The DTO object to validate.
 * @returns A promise that resolves if the DTO is valid, or rejects with a validation error message.
 */
export async function validateDto<T extends object>(dto: T): Promise<void> {
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
        const errorMessages = errors
            .map((err) => Object.values(err.constraints || {}).join(', '))
            .join('; ');

        throw new Error(`Validation failed: ${errorMessages}`);
    }
}