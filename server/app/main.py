from deepforest import main as main_df
from deepforest import get_data
from deepforest import utilities 
from fastapi import FastAPI, File, UploadFile, Request, status
from fastapi.responses import HTMLResponse, RedirectResponse

import json
import os
import tempfile
import rasterio

from predict_trees import predict_trees

# create fastAPI app instance
app = FastAPI()

# end point to receive user supplied image
@app.post("/upload")
async def predict_trees(upload_file: UploadFile = File(...)):

    # deepforest prediction object
    model = main_df.deepforest()
    model.use_release()

    # write uploaded file to temp dir
    tmp_dir = tempfile.TemporaryDirectory()
    upload_path = os.path.join(tmp_dir.name, upload_file.filename)
    print(upload_path)

    upload_file.file.seek(0)
    with open(upload_path, 'wb+') as f:
        print('writing upload file to temp')
        content = upload_file.file.read()
        f.write(content)

    # predict trees from user image and get coordinates for bounding box for each tree in image
    tree_bbox = model.predict_tile(
        upload_path,
        return_plot=False, 
        patch_size=1500,
        patch_overlap=0.25
    )

    # get image projection info
    img = get_data(upload_path)
    r = rasterio.open(img)
    transform = r.transform 
    crs = r.crs

    # transform image coordinates for tree extent to lat and lon
    tree_out = utilities.annotations_to_shapefile(
        tree_bbox, 
        transform=transform, 
        crs=crs
    )
    
    # geojson of tree detections
    return(tree_out)
