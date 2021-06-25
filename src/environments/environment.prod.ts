export const environment = {
  production: true,
  startPageAfterLogin: 'home',
  firebaseConfig: {
    apiKey: 'AIzaSyAt0A-pNJNvSe9pUWrby_2-SFQCXI7WMsE',
    authDomain: 'invoices-244bd.firebaseapp.com',
    databaseURL: 'https://invoices-244bd.firebaseio.com',
    projectId: 'invoices-244bd',
    storageBucket: 'invoices-244bd.appspot.com',
    messagingSenderId: '281478247600',
    appId: '1:281478247600:web:4bce50f58c2357d55ab775',
    measurementId: 'G-YDRP5ST41Z',
  },

  routing: {
    home: '/home',
    login: '/admin/auth/login',
    registration: '/admin/auth/registration',
    invoice: {
      list: '/admin/invoices',
      create: '/admin/invoices/create',
    },
    contractor: {
      list: '/admin/contractor',
      create: '/admin/contractor/create',
    },
    contract: {
      list: '/admin/contract',
      create: '/admin/contract/create',
    },
    settings: {
      main: '/admin/settings',
      company: '/admin/settings/company',
    },
  },
};
