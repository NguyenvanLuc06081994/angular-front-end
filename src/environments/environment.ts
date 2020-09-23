// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  url: 'http://127.0.0.1:8000/api',
  firebaseConfig: {
    apiKey: 'AIzaSyAVPv2SjbrrVJ_B4rROhvKFiP5Pazs6B_I',
    authDomain: 'http://localhost:4200',
    databaseURL: 'https://console.firebase.google.com/project/upload-image-edb81/storage/upload-image-edb81.appspot.com/files?hl=en',
    projectId: 'upload-image-edb81',
    storageBucket: 'upload-image-edb81.appspot.com',
    messagingSenderId: '418939664543'
  }

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
