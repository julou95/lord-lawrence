importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCOlV7NKYUoBM05aqFOzzzE7MX3vqMnLVE',
  authDomain: "side-chick-60a33.firebaseapp.com",
  projectId: "side-chick-60a33",
  storageBucket: "side-chick-60a33.appspot.com",
  messagingSenderId: "947750175464",
  appId: "1:947750175464:web:9d7247fe2fee918e58ff5d",
  measurementId: "G-DJYFCY7S0M"
});

firebase.messaging();

//background notifications will be received here
firebase.messaging().setBackgroundMessageHandler((payload) => {
  const { title, body } = payload.notification;
  var options = {
    body,
    icon: '/logo-128.png',
  };
  self.registration.showNotification(title, options);
});
