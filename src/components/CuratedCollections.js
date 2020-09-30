import React from "react";
import { MixPlayOverlay } from "../components";
import { getResidentString } from "../utils";
import TagButtons from "./TagButtons";

function CuratedCollections({ curatedMixes }) {
  let mixCount = "1 mix";
  let mixLinks = [];
  let mixResidents = new Set();
  let mixTags = new Set();

  return (
    <section className="container is-fluid">
      <div className="columns is-mobile">
        <div className="column is-12 content">
          <h1 className="title">Curated Collections</h1>
          <p className="subtitle">
            Select mixes put together especially by the HMBK crew.
          </p>
        </div>
      </div>

      {/* All Mixs data in pulled correctly */}
      {curatedMixes.map((endlessMix, index) => {
        const {
          endless_mix_title,
          endless_mix_blurb,
          endless_mix_img,
          endless_mix_playlist,
        } = endlessMix.node;

        mixCount =
          endless_mix_playlist.length === 1
            ? `${endless_mix_playlist.length} mix`
            : `${endless_mix_playlist.length} mixes`;

        endless_mix_playlist.map(({ endless_mix_entry }) => {
          const { _meta, mix_link, featured_residents } = endless_mix_entry;

          mixLinks.push(mix_link);

          featured_residents.map(({ mix_resident }) => {
            mixResidents.add(mix_resident.resident_name);
            // console.log("mixResidents current size", mixResidents.size);
          });

          _meta.tags.map((tag) => {
            mixTags.add(tag);
          });
        });

        return (
          <div
            key={`Endless-mix-${index}`}
            className="columns is-mobile curated-mix"
          >
            <div className="column is-9">
              <div className="content">
                <h3 className="title">{endless_mix_title}</h3>
                <p className="subtitle is-size-6">{mixCount}</p>
                <p className="subtitle is-size-7">{mixCount}</p>
                <p className="is-size-5">{endless_mix_blurb}</p>
              </div>
              <pre>Links {JSON.stringify(mixLinks, null, 2)}</pre>
              <pre>
                Residents {JSON.stringify([...mixResidents.values()], null, 2)}
              </pre>
              <pre>Tags {JSON.stringify([...mixTags.values()], null, 2)}</pre>
              <TagButtons tagsArray={[...mixTags.values()]} />
            </div>

            <div className="column is-3">
              <MixPlayOverlay
                wrapperClassName="card"
                img={endless_mix_img}
                title={endless_mix_title}
              />
            </div>
          </div>
        );
      })}
      <hr />
    </section>
  );
}

export default CuratedCollections;
