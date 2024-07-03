# Good habit builder
Build good habit by setting up goal, forming group around that goal and putting the work to make that change
_A progress everyday will go a very long way_

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

### Delete
- a group (by a user)
- a habit (by a user)

## Routes

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
