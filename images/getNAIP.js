/*
 Google Earth Engine script to generate demo RGB images for landslide-prone areas of California from NAIP imagery.
*/

// get NAIP Image Collection
var naip = ee.ImageCollection('USDA/NAIP/DOQQ');
print(naip.first());

// get AOI
var aoi = ee.Geometry.Polygon(
        [[[-121.81154104110925, 36.323760876861996],
          [-121.81154104110925, 36.31973265122744],
          [-121.80671306488244, 36.31973265122744],
          [-121.80671306488244, 36.323760876861996]]], null, false);
Map.centerObject(aoi, 14);

// get 2018 Image
var naip2018 = naip
  .filterDate('2018-01-01', '2018-12-31')
  .mean()
  .clip(aoi)
  .select(['R', 'G', 'B'])
  .visualize({min: 0.0, max: 255.0});
  
Map.addLayer(naip2018, {}, 'naip2018');

Export.image.toDrive({
  image: naip2018, 
  description: 'naip_california_2018_1', 
  region: aoi, 
  scale: 0.1, 
  crs: 'EPSG:4326'
});

// get 2012 Image
var naip2012 = naip
  .filterDate('2012-01-01', '2012-12-31')
  .mean()
  .clip(aoi)
  .select(['R', 'G', 'B'])
  .visualize({min: 0.0, max: 255.0});
  
Map.addLayer(naip2012, {}, 'naip2012');

Export.image.toDrive({
  image: naip2012, 
  description: 'naip_california_2012_1', 
  region: aoi, 
  scale: 0.1, 
  crs: 'EPSG:4326'
});