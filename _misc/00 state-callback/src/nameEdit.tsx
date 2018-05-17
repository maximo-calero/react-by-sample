import * as React from 'react';

interface Props {
  initialUserName : string;
  onNameUpdated : (newName: string) => void;
  changed: boolean;
}

interface State{
  editingName: string;
}

export class NameEditComponent extends React.Component<Props, State>{
  constructor(props: Props){
    super(props);
    this.state = {editingName: this.props.initialUserName};
  }

  onChange = (event) =>{
    this.setState({editingName: event.target.value});
  }

  onNameSubmit = (event: any): any => {
    this.props.onNameUpdated(this.state.editingName);
  }

  public render(){
    return(
      <>
        <label>Update Name:</label>
        <input value={this.state.editingName} onChange={this.onChange} />
        <button className="btn btn-default" onClick={this.onNameSubmit}>Change</button>
        <div>
          <span>Changed: </span>
          <input type="checkbox" checked={this.props.changed} title="Is it changed?"/>
        </div>
      </>
    );
  }
}

