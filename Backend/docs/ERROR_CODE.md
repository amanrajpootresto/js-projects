# Backend Error Codes

This document defines all structured error codes used by the backend modules.

## Auth Module

- `AUTH_PASSWORD_REQUIRED`
  - Description: Password input is missing or not provided as a string.
  - HTTP status: 400
  - Thrown by: `Backend/src/modules/auth/domain/password.policy.js`

## Contacts Module

- `CONTACT_DUPLICATE_PHONE`
  - Description: Attempt to create a contact with a phone number that already exists.
  - HTTP status: 409
  - Thrown by: `Backend/src/modules/contacts/application/create-contact.usecase.js`

- `CONTACT_NOT_FOUND`
  - Description: Requested contact does not exist.
  - HTTP status: 404
  - Thrown by:
    - `Backend/src/modules/contacts/application/delete-contact.usecase.js`
    - `Backend/src/modules/contacts/application/get-contact-by-id.usecase.js`
    - `Backend/src/modules/contacts/application/update-contact.usecase.js`

- `CONTACT_PHONE_IMMUTABLE`
  - Description: Attempt to update a contact's phone number when phone changes are not allowed.
  - HTTP status: 400
  - Thrown by: `Backend/src/modules/contacts/application/update-contact.usecase.js`

- `CONTACT_UPDATE_NO_FIELDS`
  - Description: Update request contains no valid fields (`firstName` or `lastName`).
  - HTTP status: 400
  - Thrown by: `Backend/src/modules/contacts/domain/contact.entity.js`

- `CONTACT_FIRST_NAME_REQUIRED`
  - Description: Contact first name is missing or blank.
  - HTTP status: 400
  - Thrown by: `Backend/src/modules/contacts/domain/contact.entity.js`

- `CONTACT_FIRST_NAME_TOO_LONG`
  - Description: Contact first name exceeds the allowed maximum length.
  - HTTP status: 400
  - Thrown by: `Backend/src/modules/contacts/domain/contact.entity.js`

- `CONTACT_LAST_NAME_MUST_BE_STRING`
  - Description: Contact last name is not a string.
  - HTTP status: 400
  - Thrown by: `Backend/src/modules/contacts/domain/contact.entity.js`

- `CONTACT_LAST_NAME_TOO_LONG`
  - Description: Contact last name exceeds the allowed maximum length.
  - HTTP status: 400
  - Thrown by: `Backend/src/modules/contacts/domain/contact.entity.js`

- `CONTACT_PHONE_REQUIRED`
  - Description: Contact phone number is missing.
  - HTTP status: 400
  - Thrown by: `Backend/src/modules/contacts/domain/contact.entity.js`

- `CONTACT_PHONE_INVALID`
  - Description: Contact phone number is invalid or does not match the required format.
  - HTTP status: 400
  - Thrown by: `Backend/src/modules/contacts/domain/contact.entity.js`

## Error Response Format

Errors thrown by the backend now return JSON in the form:

```json
{
  "success": false,
  "message": "...",
  "errorCode": "...",
  "severity": "error"
}
```

For uncaught errors, the response remains:

```json
{
  "success": false,
  "message": "Internal server error"
}
```
