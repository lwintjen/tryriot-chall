# TryRiot Backend Challenge
## Build a metric logging and reporting service that sums metrics by time window for the most recent hour. You will build a lightweight web server that implements the two main APIs defined below.

I've been doing for fun the TryRiot Backend Challenge which wants to :

1. Create a expressJS app which will have multiple endpoints : 
    - GET /metrics/{key}/sum (returns the sum of a given key over the past hour)
    - POST /metrics/{key} (post a new key with a given value)

    In order to build this API, I'll store the data directly in the app. The data will be stored in an object `activeUsers`. Here's an example :

    ```
    POST ​/metrics/​active_visitors { ​"value"​ = ​4​ }
    // activeUsers : {active_visitors: [{value: 4, time: currentTime}]} 
    POST ​/metrics/​active_visitors { ​"value"​ = 6​ }
    // activeUsers : {active_visitors: [{value: 4, time: currentTime}, {value: 6, time: currentTime}]} 
    ```

    Each time we add a new value for a metric, we store the time as well. Indeed, as we want to return the sum over the past hour, we store the time when we added
    this value in the object. 

    There's a method running every 10seconds that will check if there are any values that need to be deleted from the object (based on the currentTime - timeStored).

    What packages did I use ?

        - express
        - node-cron (to run the method every 10seconds)
        - moment (to compute the difference between two times)

2. Build a SQL database schema based on this screenshot: