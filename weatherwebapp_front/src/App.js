import './assets/css/App.css';
import MainRouting from './Routing/MainRouting'
import { withNamespaces } from 'react-i18next'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App({ t }) {

  window.onunhandledrejection = async () => {

    let promise = new Promise((resolve) => {
      resolve(alert(t("alert1")));
    });
    await promise;
    window.location.reload();
  }

  return (
    <div>
      <MainRouting />
      <ToastContainer style={{ width: "400px" }}/>
    </div>
  );
}

export default withNamespaces()(App);