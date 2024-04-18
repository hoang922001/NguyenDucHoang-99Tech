**Problem:** We need to build the server to increase score after the user do a valid action. And the score board will be updated in the realtime.
**Solution:** We need to validate the action of user and block the ip from malicious users. We will use message queue to execute asynchoronous. 

 - First, User will do an action and we will push the action increase user's score to message queue like SQS.
 - Then server will return status success to client after push the message into queue successfully.
 - Then, Server get the message from SQS and update user's score in database.
 - We will use Lambda Function trigger with SQS to calculate score and leaderboard. If leaderboard has change, it will update new leaderboard in Redis and emmit the message ''update leaderboard" to client.
 - Client will on the event "update leaderboard" and send a request to get new leaderboard in Redis.

**Infrastructure:** 

 - SQS: We use SQS to handle request asynchorous.
 - Database: We will use RDS to create replica database. We use primary database for insert and replica database for read. Also, when we can backup and database has high abilitiy
 - Lamda Function: We use Lambda Function to get message from SQS and calculate score then will update data in the Redis. We use Lamda Function as it will be auto scaled and we just pay as we go.
 - Redis: We will use Redis to store leaderboard, because it's read frequently and with low latency.
