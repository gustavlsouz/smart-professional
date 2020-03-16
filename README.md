# smart-professional

curl -X POST \
  http://localhost:8080/querying \
  -H 'Content-Type: application/graphql' \
  -H 'Postman-Token: 80349c07-4a23-4cc5-abd8-b78d629c4bed' \
  -H 'cache-control: no-cache' \
  -d 'query { plans(url: "https://www.smartmei.com.br/") { consultationDate description tariffs {  EUR BRL USD description } } }'

