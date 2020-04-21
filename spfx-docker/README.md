# spfx-docker
Docker images that run SharePoint Framework.

## Building a new multi-platform image.
1. Log on to AMD64 machine with Linux containers.
2. Run `docker-compose build spfx-dev`.
3. Tag: `docker tag robgarrett/spfx-dev:latest` (replace robgarrett with your repo name).
4. Push: `docker push robgarrett/spfx-dev:latest`.

