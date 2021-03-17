import './assets/css/App.css';
import MainRouting from './Routing/MainRouting'


function App() {
  
  window.onunhandledrejection = (err) => {

    error_notification();
}

  let error_notification = async () => {

    let promise = new Promise((resolve) => {
        resolve(alert("Oups! An internal Error has occured. The page will refresh"));
    });
    await promise;
    window.location.reload();
}

  return (
    <div style={{ background: "#F7F5F3" }}>
      <MainRouting />
    </div>
  );
}

export default App;