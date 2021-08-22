import firebase from "firebase/app";
	import "firebase/auth";
	import "firebase/firestore";

	const firebaseConfig = {
  apiKey: "AIzaSyDqFVp7_Tm6AiVhwkGZeSJLVj9KfSTJ9Hc",
  authDomain: "vrxd-3a139.firebaseapp.com",
  databaseURL: "https://vrxd-3a139-default-rtdb.firebaseio.com",
  projectId: "vrxd-3a139",
  storageBucket: "vrxd-3a139.appspot.com",
  messagingSenderId: "849957746904",
  appId: "1:849957746904:web:3d7bc4a8670355a4317fad"
};
  // Initialize Firebase
  	firebase.initializeApp(firebaseConfig);

	  export let db = firebase.firestore();
