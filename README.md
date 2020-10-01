# TryRiot Backend Challenge
### Build a metric logging and reporting service that sums metrics by time window for the most recent hour. You will build a lightweight web server that implements the two main APIs defined below.

I've been doing for fun the TryRiot Backend Challenge which wants to :

1. Create an expressJS app which will have multiple endpoints : 
    - GET /metrics/{key}/sum (returns the sum of a given key over the past hour)
    - POST /metrics/{key} (post a new key with a given value)

    In order to build this API, I'll store the data directly in the app. The data will be stored in an object `activeUsers`. Here's an example :

    ```
    POST ​/metrics/​active_visitors { ​"value"​ = ​4​ }
    // activeUsers : {active_visitors: [{value: 4, time: currentTime}]} 
    POST ​/metrics/​active_visitors { ​"value"​ = 6​ }
    // activeUsers : {active_visitors: [{value: 4, time: currentTime}, {value: 6, time: currentTime}]} 
    ```

    For each new value added for a metric, we store the time as well. 

    Why are we storing the time ?

      Because we use a cron job which is executed every 10seconds that filters if there are any values that need to be deleted from the object (currentTime - timeStored).

    What packages did I use ?

        - express
        - node-cron (to run the method every 10seconds)
        - moment (to compute the difference between two times)

2. Build a SQL database schema based on this screenshot:
![image](https://user-images.githubusercontent.com/43049559/94830354-c6b78780-040b-11eb-83a9-7a52968ab03a.png)

   The diagram is available [here](https://drawsql.app/none-81/diagrams/tryriot-backend-challenge)
