import "./Header.css";
const Header = () => {
  return (
    <div className="Header">
      <h3>미루지 말고 오늘은 하자 😼</h3>
      <h1>
        {new Date().toDateString()}
      </h1>
    </div>
  )
}

export default Header;