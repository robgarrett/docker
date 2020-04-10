# azurecli-docker
Docker images that run Azure Cli (including ARM builds).

## Building a new multi-platform image.
1. Log on to AMD64 machine with Linux containers.
2. Run `docker-compose build azure-cli-amd64`.
3. Tag: `docker tag robgarrett/azure-cli:amd64` (replace robgarrett with your repo name).
4. Push: `docker push robgarrett/azure-cli:amd64`.
5. Log onto Raspberry Pi Arm 7.
6. Run `docker-compose build azure-cli-arm`.
7. Tag: `docker tag robgarrett/azure-cli:arm` (replace robgarrett with your repo name).
8. Push: `docker push robgarrett/azure-cli:arm`.
9. Run `docker manifest create robgarrett/azure-cli:latest robgarrett/azure-cli:amd64 robgarrett/azure-cli:arm` (replace robgarrett with your repo name).
10. Run `docker manifest annotate robgarrett/azure-cli:latest robgarrett/azure-cli:arm --arch arm`.
11. Push: `docker manifest push robgarrett/azure-cli:latest`.
