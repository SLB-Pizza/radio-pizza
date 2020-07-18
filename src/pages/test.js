import React from "react";

// Dummy data in __tests__ folder
import sampleMixes from "../../__tests__/sampleMixes.json";

function TestPage() {
  return (
    <div className="container is-fluid site-page">
      <div className="columns btn-tags is-multiline">
        {sampleMixes.map((mix) => (
          <div key={mix.title} className="column is-3">
            <figure className="image is-1by1">
              <img src={mix.img} alt={`image - ${mix.name} by ${mix.artist}`} />
            </figure>
            {/* <h2>{mix.name}</h2> */}
            <div className="buttons are-small">
              {mix.tags.map((tag) => (
                <button key={tag} className="button is-outlined is-rounded">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="columns test is-mobile">
        <div className="column is-four-fifths">
          <p>is-four-fifths</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-three-quarters">
          <p>is-three-quarters</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-two-thirds">
          <p>is-two-thirds</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-three-fifths">
          <p>is-three-fifths</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-half">
          <p>is-half</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-two-fifths">
          <p>is-two-fifths</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-one-third">
          <p>is-one-third</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-one-quarter">
          <p>is-one-quarter</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-one-fifth">
          <p>is-one-fifth</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>
      <div className="columns test is-mobile">
        <div className="column is-four-fifths">
          <p>is-four-fifths</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-three-quarters">
          <p>is-three-quarters</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-two-thirds">
          <p>is-two-thirds</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-three-fifths">
          <p>is-three-fifths</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-half">
          <p>is-half</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-two-fifths">
          <p>is-two-fifths</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-one-third">
          <p>is-one-third</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-one-quarter">
          <p>is-one-quarter</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-one-fifth">
          <p>is-one-fifth</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>
      <div className="columns test is-mobile">
        <div className="column is-four-fifths">
          <p>is-four-fifths</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-three-quarters">
          <p>is-three-quarters</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-two-thirds">
          <p>is-two-thirds</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-three-fifths">
          <p>is-three-fifths</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-half">
          <p>is-half</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-two-fifths">
          <p>is-two-fifths</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-one-third">
          <p>is-one-third</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-one-quarter">
          <p>is-one-quarter</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>

      <div className="columns test is-mobile">
        <div className="column is-one-fifth">
          <p>is-one-fifth</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
        <div className="column">
          <p className="has-text-centered">X</p>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
