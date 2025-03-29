import { validate, ValidationError } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

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
/**
 * Handles validation errors by logging and throwing an HTTP exception.
 * @param error The error to handle.
 * @param logger The logger instance to use for logging.
 * @param context Additional context information for logging.
 */
export function handleValidationError(
  error: Error,
  logger: { warn: (message: string) => void },
  context: Record<string, unknown>,
): void {
  if (error.message.startsWith('Validation failed')) {
    const contextInfo = Object.entries(context)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    if (contextInfo) {
      logger.warn(`Validation error with context: ${contextInfo}`);
    } else {
      logger.warn('Validation error occurred.');
    }
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}
