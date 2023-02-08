import { createServiceFactory, SpectatorService } from "@ngneat/spectator";
import { ThemeService } from "./theme.service";

describe('ThemeService', () => {
  let spectator: SpectatorService<ThemeService>;
  const createService = createServiceFactory(ThemeService);

  beforeEach(() => spectator = createService());

  it('initially sets theme to light', () => {
    expect(spectator.service.dark).toBeFalse();
  });

  it('toggles theme', () => {
    spectator.service.toggleTheme();

    expect(spectator.service.dark).toBeTrue();
  });
});
