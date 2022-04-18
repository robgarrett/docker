# azurecli-docker
Docker images fpr Azure development. Includes Azure CLI and Az PowerShell module.
Also includes DOTNET SDK 3.1.

## Building a new image.
1. Log on to AMD64 machine with Linux containers.
2. Run `docker-compose build azuredev-amd64`.
3. Tag: `docker tag azuredev:amd64 robgarrett/azuredev:amd64` (replace robgarrett with your repo name).
4. Push: `docker push robgarrett/azuredev:amd64`.

## Running the image.
1. Log on to AMD64 machine with Linux containers.
2. Run `docker run -it robgarrett/azuredev:amd64`.

