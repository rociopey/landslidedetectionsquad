# Tree Movement Detection for Landslide Risk Monitoring

A FastAPI application that uses [DeepForest](https://deepforest.readthedocs.io/en/latest/landing.html#) to detect trees in RGB images. 

The FastAPI app expects a georeferenced image (e.g. GeoTIFF) as an input (POST request). It then passes this image into DeepForest to generate predictions of tree objects within the scene. The bounding boxes of the tree objects are transformed to geographic coordinates and returned as GeoJSON data. 

## Install 

Install packages:

```
pip3 install -r requirements.txt
```

## Launch app locally

```
uvicorn main:app --reload
```


