# React Form with Validation

This is a React application demonstrating form handling and validation using react-hook-form with zod for schema validation. It fetches user data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users) and displays a form for adding new users. [Try it out!](https://vempr.github.io/rhf-zod/)

## Development
- Languages: React, TypeScript
- Styling: TailwindCSS
- Deployment: Vite, GitHub Pages
- Data Fetching: Tanstack Query, Axios
  - Schema Validation: Zod
- Form: React Hook Form
- Data Generation: nanoid, @custom-react-hooks/use-geo-locatio

## Notes
The React hook `useGeoLocation` is disabled by default, as GitHub Pages doesn't allow for websites to track geolocation. If you want to try the app with `useGeoLocation`, please clone the repository and install dependencies to run it on your computer. Comment out the placeholder variables and vice verca for the hook. Thanks!

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit). Feel free to use, modify, and distribute the code according to the terms of the license.
