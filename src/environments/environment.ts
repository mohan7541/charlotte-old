// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentName: 'dev',
  apiUrl: 'http://ec2-13-58-105-249.us-east-2.compute.amazonaws.com:8092',
  /*apiUrl: 'http://localhost:8092',*/
  qrApi: 'http://ec2-3-21-165-189.us-east-2.compute.amazonaws.com/qr/QRImage/CE_RECYCLE'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
