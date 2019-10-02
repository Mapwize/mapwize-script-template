/**
 * This script is template for mapwize-node-api
 */
'use strict';

const _ = require('lodash')
const commander = require('commander');
const chalk = require('chalk');
const MapwizeApi = require("mapwize-node-api");
const process = require('process');

commander
    .option("-o, --organizationId <organizationId>", "Mapwize Organization ID")
    .option("-v, --venueId <venueId>", "Mapwize Venue ID")
    .option("-a, --apiKey <apiKey>", "Mapwize API KEY")
    .option("-s, --serverUrl <server>", "Mapwize Server URL")
    .option("-u, --mapwizeEmail <email>", "Mapwize user email")
    .option("-p, --mapwizePwd <pwd>", "Mapwize user password")
    .option("-f, --filepath <path>", "XlSX file path with booths")
    .parse(process.argv);


if (!commander.organizationId || !commander.venueId || !commander.apiKey) {
    console.log(chalk.red("Arguments --organizationId, --venueId, --apiKey are required"));
    process.exit(1);
}

let apiKey = commander.apiKey
let organizationId = commander.organizationId
let venueId = commander.venueId
let serverUrl = commander.serverUrl
let layerId = 'string'
let placeId = 'string'
let placeListId = 'string'

let universe = {}
let venue = {}
let layer = {}
let place = {}
let placeList = {}

let topLeft = {}
let topRight = {}
let bottomLeft = {}
let bottomRight = {}

/**
 * Create a MapwizeApi instance
 * serverUrl the server url to use. Default to production server at https://api.mapwize.io
 * @constructor
 */

const mapwizeAPI = new MapwizeApi(apiKey, organizationId, { serverUrl: serverUrl || 'http://localhost:3000' });


module.exports = (async () => {
    try {

        // Universe
        console.log(chalk.blue("- Get all unviverses"))
        const universes = await mapwizeAPI.getUniverses()

        console.log(chalk.blue("- Create a universe"))
        const createdUniverse = await mapwizeAPI.createUniverse(universe)

        console.log(chalk.blue("- Update a universe"))
        const updatedUniverse = await mapwizeAPI.updateUniverse(universe)
                

        // Venue
        console.log(chalk.blue("- Get all venues"))
        const venues = await mapwizeAPI.getVenues()

        console.log(chalk.blue("- Get a venue"))
        const _venue = await mapwizeAPI.getVenue(venueId)

        console.log(chalk.blue("- Create a venue"))
        const createdVenue = await mapwizeAPI.createVenue(venue)

        console.log(chalk.blue("- Update a venue"))
        const updatedVenue = await mapwizeAPI.updateVenue(venue)


        // Layer
        console.log(chalk.blue("- Get a venue layers"))
        const layers = await mapwizeAPI.getVenueLayers(venueId)

        console.log(chalk.blue("- Create a layer"))
        const createdLayer = await mapwizeAPI.createLayer(layer)

        console.log(chalk.blue("- Upload a layer image"))
        [topLeft, topRight, bottomLeft, bottomRight] = layer.importJob.corners
        await mapwizeAPI.uploadLayerImage(layerId, readStream, topLeft, topRight, bottomLeft, bottomRight)

        console.log(chalk.blue("- Update a layer"))
        const updatedLayer = await mapwizeAPI.updateLayer(layer)
        
        console.log(chalk.blue("- Delete a layer"))
        await mapwizeAPI.deleteLayer(layerId)


        // Place
        console.log(chalk.blue("- Get a venue places"))
        const places = await mapwizeAPI.getVenuePlaces(venueId)

        console.log(chalk.blue("- Create a place"))
        const createdPlace = await mapwizeAPI.createPlace(place)

        console.log(chalk.blue("- Update a place"))
        const updatedPlace = await mapwizeAPI.updatePlace(place)
        
        console.log(chalk.blue("- Delete a place"))
        await mapwizeAPI.deletePlace(placeId)


        // PlaceList
        console.log(chalk.blue("- Get a venue placeLists"))
        const placeLists = await mapwizeAPI.getVenuePlaceLists(venueId)

        console.log(chalk.blue("- Create a placeList"))
        const createdPlaceList = await mapwizeAPI.createPlaceList(placeList)

        console.log(chalk.blue("- Update a placeList"))
        const updatedPlaceList = await mapwizeAPI.updatePlaceList(placeList)
        
        console.log(chalk.blue("- Delete a placeList"))
        await mapwizeAPI.deletePlaceList(placeListId)


        // Beacon
        // Connector
        // RouteGraph
        // PlaceSource

        console.log('DONE!')
    } catch (error) {
        console.log('ERR', error)
    } 
})();
