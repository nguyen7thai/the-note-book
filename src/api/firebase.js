import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCvsMk0MXTM3Bu4aMlRpGoZ4DUDTq040VI",
  authDomain: "the-note-book-d91de.firebaseapp.com",
  databaseURL: "https://the-note-book-d91de.firebaseio.com",
  projectId: "the-note-book-d91de",
  storageBucket: "the-note-book-d91de.appspot.com",
  messagingSenderId: "438925206887"
}
firebase.initializeApp(config)

export const ref = firebase.database().ref()

export function saveNote(title, content, updatedAt) {
  const key = firebase.database().ref().child('notes').push().key;
  return { key, promise: ref.child(`notes/${key}`).set({ title, content, updatedAt }) }
}

export function listenToNotes(cb, error) {
  ref.child('notes').orderByChild('updatedAt').on('value', snapshot => {
    const notes = snapshot.val() || {}
    cb(notes)
  }, (message) => {
    console.log('cannot listen from firebase: ', message)
  })
}

export function updateNote(id, content) {
  return ref.child(`notes/${id}`).update({
    content: content
  })
}

export function removeNote(id) {
  return ref.child(`notes/${id}`).remove()
}
