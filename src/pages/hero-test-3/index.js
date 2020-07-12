import React, { useState, useEffect, useCallback } from "react";
import { useTransition, animated, config } from "react-spring";
import { Hero, HomeContent } from "../../components/index";

function ReactSpringAutoTransition() {
  const slides = [
    {
      id: 0,
      url: "https://source.unsplash.com/1920x1080/daily?coffee",
      text: "Slide 0",
    },
    {
      id: 1,
      url: "https://source.unsplash.com/1920x1080/daily?music",
      text: "Slide 2",
    },
    {
      id: 2,
      url: "https://source.unsplash.com/1920x1080/daily?headphones",
      text: "Slide 3",
    },
    {
      id: 3,
      url: "https://source.unsplash.com/1920x1080/daily?food",
      text: "Slide 4",
    },
  ];

  const [index, set] = useState(0);

  const transitions = useTransition(slides[index], (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });

  useEffect(() => {
    void setInterval(() => {
      set((state) => (state + 1) % 4);
    }, 2000);
  });

  return (
    <div className="site-page">
      {transitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          className="hero-test-3"
          style={{
            ...props,
            backgroundImage: `url(${item.url})`,
          }}
        >
          <div className="container is-fluid">
            <div className="columns">
              <div className="column">
                <p className="title is-size-3-mobile is-size-1-tablet has-text-centered">
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        </animated.div>
      ))}
      <HomeContent />
    </div>
  );
}

export default ReactSpringAutoTransition;

// const pages = [
//   ({ style }) => (
//     <animated.div style={{ ...style, background: "lightpink" }}>A</animated.div>
//   ),
//   ({ style }) => (
//     <animated.div style={{ ...style, background: "lightblue" }}>B</animated.div>
//   ),
//   ({ style }) => (
//     <animated.div style={{ ...style, background: "lightgreen" }}>
//       C
//     </animated.div>
//   ),
// ];

// function ReactSpringClickTransition() {
//   const [index, set] = useState(0);

//   const handleClick = useCallback(() => set((state) => (state + 1) % 3), []);

//   const transitions = useTransition(index, (p) => p, {
//     from: { opacity: 0, transform: "translate3d(100%,0,0)" },
//     enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
//     leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
//   });

//   return (
//     <div className="has-navbar-fixed-bottom site-page" onClick={handleClick}>
//       {transitions.map(({ item, props, key }) => {
//         console.log("item", item);
//         console.log("props", props);
//         console.log("key", key);

//         const Page = pages[item];

//         return (
//           <div className="container is-fluid homepage-hero">
//             <Page key={key} style={props} />
//           </div>
//         );
//       })}
//       <HomeContent />
//     </div>
//   );
// }

// export default ReactSpringClickTransition;
