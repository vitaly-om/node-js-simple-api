module.exports = function configureEntityController(app, storage) {
    app.get('/entities', (request, response) => {
        response.type('application/json');
        storage.getAll().then((result) => {
            response.send(JSON.stringify(result));
        });
    });

    app.post('/entities', (request, response) => {
        const entityData = request.body;
        const id = entityData.id;
        const text = entityData.text;
        const author = entityData.author;

        if (!id || !text || !author) {
            response.status(400);
            response.send('Incorrect entity data');
            return;
        }

        storage.createEntity(id, text, author).then(() => {
           response.status(200);
           response.send('Created');
        });
    });

    app.delete('/entities', (request, response) => {
       const entityId = request.query.id;

       if (!entityId) {
           response.status(400);
           response.send('No entityId');
       } else {
           storage.removeEntity(Number.parseInt(entityId));
           response.status(200);
           response.send('Removed');
       }
    });
};
