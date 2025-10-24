Todo list 2 — Frontend focus (Angular)
Project setup

Initialize Angular app, add routing, HttpClient, and environment configs for API base URL and file endpoints.​

Add an Auth interceptor to attach JWT from storage on requests; handle 401 redirects to login.​

Authentication

Build a simple admin login page posting to /auth/login; store JWT; hide signup entirely.​

Categories module

List with pagination controls (client UI) consuming server-side list endpoint.​

Create/edit forms with validation; delete with confirmation; ensure unique name errors are shown.​

Products module

Product list table with server-driven pagination, sorting by price, and search by product/category name; query params synced with router.​

Create/edit forms: fields for name, price, category select (loads categories), image upload (submit multipart to backend returns image URL).​

Delete action with confirmation and optimistic UI updates.​

Bulk upload UI

Page to upload CSV file; on submit call bulk-upload; show returned jobId; poll job status and render progress and row-level errors if present.​

Reports export UI

Buttons to download CSV/XLSX using current filters; use blob download and save-as filename with timestamp.​

Optional role demo

Simple role-based guard example: route guard that checks for admin claim in JWT; conditionally show Users section.​

Users module (optional)

Admin-only list/create/edit/delete users; keep minimal UI.​

UX polish

Reusable table component for server-side data grids; loading and empty states; error toasts; basic responsive layout.​

Postman parity and docs

Ensure all UI flows map 1:1 to documented API requests; add notes in README for running frontend, setting base URLs, and known limitations.