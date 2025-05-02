import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../Css/AnimatedComponent.css";

const AnimatedComponent = () => {
  const [show, setShow] = useState(false);

  const toggleAnimation = () => {
    setShow((prevShow) => !prevShow);
  };

  useEffect(() => {
    toggleAnimation();
  }, []);
  return (
    <div className="animation-container">
      <CSSTransition in={show} timeout={1000} classNames="fade" unmountOnExit>
        <div className="animated-box">
          <h2>Animated Component</h2>
        </div>
      </CSSTransition>
    </div>
  );
};

export default AnimatedComponent;
