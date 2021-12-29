import { MdOutlineMenuBook } from 'react-icons/md/index';
import { BsCart4 } from 'react-icons/bs/index';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='container-fulid bg-primary navbar-custom'>
      <div className='row h-100 align-items-center'>
        <Link
          to='/'
          className='col-5 col-sm-4 col-md-3 d-flex justify-content-center link-light text-decoration-none'
        >
          <MdOutlineMenuBook size={30} className='d-flex align-self-center' />
          <span className='ms-1'>Book Store</span>
        </Link>
        <Link
          to='/cart'
          className='offset-5 offset-sm-6 offset-md-7 col-2 d-flex justify-content-center link-light'
        >
          <BsCart4 size={30} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
