## API Reference

### Documentation of your public API. https://docs.google.com/document/d/1Y0ryWs3JGa9AAh2akDfyhTMANjJ5D8nSh9iElVN5LNI/edit

API URL: https://jaypay-lego-api.herokuapp.com

### 1.Admin

### a. Create an admin with given values

POST {{BASE_URL}}/api/admins?ajhed=test1&first_name=First&last_name=Last

raw(JSON):
{
   "jhed": "test1",
   "firstName": "First",
   "lastName": "Last"
}

|      Parameter       |     Type        |       Description         |
| -------------------- | --------------- | ------------------------- |
|        jhed          | varchar(20)     | Required: unique jhed id  |

Sample Response:
	{
   "data": {
       "ajhed": "test1",
       "first_name": "First",
       "last_name": "Last"
   }
}

### b. Read all admins in DB

GET {{BASE_URL}}/api/admins

|      Parameter       |     Type        |       Description         |
| -------------------- | --------------- | ------------------------- |
|        NA            |        NA       |           NA              |


Sample Response:
{
   "data": [
       {
           "ajhed": "sstone32",
           "first_name": "Safah",
           "last_name": "Stone"
       },
       {
           "ajhed": "eturnbull95",
           "first_name": "Emilis",
           "last_name": "Turnbull"
       },
       {
           "ajhed": "smansell69",
           "first_name": "Suzanna",
           "last_name": "Mansell"
       },
       {
           "ajhed": "smoon56",
           "first_name": "Saeed",
           "last_name": "Moon"
       }
   ]
}


### c. Read an admin with given jhed

GET {{BASE_URL}}/api/admins/:jhed

|      Parameter       |     Type        |       Description         |
| -------------------- | --------------- | ------------------------- |
|        jhed          | varchar(20)     | Required: unique jhed id  |

	
Sample Response:
{
   "data": {
       "ajhed": "sstone32",
       "first_name": "Safah",
       "last_name": "Stone"
   }
}


### d. Update the name of an admin with the given jhed with the given name

PATCH {{BASE_URL}}/api/admins?jhed=japple&first_name=Jack&last_name=Appleseed

|      Parameter       |     Type        |       Description             |
| -------------------- | --------------- | ----------------------------- |
|        jhed          | varchar(20)     | Required: unique jhed id      |
|    first_name        | varchar(50)     | Optional: Admin’s first name  |
|    last_name         | varchar(50)     | Optional: Admin’s first name  |

Sample Response:
{
   "data": {
       "ajhed": "japple1",
       "first_name": "Jack",
       "last_name": "Appleseed"
   }
}

### e. Delete an admin with the given jhed

DELETE {{BASE_URL}}/api/admins/:jhed

|      Parameter       |     Type        |       Description         |
| -------------------- | --------------- | ------------------------- |
|        jhed          | varchar(20)     | Required: unique jhed id  |

Sample Response:
{
   "data": {
       "ajhed": "japple1",
       "first_name": "Jack",
       "last_name": "Appleseed"
   }
}

### 2.Department

### a. Create a department with the given title

POST {{BASE_URL}}/api/departments?title=Department of Biotechnology
raw(JSON):
{
   "title": "Department of Biotechnology"
}

|      Parameter       |     Type        |       Description         |
| -------------------- | --------------- | ------------------------- |
|        title         |    varchar(50)  | Required: Department title|

Sample Response:
{
   "data": {
       "department_title": "Department of Biotechnology"
   }
}

	
###b. Read all departments in DB

GET {{BASE_URL}}/api/departments

|      Parameter       |     Type        |       Description         |
| -------------------- | --------------- | ------------------------- |
|        NA            |        NA       |           NA              |

Sample Response:
	{
   "data": [
       {
           "department_title": "Applied Mathematics and Statistics"
       },
       {
           "department_title": "Biomedical Engineering"
       },
       {
           "department_title": "Chemical and Biomedical Engineering"
       },
       {
           "department_title": "Civil and Systems Engineering"
       },
       {
           "department_title": "Computer Science"
       },
       {
           "department_title": "Electrical and Computer Engineering"
       },
       {
           "department_title": "Environmental Health and Engineering"
       },
       {
           "department_title": "Materials Science and Engineering"
       },
       {
           "department_title": "Mechanical Engineering"
       }
   ]
}

### c. Read a department with the given title
GET {{BASE_URL}}/api/departments/:title

|      Parameter       |     Type        |       Description         |
| -------------------- | --------------- | ------------------------- |
|        title         |    varchar(50)  | Required: Department title|

Sample Response:
{
   "data": {
       "department_title": "Computer Science"
   }
}

### d. Update the title of a department by the given existing and new name
PATCH {{BASE_URL}}/api/departments?title=Department of Object Oriented Software Engineering&toTitle=Department of OOSE


