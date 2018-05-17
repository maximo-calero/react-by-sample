# 00 State Call back

In this sample we are agoing to see the async nature of setState mehtod.

In this method we could use a callback to ensure we have the change applied.

We will take as a starting point sample _04 Callback_:

## Summary steps:

- Change nameEdit.tsx to add a boolean property to Props and add a checkbox input
- Change app.tsx to add a boolean property to State and a call back to update the input in the control
- Check everything is working properly.

## Prerequisites

Install [Node.js and npm](https://nodejs.org) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _04 Callback and execute `npm install`.

- Let's change _nameEdit.tsx_ to modify the Props and render method to add a new control to show the value was changed.

_./src/nameEdit.tsx_

```diff
interface Props {
  initialUserName : string;
  onNameUpdated : (newName: string) => void;
+ changed: boolean;
}

...

  public render(){
    return(
      <>
        <label>Update Name:</label>
        <input value={this.state.editingName} onChange={this.onChange} />
        <button className="btn btn-default" onClick={this.onNameSubmit}>Change</button>
+        <div>
+          <span>Changed: </span>
+          <input type="checkbox" checked={this.props.changed} title="Is it changed?"/>
+        </div>        
"/>
      </>
    );
```

- Let's update _app.tsx_ just to change the _constructor_, the _setUsernameState_ method, and add a new method to manage when the change is applied.

_./src/app.tsx_

```diff

interface State {
  userName: string;
+ changed: boolean;
}

...

  constructor(props: Props) {
    super(props);
-   this.state = { userName: 'defaultUserName' };
+   this.state = { userName: 'defaultUserName', changed: false };
  }

  setUsernameState = (newName: string) => {
-   this.setState({userName: newName});
+   this.setState({userName: newName}, this.nameChanged);
  }

+  nameChanged() {
+    this.setState({changed:true});
+  }

  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName} />
-       <NameEditComponent initialUserName={this.state.userName} onNameUpdated= this.setUsernameState}/>
+        <NameEditComponent initialUserName={this.state.userName} 
+                           onNameUpdated={this.setUsernameState}
+                           changed={this.state.changed} />
      </>
    );
  }
```

- Now we can check that things are still working as expected (nothing broken so far).

  ```
  npm start
  ```




- In the _app.tsx_ file let's add a function to set the changed _userName_ in the state.

```diff
  import * as React from 'react';
  import {HelloComponent} from './hello';
+ import {NameEditComponent} from './nameEdit';

  interface Props {
  }

  interface State {
    userName : string;
  }

  export class App extends React.Component<Props, State> {
    constructor(props : Props) {
      super(props);

      this.state = {userName: 'defaultUserName'};
    }

+    setUsernameState = (event) => {
+      this.setState({userName: event.target.value});
+    }

    public render() {
      return (
+        <>
          <HelloComponent userName={this.state.userName} />
+          <NameEditComponent userName={this.state.userName} onChange={this.setUsernameState} />
+        </>
      );
    }
  }
```

> Note down the fat arrow class method, this will avoid loosing the _this_ context on the callback

- Finally let's test the final sample.

  ```
  npm start
  ```
