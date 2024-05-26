export default function SupplierDashboard() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <nav className='col-md-3 col-lg-2 d-md-block bg-primary sidebar collapse sidebar-sticky'>
          <div className='sidebar-sticky'>
            <ul className='nav flex-column'>
              <li className='nav-item'>
                <a className='nav-link active text-light' href='#'>
                  <span data-feather='home'></span>
                  Dashboard
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-light' href='/category'>
                  <span data-feather='file'></span>
                  Category
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link text-light' href='/s-product'>
                  <span data-feather='shopping-cart'></span>
                  Product
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-4'>
          <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
            <h1 className='h2'>Dashboard</h1>
          </div>

          <div className='row'>
            <div className='col-lg-4 col-md-6 mb-4'>
              <div className='card bg-success text-white'>
                <div className='card-body'>
                  <h5 className='card-title'>Category</h5>
                  <p className='card-text'>4</p>
                </div>
                <div className='card-footer'>
                  <a href='#' className='text-white'>
                    More info
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 mb-4'>
              <div className='card bg-warning text-white'>
                <div className='card-body'>
                  <h5 className='card-title'>Product</h5>
                  <p className='card-text'>6</p>
                </div>
                <div className='card-footer'>
                  <a href='#' className='text-white'>
                    More info
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 mb-4'>
              <div className='card bg-danger text-white'>
                <div className='card-body'>
                  <h5 className='card-title'>Customer</h5>
                  <p className='card-text'>5</p>
                </div>
                <div className='card-footer'>
                  <a href='#' className='text-white'>
                    More info
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 mb-4'>
              <div className='card bg-primary text-white'>
                <div className='card-body'>
                  <h5 className='card-title'>Supplier</h5>
                  <p className='card-text'>2</p>
                </div>
                <div className='card-footer'>
                  <a href='#' className='text-white'>
                    More info
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 mb-4'>
              <div className='card bg-secondary text-white'>
                <div className='card-body'>
                  <h5 className='card-title'>Total Purchase</h5>
                  <p className='card-text'>3</p>
                </div>
                <div className='card-footer'>
                  <a href='#' className='text-white'>
                    More info
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-4 col-md-6 mb-4'>
              <div className='card bg-dark text-white'>
                <div className='card-body'>
                  <h5 className='card-title'>Total Outgoing</h5>
                  <p className='card-text'>2</p>
                </div>
                <div className='card-footer'>
                  <a href='#' className='text-white'>
                    More info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
