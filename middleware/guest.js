export default function ({ store, redirect }) {
  if (store.state.auth.loggedIn) { // true or false
    return redirect('/')
  }
}