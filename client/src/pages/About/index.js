import React from "react";
import { Link } from "react-router-dom";

// import fontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faTruck,
  faTools,
  faDollarSign,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

// css styles
import "./styles.css";

const About = () => {
  return (
    <>
      <section id="About">
        <h1>
          ContraList is a better way to connect general contactors and labor
        </h1>
        <p>
          General contractors and labor have trouble connecting. Contralist
          allows contractors to advertise jobs and labor to apply for them.
          Contractors can then contact labor to work out the details.
        </p>
        <p>
          As a contractor, you can create jobs which will then be available to
          view by laborers. When you view a specific job, you can see the
          laborers which have applied for that job. It is the contractor's
          responsibility to contact the laborers. Laborers can NOT contact you!
        </p>
        <p>
          As a laborer, you can view all jobs posted by contractors in order by
          date. Then you can choose which ones to apply for. You'll be able to
          see all jobs that you have applied for. Then all you have to do is
          wait for the contractor to reach out to you. You can NOT contact the
          contractors directly!
        </p>
        <div id="icons">
          <FontAwesomeIcon icon={faFile} size="3x" style={{ margin: "10px" }} />{" "}
          <FontAwesomeIcon
            icon={faTruck}
            size="3x"
            style={{ margin: "10px" }}
          />
          <FontAwesomeIcon
            icon={faTools}
            size="3x"
            style={{ margin: "10px" }}
          />
          <FontAwesomeIcon
            icon={faDollarSign}
            size="3x"
            style={{ margin: "10px" }}
          />
          <FontAwesomeIcon
            icon={faHeart}
            size="3x"
            style={{ margin: "10px" }}
          />
        </div>
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </section>
    </>
  );
};

export default About;
