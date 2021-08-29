import Footer from "./Footer"
import AppBar from "./AppBar"

const Layout = ({ children } : { children : JSX.Element}) => {
  return (
    <div className='content'>
      <AppBar />
      { children }
      <Footer />
    </div>
  );
}
 
export default Layout;