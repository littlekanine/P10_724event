import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      // Handle index for carrousel imgs / Infinite scroll - manages the index relative to the number of elements
      // if index = the number of elements in the array, we come back to first element
      // if no, we go to the next index (+1)
      setIndex((prevIndex) => (prevIndex === (byDateDesc?.length ?? 0) - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearTimeout(timer); // Timer cleaning function
  }, [index, byDateDesc?.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((focus, idx) => (
        <>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={focus.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{focus.title}</h3>
                <p>{focus.description}</p>
                <div>{getMonth(new Date(focus.date))}</div>
              </div>
            </div>
          </div>s
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
