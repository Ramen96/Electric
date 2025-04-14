import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function MapComponent() {
  useEffect(() => {
    console.log(window.innerWidth);
  }, []);
  return /* @__PURE__ */ jsxs(
    MapContainer,
    {
      center: [35.2705877, -81.104609],
      zoom: 9,
      style: { height: "100%", width: "100%" },
      children: [
        /* @__PURE__ */ jsx(
          TileLayer,
          {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        ),
        /* @__PURE__ */ jsx(Marker, { position: [35.2705877, -81.104609], children: /* @__PURE__ */ jsxs(Popup, { children: [
          "Charlotte, NC",
          /* @__PURE__ */ jsx("br", {}),
          "Our service area"
        ] }) })
      ]
    }
  );
}
export {
  MapComponent as default
};
