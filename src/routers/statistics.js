const express = require('express');
const MapService = require('../services/MapService');
const StatisticsController = require('../controllers/StatisticsController');

const Op = require('sequelize').Op;

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.from && req.query.to) {
        await StatisticsController.distrobution(req.query.from, req.query.to);
        await res.send('sucess');
    } else {
        await res.status(400).send('invalid');
    }
});

router.get('/distribution', async (req, res) => {
    const {
        warning = false,
        category = false,
        municipality,
        startDate = '2000-01-01',
        endDate = new Date(Date.now() + 1 * 24 * 3600 * 1000)
            .toISOString()
            .split('T')[0],
        dateFormat = '%Y-%m',
    } = req.query;

    let whereAddOn = {};

    // Municipality filter
    if (municipality) {
        let locationIdsFromMunicipality = await MapService.location.retrieve({
            municipality,
        });

        if (
            locationIdsFromMunicipality instanceof Array &&
            locationIdsFromMunicipality.length > 0 &&
            locationIdsFromMunicipality[0].id !== undefined
        ) {
            locationIdsFromMunicipality = locationIdsFromMunicipality.map(
                it => it.id
            );
            whereAddOn.locationId = { [Op.in]: locationIdsFromMunicipality };
        } else {
            res.status(500).send({
                error: 'Server could not get warningIds from municipality',
            });
        }
    }

    // Filters should be done by now, starting to fetch data to return
    let output = {};

    if (warning) {
        output.warning = await StatisticsController.warningDistribution(
            startDate,
            endDate,
            dateFormat,
            whereAddOn
        );
    }

    if (category) {
        output.category = await StatisticsController.categoryDistribution(
            startDate,
            endDate,
            whereAddOn
        );
    }

    res.send(output);
});

router.get('/count', async (req, res) => {
    let {
        municipality,
        startDate = ['2000-01-01'],
        endDate = new Date(Date.now() + 1 * 24 * 3600 * 1000)
            .toISOString()
            .split('T')[0],
        status,
    } = req.query;

    if (!(startDate instanceof Array)) startDate = [startDate];

    let whereAddOn = {};

    // Municipality filter
    if (municipality) {
        let locationIdsFromMunicipality = await MapService.location.retrieve({
            municipality,
        });

        if (
            locationIdsFromMunicipality instanceof Array &&
            locationIdsFromMunicipality.length > 0 &&
            locationIdsFromMunicipality[0].id !== undefined
        ) {
            locationIdsFromMunicipality = locationIdsFromMunicipality.map(
                it => it.id
            );
            whereAddOn.locationId = { [Op.in]: locationIdsFromMunicipality };
        } else {
            res.status(500).send({
                error: 'Server could not get warningIds from municipality',
            });
        }
    }

    // Status filter
    if (status) {
        whereAddOn.latestStatusType = status;
    }

    const result = await Promise.all(
        startDate.map(
            async it =>
                await {
                    date: it,
                    ...(await StatisticsController.countWarnings(
                        it,
                        endDate,
                        whereAddOn
                    )),
                }
        )
    );

    res.send(result);
});

module.exports = router;
