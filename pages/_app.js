import { useEffect } from 'react';
import '../styles/globals.css'
import { firebaseCloudMessaging } from '@/constants/firebaseConfig';
import firebase from 'firebase/app';
import DefaultLayout from '@/components/DefaultLayout';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setToken();
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
    function getMessage() {
      const messaging = firebase.messaging();
      console.log({ messaging });
      messaging.onMessage((message) => {
        const { title, body } = message.notification;
        var options = {
          body,
        };
        Notification.requestPermission((result) => {
          if (result === 'granted') {
            navigator.serviceWorker.ready.then((registration) => {
              registration.showNotification(title, options);
            });
          }
        });
        // registration.showNotification(title, options);
      });
    }
  });
  return <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
}

export default MyApp
