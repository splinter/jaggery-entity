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
  
  //If you want validations to be skipped
  firstUser.save('validate',false);
```

###Removing an entity

```javascript
  firstUser.remove();
```

### Validations
All though validations for a given entity are performed automatically before  

```javascript
  firstUser.validate();
```

### Diff
The diff method returns the difference between two entities of the same type.If the two entities are not of the same type then an error will be thrown.

```javascript
  var secondUser=new ef.Entity({
    name:'Ann'
  });
  
  var difference=firstUser.diff(secondUser);
  
  log.info(stringify(difference));  //Stringify simply serializes the output
  
```

The method will return an array with all the properties that do not match.

[ 'name']



Locating an Entity
==================


Entity Life-cycle
=================

init ->  created -> changed -> deleted 


Plug-ins
========









