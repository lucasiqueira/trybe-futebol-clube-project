import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { mockIdTeamNotFound, mockIdTeamSuccesful, mockTeam, mockTeams } from './mocks/teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando as rodas do endpoint /teams', () => {
  it('Rota GET /teams deve receber todos os times cadastrados', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(mockTeams as any);

    const serviceResponse = await chai.request(app).get('/teams');

    expect(serviceResponse.status).to.be.equal(200);
    expect(serviceResponse.body).to.be.deep.equal(mockTeams);
  })

  it('Rota GET /teams/:id deve retornar NOT FOUND se ID for não cadastrado', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const serviceResponse = await chai.request(app).get(`/teams/${mockIdTeamNotFound}`)

    expect(serviceResponse.status).to.be.equal(404);
    expect(serviceResponse.body).to.be.deep.equal({
      message: 'ID not found',
    })
  })

  it('Rota GET /teams/:id deve retornar time se ID for cadastrado', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mockTeam as any);

    const serviceResponse = await chai.request(app).get(`/teams/${mockIdTeamSuccesful}`)

    expect(serviceResponse.status).to.be.equal(200);
    expect(serviceResponse.body).to.be.deep.equal(mockTeam);
  })

  afterEach(() => {
    sinon.restore();
  })
});
