# Good habit builder
Build good habit by setting up goal, forming group around that goal and putting the work to make that change
_A progress everyday will go a very long way_

## Models

### Habit
- id
- title
- descritpion
- start goal
- end goal
- frequency
- difficulty

### User
- id
- username
- picture
- email
- password
- habitIds
- groupIds

### Group
- id
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

### Delete
- a group (by a user)
- a habit (by a user)

## Routes

### GET all habit for a user
### GET a habit
### GET a user
