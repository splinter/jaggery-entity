jaggery-entity
==============

Defining an Entity
==================

```javascript
  var User=new ef.EntitySchema();
  
  //Define the properties of the entity
  User.props={
     id:Number,
     name:String,
     location:String
  };
  
```

Creating an instance of an Entity
=================================

```javascript
  var User=ef.entity('User');
  var firstUser=new User();
```

Using an Entity
===============

###Setting the value of a property

```javascript
   firstUser.name='Sam';
   firstUser.location='Sens Fort';
```

###Saving an entity

```javascript
   firstUser.save();
```

###Updating an entity

```javascript
  firstUser.name='Not Sam';
  firstUser.save();
```

###Removing an entity

```javascript
  firstUser.remove();
```

Locating an Entity
==================

##







