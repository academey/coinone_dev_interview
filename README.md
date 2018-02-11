# coinone_dev_coding_test

This project is for cryptoCurrency analysis at coinone with ReactJS client-side-rendering using AWS Lambda.

The [Demo & Docs](https://d1wuvpg9dc736.cloudfront.net) is now available!

Released Features

1. Show crypto coin Chart(price, price diff a day, volume, yesterday)
2. Oauth login through Lambda
   <!-- 3. Analyze your coin status(using coinone user api)
3. Alarm following coin change -->

# Project spec

* React v16.0
* React-Router v4
* Other dependencies

  **Packages**

* **TypeScript** - Basic language
* **ReactJS** - Frontend library
* **Redux** - App state manager
* **Serverless** - managing AWS Lambda, API Gateway, and the others within cloud-formation

# Before Project Start

* This isn't free to start. Because it uses AWS's several services(Lambda, API Gateway, S3, CloudFront, CloudFormation, (Route53))\*

1. Set AWS Credential
   You should set AWS IAM Role and account setting.
   visit below guide and precede AWS settings before run deploying script
   [Serverless AWS account setting guide](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

2. Make S3 Bucket to upload your bundled S3

```
Make S3 Bucket
(If you can connect this with CDN like the Cloudfront, the script loading speed will be better. But in this case you should change some code in deploy logic and normal logic too.)
```

`Set S3 Bucket information in <root_directory>/scripts/builds/config.ts`

# How to install

```
git clone https://github.com/academey/coinone_dev_interview
cd react-universal-in-serverless
npm install
```

### How to use

**Running dev server**

```
npm run dev
```

### Build production script

_at staging server_

```
npm run deploy:stage
```

_at production server_

```
npm run deploy:prod
```

## Contributing

If you want to contribute something, just make Pull Request or Issue for us.
we will appreciate all of your contributions. thanks.

## Authors

* **academey** [GitHub](https://github.com/academey)

### Logs in Terminal (please read serverless official docs)

```
npm i -g serverless
serverless logs -f [function name] -s [stage name]
```

```
ex) serverless logs -f ssr -s stage
```

If you want to watch logs in watch mode(continuously),
just run with -t option

```
serverless logs -f [function name] -s [stage name] -t
```

# deploy process

1. Make and Apply new git tag for SCM and destination path.
2. Make bundled JS files for server-side and browser-side.
3. Upload bundled JS files to S3 and Remove browser side bundled JS.
4. Copy package.json that only for serverless to dist folder.
5. Install all packages in dist folder and zip them with bundled JS.
6. Deploy Lambda and relevant packages by using serverless

# Todos

* **Adding TEST**
* **Minimizing node_modules size**
* **Add Expectation Feature**
