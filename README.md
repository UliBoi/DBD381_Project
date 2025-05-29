# Github Link

https://github.com/UliBoi/DBD381_Project

# DBD381 Distributed NoSQL E-Commerce Backend

This project implements a **distributed NoSQL MongoDB replica set** for an e-commerce marketplace, developed as part of the DBD371/381 assessment. It features schema design, Express.js routing, testing, performance metrics, and high-availability via MongoDB replication.

---

## Technologies Used

- MongoDB (Replica Set with 3 Nodes)
- Mongoose (ODM)
- Express.js
- Node.js
- Artillery (Performance Testing)
- MongoDB Compass / mongosh
- Postman

---

## Project Structure
ecommerce-backend/
│
├── models/
│ ├── Product.js
│ ├── User.js
│ ├── Order.js
│ └── Review.js
│
├── server.js # Express API with routes to insert test data
├── test.js # Bulk insert performance script
├── init_Replicas.js # Replica set initialization script
└── load-test.yml # Artillery performance test definition

---

## MongoDB Replica Set Configuration

- **Replica Set Name**: `rs0`
- **Nodes**:
  - PRIMARY: `localhost:27117`
  - SECONDARY 1: `localhost:27118`
  - SECONDARY 2: `localhost:27119`

Start each node with:
```bash
mongod --dbpath mongo-replica/rsX --port 2711X --replSet rs0 --bind_ip localhost


Initiate the replica set using:

rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27117" },
    { _id: 1, host: "localhost:27118" },
    { _id: 2, host: "localhost:27119" }
  ]
});

## API Endpoints

| Route         | Method | Description         |
|---------------|--------|---------------------|
| `/`           | GET    | Server heartbeat    |
| `/add-product`| GET    | Insert test product |
| `/add-user`   | GET    | Insert test user    |
| `/add-order`  | GET    | Insert test order   |
| `/add-review` | GET    | Insert test review  |

---

## Performance Testing Summary

| Metric                      | Your Result             | Expected          |
|-----------------------------|--------------------------|-------------------|
| Insert Latency (1 doc)      | ~210ms (Postman)         | 20–80ms           |
| Read Latency (Indexed Field)| 2ms (`explain("stats")`) | <20ms             |
| Bulk Insert Throughput      | 4587 docs/sec            | ~1000 docs/sec    |
| Failover Switch Time        | 4–6 seconds              | 2–15 seconds      |

Performance is solid. Failover behaves as expected and demonstrates high availability.

---

## Known Challenges

- Had to delete all replica folders to enable replication (`--replSet` metadata lock issue)
- Resolved replication by switching to ports `27117–27119` due to caching conflicts on port `27017`
- Mongoose model names are auto-lowercased and pluralized (e.g., `Product` → `products`)

---

## How to Run

1. Start each replica node using three separate terminals:
   ```bash
   mongod --dbpath mongo-replica/rs1 --port 27117 --replSet rs0 --bind_ip localhost
   mongod --dbpath mongo-replica/rs2 --port 27118 --replSet rs0 --bind_ip localhost
   mongod --dbpath mongo-replica/rs3 --port 27119 --replSet rs0 --bind_ip localhost

2. Open a fourth terminal and initialize the replica set:
    ```bash
    mongosh --port 27117
    load("init_Replicas.js")

3. Start the Express backend:
    ```bash
    node server.js

4. Test endpoints using:

    Your browser (http://localhost:3000)
    Postman or curl