**1. Setting up MongoDB Atlas Connection:**

- Create an account and a cluster on MongoDB Atlas.
- Retrieve the MongoDB URI from MongoDB Atlas and set it up in your application's environment variables as MONGO_URI.
- Replace `<password>`, `<dbname>`, and `<your-cluster-url>` with your actual MongoDB password, desired database name, and cluster URL respectively in the MONGO_URI.

**2. Starting the Server:**

- Open a terminal window in the root directory of your Node.js application.
- Run `npm start`. This should start your server on localhost on a specific port, often `5000`.

**3. Installing Postman:**

- Download and install the Postman REST client from https://www.postman.com/product/rest-client/.

**4. Testing Register API Endpoint:**

- Open Postman.
- Set HTTP method to `POST`.
- Set the URL to `http://localhost:5000/api/users/register`.
- In the 'Body' tab, select 'raw' and then 'JSON (application/json)'.
- Input the following data:

```json
{
  "name": "Example",
  "email": "example123@gmail.com",
  "password": "123456"
}
```

- Click 'Send'.

**5. Testing Login API Endpoint:**

- Set HTTP method to `POST`.
- Set the URL to `http://localhost:5000/api/users/login`.
- In the 'Body' tab, select 'raw' and then 'JSON (application/json)'.
- Input the following data:

```json
{
  "email": "example123@gmail.com",
  "password": "123456"
}
```

- Click 'Send'.
- Copy the "token" and "userId" from the response. These will be used for future requests.

**6. Testing Movie API Endpoints:**

- **6.1 Adding a New Movie without Token:**

  - Set HTTP method to `POST`.
  - Set the URL to `http://localhost:5000/api/movie`.
  - In the 'Body' tab, select 'raw' and then 'JSON (application/json)'.
  - Input the following data:

  ```json
  {
    "title": "the terminator",
    "description": "some description...",
    "creator": "<replace-with-your-userId>"
  }
  ```

  - Click 'Send'. You should receive an error message about missing token.

- **6.2 Adding a New Movie with Token:**

  - Set HTTP method to `POST`.
  - Set the URL to `http://localhost:5000/api/movie`.
  - In the 'Headers' tab, add a new key 'x-auth-token' and put the token you received from the login response as a value.
  - In the 'Body' tab, select 'raw' and then 'JSON (application/json)'.
  - Input the same data as before, replacing "creator" with your actual "userId".
  - Click 'Send'. You should receive a response indicating the movie was added.

- **6.3 Getting a Movie by ID:**

  - Set HTTP method to `GET`.
  - Set the URL to `http://localhost:5000/api/movie/<replace-with-movieId>`.
  - Click 'Send'. You should receive the movie data in the response.

- **6.4 Getting All Movies:**

  - Set HTTP method to `GET`.
  - Set the URL to `http://localhost:5000/api/movie`.
  - Click 'Send'. You should receive a list of all movies in the response.

- **6.5 Updating a Movie:**

  - Set HTTP method to `PATCH`.
  - Set the URL to `http://localhost:5000/api/movie/<replace-with-movieId>`.
  - In the 'Body' tab, select 'raw' and then 'JSON (application/json)'.
  - Input the following data:

  ```json
  {
    "title": "the terminator updated",
    "description": "some description...",
    "creator": "<replace-with-your-userId>"
  }
  ```

  - Click 'Send'. You should receive a response indicating the movie was updated.

- **6.6 Deleting a Movie:**
  - Set HTTP method to `DELETE`.
  - Set the URL to `http://localhost:5000/api/movie/<replace-with-movieId>`.
  - Click 'Send'. You should receive a response indicating the movie was removed.

After performing all these steps, you should be able to check MongoDB Atlas to see that the user and movie data were added, updated, or deleted as expected. Make sure to replace `<replace-with-your-userId>` and `<replace-with-movieId>` with the actual IDs in your database.
