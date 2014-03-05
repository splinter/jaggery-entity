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

**Note** : Only String .Number and Boolean types are supported currently.

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
  HappyUser.plugin(logger);
```


Working with an Entity
======================


```javascript
  var User=ef.entity('User');
  var firstUser=new User();
```

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

### Adding validations
Validations can be attached on a per field basis or to an entity as a whole using a plug-in.To target a specific field;

```javascript
User.field('name').validate(function(nameValue,nameFieldSchema){
  return false;
},'Check for offensive names');

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

###Locating  a single entity

A simple query would look like the following;

```javascript
  var User=new ef.Entity('User');
  User.find({name:'Sam'});  
```

Thats all fine and dandy but what if we have complex queries?


###Locating a collection of entities

Getting all of the users;

```javascript

  var users=User.findAll(); //Not usually a good idea
  
```
This will return an array containing all of the Users in the datasource. Each entry will be a full blown entity so you could do things like this;

```javascript

  for(var index in users){
    print(users[index].name); //This will print the name of all the users
  }
```

Although the above code is fine when dealing with a small number of records, it becomes unmanagable when dealing large numbers. So it is a good idea to pass in a pagination context like below;

```javascript
  
  var result=User.findAll({ start:0 , end:10 });
  
```

The query method allows more fine grained controll over retrieval of data.

```javascript
  var result=User.query('SELECT * FROM Users WHERE name LIKE "sam"');
```

Plug-ins
========
A plugin can be installed to an Entity Schema by using the plugin method.

###Writing a plug-in
A plug-in can be written in order to respond to three types of events; pre, to and post.

The basic structure of a plug-in is as follows;

```javascript
var myPlugin=function(schema,options){
  
   schema.pre('save',function(){
    //Runs before saving
   });
   
   schema.to('save',function(){
    //Implements the actual saving logic
   });
   
   schema.post('save',function(){
   //Runs after the saving logic
   });
   
   schema.static.find=function(){
   };
};

```

A couple of important points;

1. The schema object is a reference to the schema which will be using the plug-in
2. The options object returns a JSON object that can be passed in when installing the plugin for a schema

The three event types are supported for the following actions;

1. Save :This method can be invoked by the user to save an entity instance to a datasource.
2. Init  :This method is called internally whenever an Entity is instantiated
3. Remove :This method can be invoked by the user to destory a given entity instance. What it means to be "destroyed" is dictated by the plugins used with the schema.

####Supporting Find and FindAll 
The Find and FindAll methods can be overriden  by using the overriding the static object ;

```javascript
	schema.static.find=function(options){
        };

	schema.static.findAll=function(options){
 	};
```












