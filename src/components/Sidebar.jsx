// this is my sidebar.jsx
import '../App.css'

export default function Sidebar() {
  return (
    <nav className='col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse sidebar-sticky'>
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
            <a className='nav-link text-light' href='/product'>
              <span data-feather='shopping-cart'></span>
              Product
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link text-light' href='#'>
              <span data-feather='bar-chart-2'></span>
              Supplier
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link text-light' href='#'>
              <span data-feather='layers'></span>
              System Users
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
