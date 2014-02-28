jaggery-entity
==============

Defining an Entity
==================

### Defining an Entity Schema

```javascript

  var User=new ef.EntitySchema({
    
      id:Number,
      name:String,
      description:String,
      location:{ type:String,mandatory:true, default:'Earth'}
      registrationDate:Date
      
    });
  
```


### Child Entities
An Entity can be derived from a parent Entity definition.

```javascript

  var HappyUser=new ef.EntitySchema('User',{
  
    props:{
      hasCake:Boolean,
      cakeType:String
    }
    
  });
  
```

### Virtual properties
It is possible for an Entity Schema to define properties that are not persisted to a database using the virtual function

```javascript
  User.virtual('nickname').get(function(){
      return this.name;
  });
  
```

### Entity Methods
An entity method will be called in the context of the current asset

```javascript
  User.methods.getCurrentLocation=function(){
    return '0.0';
  };
```


### Static Methods
A static method will not be called in the context of the Entity that has invoked the method

```javascript
  User.static.getTypesOfUsers=function(){
     return ['Normal','Happy'];
  };
```

  
### Adding a plug-in to a schema

```javascript
  var logger=require('entity').log; //Logs all entity life-cycle actions
  HappyUser.plug(logger);
```


Working with an Entity
======================

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




Entity Life-cycle
=================

init ->  created -> changed -> deleted 


Plug-ins
========









