# enterprise-level-be-express-bullmq-redis-sequelize-kafka

This is the how an actual enterprise level be folder looks like, it actually helps to understand how BE code is design in real applications

where we use :-
1- jswebtoken, bcrypt fpr authentication and password hashing
2- Sequelize for proper DB queries
3- Authorization based on role for task deletion
3- Indexing for queries optimization
4- BullMQ for heavy queue tasks handling
5- Redis for caching
6- basic rate limiting on login url(it has to be top level on api gateway level for better DOS handling)
7- Kafka for handling different service async communication 
8- Pino for proper logging of request
