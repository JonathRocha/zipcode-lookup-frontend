import { isFetchingAddress, searchHistory, useAddressSearch } from "@/hooks/useAddressSearch";
import { useReactiveVar } from "@apollo/client";
import { Feature, Map as OlMap, View } from "ol";
import { Point } from "ol/geom";
import { Tile, Vector as VectorTile } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { OSM, Vector } from "ol/source";
import { Icon, Style } from "ol/style";
import { useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import "@/pages/map/styles.scss";

export const Map = () => {
  const { countryCode, zipCode } = useParams();
  const { search } = useAddressSearch();
  const addressHistory = useReactiveVar(searchHistory);
  const isLoading = useReactiveVar(isFetchingAddress);
  const mapRef = useRef();

  const selectedAddress = useMemo(
    () =>
      addressHistory.find(
        ({ postCode: addressZipCode, countryCode: addressCountryCode }) =>
          addressZipCode === zipCode && addressCountryCode === countryCode,
      ),
    [addressHistory, zipCode],
  );

  useEffect(
    function checkIfNeedToLoadAddress() {
      if (!selectedAddress) {
        search(zipCode, countryCode);
      }
    },
    [selectedAddress, search],
  );

  useEffect(
    function loadMap() {
      if (!selectedAddress) return;

      const coordinates = fromLonLat([Number(selectedAddress.longitude), Number(selectedAddress.latitude)]);
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

  if (isLoading && !selectedAddress) {
    return (
      <div className="map">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!selectedAddress && !isLoading) {
    return (
      <div className="map">
        <h1>{"Sorry, we couldn't find an address."}</h1>

        <Link className="map_link" to="/">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="map">
      <header className="map_header">
        <Link className="map_header--link" to="/">
          Back to home
        </Link>
        <h1>
          {selectedAddress.placeName}, {selectedAddress.state} {selectedAddress.postCode} - {selectedAddress.country}
        </h1>
      </header>
      <div className="map_ol" ref={mapRef} />
    </div>
  );
};