Parameter      - Type                  - Description
title                 - varchar(50)        - Required: Department title to be replaced
toTitle	      - varchar(50)        - Required: Department title to be replaced 

|      Parameter       |     Type        |       Description                        |
| -------------------- | --------------- | ---------------------------------------- |
|        title         |    varchar(50)  | Required: Department title to be replaced|
|        toTitle       |    varchar(50)  | Required: new Department title.          |

Sample Response:
{
   "data": {
       "department_title": "Department of OOSE"
   }
}

### e. Delete a department with the given title
	DELETE {{BASE_URL}}/api/departments/:title

|      Parameter       |     Type        |       Description         |
| -------------------- | --------------- | ------------------------- |
|        title         |    varchar(50)  | Required: Department title|


Sample Response:
{
   "data": {
       "department_title": "Department of OOSE"
   }
}

### 3.Employees

### a. Create an employee with the fields
raw(JSON):
{
   "jhed": "jseed1",
   "first_name": "Johnny",
   "last_name": "Appleseed",
   "user_role": "RA",
   "nationality": true
}

|      Parameter       |     Type        |       Description             |
| -------------------- | --------------- | ----------------------------- |
|        jhed          | varchar(20)     | Required: unique jhed id      |
|    first_name        | varchar(50)     | Required: Admin’s first name  |
|    last_name         | varchar(50)     | Required: Admin’s first name  |
|    user_role         | varchar(255)    | Required: Employee role       |
|    nationalit        | bool            | Optional: international /not  |

Sample Response:
{
   "data": {
       "jhed": "jseed1",
       "first_name": "Johnny",
       "last_name": "Appleseed",
       "user_role": "RA",
       "nationality": true,
       "ejhed": null,
       "ajhed": null
   }
}
 
### b. Read all employees in DB
GET {{BASE_URL}}/api/employees

|      Parameter       |     Type        |       Description         |
| -------------------- | --------------- | ------------------------- |
|        NA            |        NA       |           NA              |

Sample Response:
{
   "data": [
       {
           "jhed": "hkenny22",
           "first_name": "Harvey",
           "last_name": "Kenny",
           "user_role": "RA",
           "nationality": true,
           "ejhed": "mmellor30",
           "ajhed": "sstone32"
       },
       {
           "jhed": "ariggs37",
           "first_name": "Adelle",
           "last_name": "Riggs",
           "user_role": "CA",
           "nationality": false,
           "ejhed": "khamer75",
           "ajhed": "eturnbull95"
       },
       {
           "jhed": "edillard93",
           "first_name": "Esme",
           "last_name": "Dillard",
           "user_role": "CA",
           "nationality": true,
           "ejhed": "fthornton65",
           "ajhed": "smansell69"
       }
   ]
}

### c. Read an employee with the given jhed.
GET {{BASE_URL}}/api/employees/:jhed

|      Parameter       |     Type        |       Description             |
| -------------------- | --------------- | ----------------------------- |
|        jhed          | varchar(20)     | Required: unique jhed id      |
	
Sample Response:
{
   "data": {
       "jhed": "edillard93",
       "first_name": "Esme",
       "last_name": "Dillard",
       "user_role": "CA",
       "nationality": true,
       "ejhed": "fthornton65",
       "ajhed": "smansell69"
   }
}

### d. Update the values of an employee with the given id.

PATCH {{BASE_URL}}/api/employees/:jhed

|      Parameter       |     Type        |       Description             |
| -------------------- | --------------- | ----------------------------- |
|        jhed          | varchar(20)     | Required: unique jhed id      |

Sample Response:
{
   "data": {
       "jhed": "japple1",
       "first_name": "John",
       "last_name": "Appleseed",
       "user_role": "RA",
       "nationality": false,
       "ejhed": ejhed1,
       "ajhed": ajhed1
   }
}

### e. Delete an employee with the given id.
DELETE {{BASE_URL}}/api/employees/:jhed

|      Parameter       |     Type        |       Description             |
| -------------------- | --------------- | ----------------------------- |
|        jhed          | varchar(20)     | Required: unique jhed id      |
|    first_name        | varchar(50)     | Required: Admin’s first name  |
|    last_name         | varchar(50)     | Required: Admin’s first name  |
|    user_role         | varchar(255)    | Required: Employee role       |
|    nationalit        | bool            | Optional: international /not  |
|        ajhed         | varchar(20)     | Optional: employer’s jhed     |
|       ejhed          | varchar(20)     | Optional: admin’s jhed        |

Sample Response:
{
   "data": {
       "jhed": "japple1",
       "first_name": "John",
       "last_name": "Appleseed",
       "user_role": "RA",
       "nationality": false,
       "ejhed": null,
       "ajhed": null
   }
}
