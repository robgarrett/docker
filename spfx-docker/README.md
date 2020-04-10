# spfx-docker
Docker images that run Azure Cli (including ARM builds).

## Building a new multi-platform image.
1. Log on to AMD64 machine with Linux containers.
2. Run `docker-compose build spfx-dev-amd64`.
3. Tag: `docker tag robgarrett/spfx-dev:amd64` (replace robgarrett with your repo name).
4. Push: `docker push robgarrett/spfx-dev:amd64`.
5. Log onto Windows (Windows Containers).
6. Run `docker-compose build spfx-dev-x86-64`.
7. Tag: `docker tag robgarrett/spfx-dev:x86-64` (replace robgarrett with your repo name).
8. Push: `docker push robgarrett/spfx-dev:x86-64`.
9. Run `docker manifest create robgarrett/spfx-dev:latest robgarrett/spfx-dev:arm64 robgarrett/spfx-dev:x86-64` (replace robgarrett with your repo name).
10. Run `docker manifest annotate robgarrett/spfx-dev:latest robgarrett/spfx-dev:x86-64 --arch windows/x86-64`.
11. Push: `docker manifest push robgarrett/spfx-dev:latest`.
