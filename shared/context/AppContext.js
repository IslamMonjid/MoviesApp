import React, {createContext, Component} from 'react';


const AppContext = createContext();



export class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFooter: false
    };
  }


  reset = async () => {
    this.setState({
      showFooter: false
    });
  };

  changeFooter = showFooter => {
    this.setState({showFooter});
  };

  render() {
    const {
      showFooter
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          showFooter
        }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const Consumer = AppContext.Consumer;
