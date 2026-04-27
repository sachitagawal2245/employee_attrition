import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      <section className="hero">
        <div className="hero-content">
          <h1>Employee Attrition Prediction System</h1>
          <p>
            AI-powered system to predict employee turnover risk using Machine Learning.
          </p>

          <button
            className="hero-button"
            onClick={() => navigate("/predict")}
          >
            Start Prediction
          </button>
        </div>
      </section>

      <section id="about" className="section about-section">
        <h2>About This Project</h2>
        <p>
         This application uses a trained machine learning model to predict whether an employee is at risk of leaving the organization. It evaluates multiple factors such as job satisfaction, salary hike, work–life balance, environment satisfaction, and other related attributes.
        The categorical features are encoded as follows:
        

        </p>
        <p>
          1]EnvironmentSatisfaction:
1 – Low
2 – Medium
3 – High
4 – Very High
        </p>

         <p>
         2]JobInvolvement:
1 – Low
2 – Medium
3 – High
4 – Very High
        </p>
         <p>
  3]   JobSatisfaction:
1 – Low
2 – Medium
3 – High
4 – Very High
        </p>
         <p>
    4]     RelationshipSatisfaction:
1 – Low
2 – Medium
3 – High
4 – Very High
        </p>
         <p>
      5]  WorkLifeBalance:
1 – Bad
2 – Good
3 – Better
4 – Best
        </p>
        
        
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact</h2>

        <div className="contact-container glass">
          <p><strong>Name:</strong> Sachit Agarwal & Yash Agarwal</p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="sachitagarwal244@gmail.com">Sachit Agarwal</a>
            <a href="yashagarwal0106@gmail.com">& Yash Agarwal</a>

          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/yash-agarwal-1206y"
              target="_blank"
              rel="noreferrer"
            >
              Yash Agarwal
            </a>
            <a
              href="www.linkedin.com/in/sachit-agarwal-8282461b7"
              target="_blank"
              rel="noreferrer"
            >
            &  Sachit Agarwal
            </a>
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;