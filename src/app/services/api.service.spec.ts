import { createHttpFactory, HttpMethod, SpectatorHttp} from '@ngneat/spectator';
import { BASE_URL } from '../app.module';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let spectator: SpectatorHttp<ApiService>;
  const baseUrl = 'http://localhost:8080';
  const createService = createHttpFactory({
    service: ApiService,
    providers: [{ provide: BASE_URL, useValue: baseUrl }]
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('sends GET request to fetch all', () => {
    spectator.service.getAll().subscribe();

    spectator.expectOne(`${baseUrl}/todos`, HttpMethod.GET);
    spectator.controller.verify();
  })

  it('sends DELETE request on delete with id', () => {
    const id = 1;
    spectator.service.delete(id).subscribe();

    spectator.expectOne(`${baseUrl}/todos/${id}`, HttpMethod.DELETE);
    spectator.controller.verify();
  });

  it('sends PUT request on update', () => {
    const update = { id: 1 };
    spectator.service.update(update).subscribe();

    spectator.expectOne(`${baseUrl}/todos/${update.id}`, HttpMethod.PUT);
    spectator.controller.verify();
  });

  it('sends GET request with id on get one', () => {
    const id = 123;
    spectator.service.getOne(id).subscribe();

    spectator.expectOne(`${baseUrl}/todos/${id}`, HttpMethod.GET);
    spectator.controller.verify();
  })
});
