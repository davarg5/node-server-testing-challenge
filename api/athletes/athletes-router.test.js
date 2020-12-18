const request = require('supertest');
const server = require('./../server');
const db = require('./../../data/dbConfig');

const lamar = { name: 'Lamar Jackson', sport: 'football' };
const fernando = { name: 'Fernando Tatis', sport: 'baseball' };
const lebron = { name: 'Lebron James', sport: 'baskeball' };

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('athletes').truncate()
})
afterAll(async () => {
    await db.destroy()
})

describe('endpoints', () => {
    describe('[GET] /athletes', () => {
        it('responds with 200 OK', async () => {
            const res = await request(server).get('/api/athletes');
            expect(res.status).toBe(200);
        })
        it('responds with athletes if athletes', async () => {
            await db('athletes').insert(lamar);
            let res = await request(server).get('/api/athletes');
            expect(res.body).toHaveLength(1);
            await db('athletes').insert(lebron);
            res = await request(server).get('/api/athletes');
            expect(res.body).toHaveLength(2);
            expect(res.body[0]).toMatchObject(lamar);
            expect(res.body[1]).toMatchObject(lebron);
        })
        it('responds with empty array if no athletes', async () => {
            const res = await request(server).get('/api/athletes');
            expect(res.status).toBe(200);
        }) 
    })
    describe('[POST] /athletes', () => {
        it('returns the newly created athlete', async() => {
            const res = await request(server).post('/api/athletes').send(lamar);
            expect(res.body.id).toBe(1);
            expect(res.body.name).toBe('Lamar Jackson')
        })
        it('fails to create same athlete twice', async() => {
            await request(server).post('/api/athletes').send(lamar);
            const res = await request(server).post('/api/athletes').send(lamar);
            expect(res.status).toBe(500);
        })
    })
    describe('[DELETE] /athletes/:id', () => {
        it('deletes athlete with given id', async() => {
            await request(server).post('/api/athletes').send(lamar);
            let res = await request(server).get('/api/athletes');
            expect(res.body).toHaveLength(1);
            await request(server).delete('/api/athletes/1');
            res = await request(server).get('/api/athletes');
            expect(res.body).toHaveLength(0);
        }) 
        it('responds with a 404 if id is invalid', async() => {
            await request(server).post('/api/athletes').send(lamar);
            let res = await request(server).delete('/api/athletes/3');
            expect(res.status).toBe(404); 
        }) 
    })
})
