import { validate, ValidationError } from 'class-validator';
import { HttpException, HttpStatus, Logger } from '@nestjs/common'; // Import HttpException and Logger

const logger = new Logger('ValidationUtil'); // Create a logger instance

/**
 * Utility function to validate a DTO object.
 * @param dto The DTO object to validate.
 * @returns A promise that resolves if the DTO is valid, or throws an HttpException if validation fails.
 */
export async function validateDto<T extends object>(dto: T): Promise<void> {
  const errors: ValidationError[] = await validate(dto);

  if (errors.length > 0) {
    const errorMessages = errors
      .map((err) => Object.values(err.constraints || {}).join(', '))
      .join('; ');

    logger.warn(`Validation failed: ${errorMessages}`);
    throw new HttpException(
      `Validation failed: ${errorMessages}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
