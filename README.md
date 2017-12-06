Leaflet.LayerIndex
==================

Efficient spatial index for Leaflet layers. It works recursively
for ``L.FeatureGroup`` objects.

Requires the Magnificient [RTree.js](https://github.com/imbcmdth/RTree)

Check out the [live demo](http://makinacorpus.github.io/Leaflet.LayerIndex/)

Usage
-----

### On L.Map objects

```

    L.Map.include(L.LayerIndexMixin);

    var map = L.map(...);
    ...
    var layer = L.GeoJSON(data).addTo(map);
    map.indexLayer(layer);

    // Search visible features for example
    map.on('moveend', function () {
        var shown = map.search(map.getBounds());
        console.log(shown.length + ' objects shown.');
    });

    // remove the spatial index when the layer is unused
    map.unindexLayer(layer);
```

`map.unindexLayer()` function accepts an `options` object as an optional second parameter to define the bounds to be removed from the index. It should have one of the following attributes:
* `options.bounds`  - a leaflet latLngBounds object
* `options.latlng`  - a leaflet latLng object
* `options.latlngs` - an array of leaflet latLng objects

If no option is provided, the function will use the bounds of the layer's geometry.

### Using inherited class

```

    L.IndexedGeoJSON = L.GeoJSON.extend({
        includes: L.LayerIndexMixin,

        initialize: function (geojson, options) {
            // Decorate onEachFeature to index layers
            var onEachFeature = function (geojson, layer) {
                this.indexLayer(layer);
                if (this._onEachFeature) this._onEachFeature(geojson, layer);
            };
            this._onEachFeature = options.onEachFeature;
            options.onEachFeature = L.Util.bind(onFeatureParse, this);

            // Parent initialization
            L.GeoJSON.prototype.initialize.call(this, geojson, options);
        },

        removeLayer: function (layer) {
          if (this.hasLayer(layer)) {
            this.unindexLayer(layer)
          }
          return window.L.GeoJSON.prototype.removeLayer.call(this, layer)
        }
    });


    var layer = L.IndexedGeoJSON(data).addTo(map);

    var aroundToulouse = layer.searchBuffer(L.latLng([43.60, 1.44]), 0.1);

```


Changelog
-------

### 0.0.2

* Add bower.json

### 0.0.1

* Initial version


Authors
-------

[![Makina Corpus](http://depot.makina-corpus.org/public/logo.gif)](http://makinacorpus.com)
