import * as React from 'react';
import { HelloComponent } from './hello';
import { NameEditComponent } from './nameEdit';

interface Props {
}

interface State {
  userName: string;
  changed: boolean;
}

export class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = { userName: 'defaultUserName', changed: false };
  }

  setUsernameState = (newName: string) => {
    this.setState({userName: newName}, this.nameChanged);
  }

  nameChanged() {
    this.setState({changed:true});
  }

  public render() {
    return (
      <>
        <HelloComponent userName={this.state.userName} />
        <NameEditComponent initialUserName={this.state.userName} 
                           onNameUpdated={this.setUsernameState}
                           changed={this.state.changed} />
      </>
    );
  }
}