# Web-apps : Public Transportation in Bandung City

This is the web-apps documentation, below here will be described the whole procedure to start the web-apps.
Before starting you need to have this application, as follows:

1. Geoserver
2. PostGreSQL version > 10
3. Extension PostGIS and pgrouting
4. gdal - ogr2ogr

We begin with preparing the data, the routing data store in the public folder with name "routeTransportBDG.geojson".
This data needs to be imported to the database, here is the instruction:

1. open postgresql and create database ['database-name']
2. create table name edgesbdg
3. create postgis and pgrouting to the table by clicking right the table and choose postgis and pgrouting
4. import the data using gdal - ogr2ogr <br>
   **ogr2ogr -select "name, trayek, trayekname, trayekcode, trayekcolor" -lco GEOMETRY_NAME=geom -lco FID=id -f PostGreSQL
   PG:"dbname='your databasename' user='postgres" password='' port='5432' host='localhost' -nln edgesbdg routeTransportBDG.geojson**
5. add 3, column source int4, target int4, and distance float8
6. create nodenetwork from the data <br> **select pgr_nodeNetwork('edgesbdg',0.00001);**
7. create topology <br> **select pgr-createToplogy('edgesbdg.noded',0.00001);**
8. add columns for name, trayek, trayekname, trayekcode, trayekcolor with varchar as the data type
9. update the edges_noded table
   <br> **update edgesbdg_noded as new set name=old.name, trayek=old.trayek, trayekname=old.trayekname, trayekcode=old.trayekcode, trayekcolor=old.trayek color from edgesbdg as old where new.old_id = old.id**
10. calculate the distance <br> **update edgesbdg_noded set distance=ST_Length(ST_Transform(geom, 4326)::geography)/1000** the unit is in km
    test the
11. random test <br> **select \* from pgr_dijkstra('select id, source, target, distance as cost from edgesbdg_noded',2,5,false);**

Now the node network and vertex data is ready, we need to import data from postgresql to geoserver for wfs/wms.
here is the procedure:

1. Create a workspace and postgis stores (in the details put the credential of your db which contain port, password, username)
2. Publish edgesbdg_noded and edgesbdg_noded_vertices
3. Create a customize sql layer, to make a POST url request we need to set up the query.
4. The first query is to search for nearby node from the selected coordinate, this query can be used <br>
   > **select v.id, v.the_geom from edgesbdg_noded_vertices_pgr as v, edgesbdg_noded as e where v.id = (select id from edgesbdg_noded_vertices_pgr order by the_geom <-> ST_SetSRID(ST_MakePoint(%x%, %y%), 4326) limit 1) and (e.source=v.id or e.target=v.id) group by v.id, v.the_geom** > <br> donot forget to add new parameters, x and y.
5. Set the src to EPSG:4326 and compute from srs bounds both for native bounding box and lat/lot bounding box
6. create another customer sql layer, the purpose is to generate the shortest path from the choosen vertex as the parameters are source and target.
7. Here is the query you can use <br>
   > **select min(r.seq) as seq, e.old_id as id, e.name, e.trayek, e.trayekid, e.trayekname, e.trayekcolor, sum(e.distance) as distance, ST_Collect(e.the_geom) as geom from pgr_dijkstra('select id, source, target, distance as cost from edgesbdg_noded', %source%, %target%, false) as r, edgesbdg_noded as e where r.edge=e.id group by e.old_id, e.name, e.trayek, e.trayekid, e.trayekname, e.trayekcolor**
   > donot forget to add source and target as the parameters.
8. Set the src to EPSG:4326 and compute from srs bounds both for native bounding box and lat/lot bounding box

For the last part you need to install all the dependencies from the node package, simply by:

1. npm install
2. npm run dev

Now you can use the web-apps!
