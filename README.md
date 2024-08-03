# Good habit builder

Build good habit by setting up goal, forming group around that goal and putting the work to make that change
_A progress everyday will go a very long way_

## Relation

### Group

A group can have multiple habits
A group can have multiple user
Users from a groups can see all the habits in that group
but need to "participate" in order to go in the habit

### habit

A habit can have multiple users

### User

A user have no habit and no group
A user can join a group
A user can participate in a habit

## Models

### Habit

- title
- descritpion
- start goal
- end goal
- frequency
- difficulty

### User

- username
- picture
- email
- password

### Group

- name
- habitId
- userIds

## CRUD operations

### Create

- a habit (by a user)
- a group (by a user)
- a user (by a user)

### Read

- a habit

### Update

- a habit (by a user)
- add a member to a group
- delete a member from a group

### Delete

- a group (by a user)
- a habit (by a user)

## Routes

<!-- Make a table -->

### Habits routes

- GET all habits
- GET one habit
- GET all habits for one user
- GET one habit for one user ?
- POST one habit
- UPDATE one habit
- DELETE one habit

### Groups routes

- GET all groups
- GET a group
- POST a group
- UPDATE a group
- DELETE a group

### Profiles routes

- GET all users of a group (admin only)
- GET a user
- UPADTE a user
- DELETE a user (delete account)

## Database

### Queries

For the **[GET Route](#routes)**  
**Get all habits for one user** by its id (either _creator_ or _member_)

```JS
  $or: [
          { creator: userId },
          { members: {
              $elemMatch: {
                $eq: userId,
              }
            }
          }
        ]
```

Check if the user is the creator of the habit  
OR  
Check if the user is in the array of members
