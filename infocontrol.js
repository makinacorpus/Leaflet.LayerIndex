L.Control.Information = L.Control.extend({
    options: {
        position: 'topright',
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-infocontrol leaflet-control-attribution');
        L.DomEvent.disableClickPropagation(this._container);

        map.on('moveend', function (e) {
            if (map._loaded) {
                var shown = map.search(map.getBounds());
                this._container.innerHTML = shown.length + ' objects shown.';
            }
        }, this);
        return this._container;
    },

    onRemove: function (map) {
        map.off('moveend');
    },
});
