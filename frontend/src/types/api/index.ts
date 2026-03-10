/**
 * Auto-generated API types from OpenAPI/Swagger spec
 * Run `npm run generate:api-types` to regenerate these types
 */
export type * from './types';

// Helper type exports for easier usage
import type { paths, components } from './types';

export type { paths, components };

// Common response types
export type LoggedInUserDto = components['schemas']['LoggedInUserDto'];
export type UserDataDto = components['schemas']['UserDataDto'];
export type TokenDto = components['schemas']['TokenDto'];
export type APIResponseDto = components['schemas']['APIResponseDto'];

// Request DTOs
export type SignupDto = components['schemas']['SignupDto'];
export type LoginDto = components['schemas']['LoginDto'];
export type ForgotPasswordDto = components['schemas']['ForgotPasswordDto'];
export type ResetPasswordDto = components['schemas']['ResetPasswordDto'];

// API Path types for type-safe API calls
export type AuthPaths = paths;
export type SignupResponse = paths['/api/auth/signup']['post']['responses']['201']['content']['application/json'];
export type LoginResponse = paths['/api/auth/login']['post']['responses']['200']['content']['application/json'];
export type CurrentUserResponse = paths['/api/auth/current-user']['get']['responses']['200']['content']['application/json'];