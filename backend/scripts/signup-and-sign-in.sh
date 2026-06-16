curl -X POST http://localhost:8080/api/auth/signup -H "Content-Type: application/json" -d '{
    "email": "test@test.com",
    "password": "testtest",
    "role": "user"
  }'

curl -X POST http://localhost:8080/api/auth/signin -H "Content-Type: application/json" -d '{
    "email": "test@test.com",
    "password": "testtest",
  }'
