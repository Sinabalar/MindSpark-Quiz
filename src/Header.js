import icon from "./coding quiz logo.png"
function Header() {
  return (
    <header className='app-header'>
      <img src={icon} alt='React logo' />
      <h1>The MindSpark Quiz</h1>
    </header>
  );
}

export default Header;
