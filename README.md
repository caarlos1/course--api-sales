## Criando container Postgres

    docker run --name postgres -e POSTGRES_PASSWORD=docker -p 65432:5432 -d postgres

## TypeORM
### Criando migration

    yarn typeorm migration:create -n CreateProducts

### Rodando migrations

    yarn typeorm migration:run

Será necessário adicionar ao banco de dados a extensão uuid-ossp.
