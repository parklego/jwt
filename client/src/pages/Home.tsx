import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Home</h2>
      <div>
        <button
          className="btn btn-primary btn-sm"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/register")}
        >
          회원가입
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("login")}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Home;
