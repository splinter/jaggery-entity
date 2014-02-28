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

### Adding validations
  User.validations(
  

### Adding a plug-in to a schema

```javascript
  var logger=require('entity').log; //Logs all entity life-cycle actions
  HappyUser.plug(logger);
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







