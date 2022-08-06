import { useReactiveVar } from "@apollo/client";
import { Feature, Map as OlMap, View } from "ol";
import { Point } from "ol/geom";
import { Tile, Vector as VectorTile } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { OSM, Vector } from "ol/source";
import { Icon, Style } from "ol/style";
import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { searchHistory } from "../../hooks/useAddressSearch";

import "./styles.scss";

export const Map = () => {
  const { countryCode, zipCode } = useParams();
  const addressHistory = useReactiveVar(searchHistory);
  const mapRef = useRef();

  const selectedAddress = useMemo(
    () =>
      addressHistory.find(
        ({ postCode: addressZipCode, countryCode: addressCountryCode }) =>
          addressZipCode === zipCode && addressCountryCode === countryCode,
      ),
    [addressHistory, zipCode],
  );

  // TODO: check if history is empty, if so, search for address using zipCode (need to add coutry to param as well)

  useEffect(
    function loadMap() {
      const coordinates = selectedAddress
        ? fromLonLat([Number(selectedAddress.longitude), Number(selectedAddress.latitude)])
        : [0, 0];
      const mapObject = new OlMap({
        target: null,
        layers: [
          new Tile({
            source: new OSM(),
          }),
          new VectorTile({
            source: new Vector({
              wrapX: false,
              features: [
                new Feature({
                  geometry: new Point(coordinates),
                }),
              ],
            }),
            style: new Style({
              image: new Icon({
                anchor: [16, 48],
                anchorXUnits: "pixels",
                anchorYUnits: "pixels",
                imgSize: [32, 48],
                src: "https://openlayers.org/en/v3.20.1/examples/data/icon.png",
              }),
            }),
          }),
        ],
        view: new View({
          center: coordinates,
          zoom: 5,
        }),
      });

      mapObject.setTarget(mapRef.current);

      return () => mapObject.setTarget(null);
    },
    [selectedAddress],
  );

  return (
    <div className="map">
      <h1>Map</h1>
      <div className="map_ol" ref={mapRef}></div>
    </div>
  );
};
