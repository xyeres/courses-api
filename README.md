# rest-api-sql-v3
You are looking at a fully functioning REST API built with Express and the Sequelize ORM.

To get running:
- Download source
- `cd` to source
- `npm install`
- `npm run seend` to get db populated
- `npm start`

I have implemented the Exceeds Expectations project requirements including: 
- Ensure User Email Address is Valid and Unique
    - Add validation to the emailAddress attribute in the User model to ensure that the provided email address is properly formatted.
    - Add the unique constraint to the User model to ensure that the provided email address isn't already associated with an existing user.
- Update the User Routes
    - Update the /api/users GET route so that the following properties are filtered out of the response:
        - password
        - createdAt
        - updatedAt
    - Update the /api/users POST route to check for and handle SequelizeUniqueConstraintError errors.
        - If a SequelizeUniqueConstraintError is thrown a 400 HTTP status code and an error message should be returned.
- Update the Course Routes
    - Update the /api/courses and /api/courses/:id GET routes so that the following properties are filtered out of the response:
        - createdAt
        - updatedAt
    - Update the /api/courses/:id PUT and /api/courses/:id DELETE routes to ensure that the currently authenticated user is the owner of the requested course.
        - If the currently authenticated user is not the owner of the requested course a 403 HTTP status code should be returned.