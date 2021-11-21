import flowChart from "../Assets/Images/flow-chart.png";

const HomePage = () => {
  return (
    <div className="page">
      <h2>Hi, Welcome to My Website.</h2>
      <p>This is the Homepage of the application.🏡😻</p>
      <img src={flowChart} alt={"Navigation Flow"} />
    </div>
  );
};

export default HomePage;
