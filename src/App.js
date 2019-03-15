import React, { Component } from "react";
import "./App.css";

let map, infoWindow;

class App extends Component {
  componentDidMount() {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNeksjt_QfncrS2CAgbajesDOvw02ulOs&callback=initMap"
    );
    window.initMap = this.initMap;
  }

  initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 6
    });

    infoWindow = new window.google.maps.InfoWindow();

    const navigator = window.navigator;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent(
            `You are here <br> latitude: ${pos.lat} <br> longitude: ${pos.lng}`
          );
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          this.handleLocationError(false, infoWindow, map.getCenter());
        }
      );
    } else {
      this.handleLocationError(false, infoWindow, map.getCenter());
    }
  };

  handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  };

  render() {
    return <div id="map" />;
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
