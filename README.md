### <span style="color:#7758E1">Rocketseat's Ignite Node.js Module // Project #02</span>

### 🚀 Daily Diet API

This challenge is about creating a RESTful API to control a daily diet. Here are the application's use cases:

[X] Create a user

[X] Idenfify the user when making a request

[X] Create a meal related to a user with the following informations: 

&nbsp;&nbsp;&nbsp;[X] Name 

&nbsp;&nbsp;&nbsp;[X] Description

&nbsp;&nbsp;&nbsp;[X] Date and time

&nbsp;&nbsp;&nbsp;[X] Let the user select if this meal is on a diet or not

[X] Update one or more fields of a meal

[X] Delete a meal

[X] List all meals of a user

[X] List a single meal

[X] Get metrics of a user by returning the following:

&nbsp;&nbsp;&nbsp;[X] Amount of meals

&nbsp;&nbsp;&nbsp;[X] Amount of meals on a diet

&nbsp;&nbsp;&nbsp;[X] Amount of meals off a diet

&nbsp;&nbsp;&nbsp;[X] Best day on a diet

[X] The user can only view, edit and delete meals which he created.

### 🎯 Running the App

Run the following command to start the project:

<code>npm run dev</code>

Now, with the server running locally using the port 3333, we are ready to make some requests.

### 🛜 Making Requests

* **<span style="color:#7758E1">Create a user</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#98CC41">POST</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/users
  * Body request must contain both **name** and **email** parameters. The **avatar** parameter is optional.
<br>

* **<span style="color:#7758E1">Create a meal</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#98CC41">POST</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/meals
  * Body request must contain **name**, **description**, **is_diet**, and **date** parameters.
<br>

* **<span style="color:#7758E1">Get meal by id</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#8C82C7">GET</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/meals/:id
<br>

* **<span style="color:#7758E1">Get all meals</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#8C82C7">GET</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/meals
<br>

* **<span style="color:#7758E1">Get meals' metrics</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#8C82C7">GET</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/meals/metrics
<br>

* **<span style="color:#7758E1">Update a meal</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#DF9331">PUT</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/meals/:id
  * Body request must contain at least one of the following parameters **name**, **description**, **is_diet**, and **date**.
<br>

* **<span style="color:#7758E1">Delete a meal</span>**
  * Method &nbsp; &nbsp;→&nbsp; **<span style="color:#CE5337">DELETE</span>**
  * Endpoint &nbsp;→&nbsp; http://localhost:3333/meals/:id
<br>

### 🧪 Running the App's Tests

Run the following command to run the tests:

<code>npm test</code>

