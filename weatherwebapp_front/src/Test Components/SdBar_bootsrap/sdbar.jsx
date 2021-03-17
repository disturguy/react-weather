import '../assets/css/sidebar.css'

function Sidebar({ color, image, routes }) {

  return (
    <div class="container-fluid">
      <div class="row row-content">
        <div class="col-2 col-sm-2">
          {/* Sidebar */}
            <nav id="sidebar">
            <div class="sidebar-header">
              <h3>Weather app</h3>
            </div>
            <ul class="list-unstyled components">
              <p><strong>Εφαρμογή Πληροφόρησης Καιρού</strong></p>
              <li class="active">
                <a href="/">Current Weather</a>
                <li>
                  <a href="/forecast" >Forecast</a>
                </li>
                <li>
                  <a href="/stats">Statistics</a>
                </li>
                <li>
                  <a href="/userinfo">User Info</a>
                </li>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;