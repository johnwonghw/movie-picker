import React from 'react';
import NavigationBar from './NavigationBar'
import FilterCriterias from './FilterCriterias'

class App extends React.Component {
  render () {
    return (
      <div className="container">
        <NavigationBar />

        <FilterCriterias />  
      </div>
    );
  }
}

export default App;