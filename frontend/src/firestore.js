const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

const docRef = db.collection("users").doc("alovelace");

await docRef.set({
  first: "Ada",
  last: "Lovelace",
  born: 1815,
});

//GET METHOD TO RETRIEVE ENTIRE COLLECTION

const snapshot = await db.collection("users").get();
snapshot.forEach((doc) => {
  console.log(doc.id, "=>", doc.data());
});
