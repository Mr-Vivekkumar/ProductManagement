# Augmont Product Management

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.0.

## Running the Frontend Application

1. **Install Dependencies**:
   ```
   npm install
   ```

2. **Start Development Server**:
   ```
   npm start
   ```
   or
   ```
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

3. **Production Build**:
   ```
   npm run build
   ```
   The build artifacts will be stored in the `dist/` directory.

## Configuration

### Setting Base URLs

The application uses environment files to configure API endpoints:

1. **Development Environment** (`src/environments/environment.ts`):
   - API base URL is configured for local development
   - File upload endpoints are configured separately

2. **Production Environment** (`src/environments/environment.prod.ts`):
   - Update the `apiUrl` property to point to your production API
   - Update the `fileUploadUrl` property for production file uploads

Example configuration:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  fileUploadUrl: 'http://localhost:3000/api/upload',
  fileServerUrl: 'http://localhost:4000'
};
```

## API Integration

All UI flows in this application map 1:1 to the documented API requests:

- **Authentication**: JWT-based authentication with login endpoint
- **Categories**: CRUD operations with pagination
- **Products**: CRUD operations with search, filtering, and image upload
- **Bulk Upload**: CSV file upload with job status polling
- **Reports**: CSV/XLSX export with current filters

## Known Limitations

1. **Authentication**: 
   - Only admin login is supported; signup functionality is hidden
   - JWT expiration requires manual re-login

2. **File Upload**:
   - Image uploads are limited to 5MB per file
   - Supported formats: JPG, PNG, GIF

3. **Bulk Upload**:
   - CSV files must follow the exact template format
   - Maximum 1000 rows per upload
   - Job status polling has a 5-second interval

4. **Browser Compatibility**:
   - Fully tested on Chrome and Firefox
   - Limited support for Internet Explorer

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
