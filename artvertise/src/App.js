import './style.css';
import { BrowserRouter as Router} from 'react-router-dom'
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
// import Home from './components/Home';
//import Main from './components/Main';
import Home from './routes/Home';
import About from './routes/About';
import Service from './routes/Service';
import Contact from './routes/Contact';
import Blog from './routes/Blog';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import ArtistsPage from './routes/ArtistsPage';
import Footer from './components/Footer/Footer';
import SingleArtistPage from './routes/SingleArtistPage';
import Checkout from './routes/Checkout';
import Payment from './routes/Payment';

function App() {
  return (
    
    <Router>
    <div className='App'>
      <Switch>
      <Route path='/payment'>
            <Payment />
            <Footer />
          </Route>

        <Route path='/checkout'>
            <Checkout />
          </Route>

        <Route path='/artpotraits'>
            <SingleArtistPage />
            <Footer />
          </Route>

       <Route path='/artists'>
          <ArtistsPage />
          <Footer />
        </Route>

       <Route path='/login'>
          <Login />
        </Route>

        <Route path='/signup'>
          <SignUp />
        </Route>

       <Route path='/contact'>
          <Navbar />
          <Contact />
        </Route>

       <Route path='/blog'>
          <Navbar />
          <Blog />
        </Route>

        <Route path='/service'>
          <Navbar />
          <Service />
        </Route>

        <Route path='/about'>
          <Navbar />
          <About />
        </Route>

        <Route path='/'>
          <Navbar />
          <Home />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
