# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `npm run build`

Builds the project for production in `dist` folder.

### `npm run deploy`

Build and deploy the project to AWS Cloud.

### `npm run destroy`

Destroy the project on AWS Cloud.

# The task ([Serve SPA in AWS S3 and Cloudfront Services](https://github.com/rolling-scopes-school/aws/blob/main/aws-developer/02_serving_spa/task.md)) results:

## Basic Scope. Manual Deployment
### 1) Create and configure S3 bucket:
 The app has been uploaded to the bucket and is available though the Internet. Nothing else has been done.
 Link to S3 bucket: https://bb-en1-rss-211.s3.eu-north-1.amazonaws.com/index.html
 
 ### 2) Create and configure CloudFront distribution:
 The site is served now with CloudFront and is available through the Internet over CloudFront URL, not S3-website link.
 S3-website shows 403 Access Denied error.
 Link to CloudFront: https://d1ub7l8p4olbz4.cloudfront.net/
 Link to S3 bucket: https://bb-en1-rss-212.s3.eu-north-1.amazonaws.com/index.html

## Advanced Scope. Automated Deployment
### S3 bucket creation, website deployment, CloudFront Distribution and Invalidation added and configured by using AWS CDK:
 Link to CloudFront: https://d2tsw9z2z885cs.cloudfront.net
 Link to S3 bucket: https://bv-eu-north-1-rss-221.s3.eu-north-1.amazonaws.com/index.html
